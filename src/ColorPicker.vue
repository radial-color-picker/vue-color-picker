<template>
    <div
        class="rcp"
        :class="{ dragging: isDragging, disabled: disabled }"
        :tabindex="disabled ? -1 : 0"
        @keyup.enter="selectColor"
        @keydown.up.right.prevent="rotate($event, true)"
        @keydown.down.left.prevent="rotate($event, false)"
    >
        <div class="rcp__palette" :class="isPaletteIn ? 'in' : 'out'" ref="palette">
            <canvas></canvas>
        </div>

        <div
            class="rcp__rotator"
            :style="{ 'pointer-events': disabled || isPressed || !isKnobIn ? 'none' : null }"
            @dblclick.self="rotateToMouse"
            ref="rotator"
        >
            <div class="rcp__knob" :class="isKnobIn ? 'in' : 'out'" @transitionend="hidePalette"></div>
        </div>

        <div class="rcp__ripple" :class="{ rippling: isRippling }" :style="{ borderColor: color }"></div>

        <button
            type="button"
            class="rcp__well"
            :class="{ pressed: isPressed }"
            :style="{ backgroundColor: color }"
            @animationend="togglePicker"
            @click="selectColor"
        ></button>
    </div>
</template>

<script>
import fillColorWheel from '@radial-color-picker/color-wheel';
import Rotator from '@radial-color-picker/rotator';

export default {
    rcp: null,
    name: 'vue-color-picker',
    props: {
        hue: {
            default: 0,
        },
        saturation: {
            default: 100,
        },
        luminosity: {
            default: 50,
        },
        alpha: {
            default: 1,
        },
        step: {
            default: 2,
        },
        mouseScroll: {
            default: false,
        },
        variant: {
            default: 'collapsible', // collapsible | persistent
        },
        disabled: {
            default: false,
        },
        initiallyCollapsed: {
            default: false,
        },
    },
    data() {
        return {
            isPaletteIn: !this.initiallyCollapsed,
            isKnobIn: !this.initiallyCollapsed,
            isPressed: false,
            isRippling: false,
            isDragging: false,
        };
    },
    computed: {
        color() {
            return `hsla(${this.hue}, ${this.saturation}%, ${this.luminosity}%, ${this.alpha})`;
        },
    },
    watch: {
        hue: function(angle) {
            this.rcp.angle = angle;
        },
    },
    mounted() {
        if (this.mouseScroll) {
            this.$refs.rotator.addEventListener('wheel', this.onScroll);
        }

        if (this.hasConflictingProperties()) {
            console.warn(
                `Incorrect config: using variant="persistent" and :initiallyCollapsed="true" at the same time is not supported.`
            );
        }

        const isConicGradientSupported = getComputedStyle(this.$refs.palette).backgroundImage.includes('conic');

        // ignore conic-gradient support & polyfill
        /* istanbul ignore else */
        if (!isConicGradientSupported) {
            fillColorWheel(this.$refs.palette.firstElementChild, this.$el.offsetWidth || 280);
        }

        this.rcp = new Rotator(this.$refs.rotator, {
            angle: this.hue,
            onRotate: this.updateColor,
            onDragStart: () => {
                this.isDragging = true;
            },
            onDragStop: () => {
                this.isDragging = false;
            },
        });
    },
    methods: {
        hasConflictingProperties() {
            return this.initiallyCollapsed && this.variant === 'persistent';
        },
        onScroll(ev) {
            if (this.isPressed || !this.isKnobIn) return;

            ev.preventDefault();

            if (ev.deltaY > 0) {
                this.rcp.angle += this.step;
            } else {
                this.rcp.angle -= this.step;
            }

            this.updateColor(this.rcp.angle);
        },
        rotate(ev, isIncrementing) {
            if (this.disabled || this.isPressed || !this.isKnobIn) return;

            let multiplier = isIncrementing ? 1 : -1;

            if (ev.ctrlKey) {
                multiplier *= 6;
            } else if (ev.shiftKey) {
                multiplier *= 3;
            }

            this.rcp.angle += this.step * multiplier;
            this.updateColor(this.rcp.angle);
        },
        updateColor(hue) {
            this.$emit('input', hue);
        },
        rotateToMouse(ev) {
            if (this.isPressed || !this.isKnobIn) return;

            this.rcp.setAngleFromEvent(ev);
        },
        selectColor() {
            this.isPressed = true;

            if (this.isPaletteIn && this.isKnobIn) {
                this.$emit('change', this.hue);
                this.isRippling = true;
            } else {
                this.isPaletteIn = true;
            }
        },
        togglePicker() {
            if (this.variant !== 'persistent') {
                if (this.isKnobIn) {
                    this.isKnobIn = false;
                } else {
                    this.isKnobIn = true;
                    this.isPaletteIn = true;
                }
            }

            this.isRippling = false;
            this.isPressed = false;
        },
        hidePalette() {
            if (!this.isKnobIn) {
                this.isPaletteIn = false;
            }
        },
    },
    beforeDestroy() {
        this.rcp.destroy();
        this.rcp = null;
    },
};
</script>

<style>
.rcp,
.rcp div,
.rcp button {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    box-sizing: border-box;
}

.rcp {
    display: block;
    overflow: hidden;
    width: 280px;
    height: 280px;
    position: relative;
    transform: scale(1.001);
    transition: transform 0.15s cubic-bezier(0.68, 0, 0.47, 2);
}

.rcp:focus {
    outline: 0;
}

.rcp:hover .rcp__knob {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 0 10px rgba(0, 0, 0, 0.24);
}

.rcp.dragging {
    transform: scale(1.04);
}

.rcp.disabled {
    cursor: not-allowed;
    transform: scale(0.96);
}

.rcp.dragging .rcp__rotator {
    z-index: 1;
}

.rcp__palette {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-image: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
    border-radius: 50%;
    overflow: hidden;
    will-change: transform, opacity;
    transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1), opacity 0.5s cubic-bezier(0.35, 0, 0.25, 1);
}

.rcp__palette::before {
    box-sizing: border-box;
    content: '';
    display: block;
    position: absolute;
    width: 76%;
    height: 76%;
    top: 12%;
    left: 12%;
    background-color: #fff;
    border-radius: 50%;
}

.rcp__palette.in {
    transform: scale(1);
    opacity: 1;
}

.rcp__palette.out {
    transform: scale(0);
    opacity: 0;
}

.disabled .rcp__palette {
    background-image: radial-gradient(#808080, #fff) !important;
}

.rcp__rotator {
    width: 100%;
    height: 100%;
    position: absolute;
}

.rcp__knob {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12), 0 0 5px rgba(0, 0, 0, 0.16);
    border-radius: 50%;
    position: absolute;
    width: 7%;
    height: 7%;
    top: 2.5%;
    left: 46.5%;
    background-color: #fff;
    transition: transform 0.4s cubic-bezier(0.35, 0, 0.25, 1);
    outline: 0;
    border-style: none;
}

.rcp__knob.in {
    transform: scale(1);
}

.rcp__knob.out {
    transform: scale(0);
}

.disabled .rcp__knob {
    box-shadow: none !important;
    pointer-events: none;
}

.rcp__well {
    position: absolute;
    width: 25%;
    height: 25%;
    top: 37.5%;
    left: 37.5%;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    background-color: #ff0000;
    outline: 0;
    cursor: pointer;
    overflow: visible;
    border: 6px solid #fff;
    box-shadow: 0 0 0 1px #b2b2b2;
}

.rcp__well::-moz-focus-inner {
    border: 0;
}

.rcp__well:hover {
    box-shadow: 0 0 1px 1px #333;
}

.rcp__well:focus {
    box-shadow: 0 0 1px 2px #b2b2b2;
}

.rcp__well.pressed {
    animation: rcp-beat 0.4s cubic-bezier(0.35, 0, 0.25, 1) forwards;
}

.disabled .rcp__well {
    background-color: #bfbfbf !important;
    pointer-events: none;
}

.rcp__ripple {
    width: 20%;
    height: 20%;
    border-radius: 50%;
    border: #ff0000 solid 8px;
    opacity: 0;
    position: absolute;
    top: 40%;
    left: 40%;
    z-index: -1;
}

.rcp__ripple.rippling {
    z-index: 0;
    animation: rcp-ripple 0.5s cubic-bezier(0.35, 0, 0.25, 1) forwards;
}

@keyframes rcp-ripple {
    0% {
        transform: scale(1);
        opacity: 0.3;
    }
    50% {
        opacity: 0.1;
    }
    100% {
        opacity: 0;
        border-width: 0;
        transform: scale(3.8);
    }
}

@keyframes rcp-beat {
    0% {
        transform: scale(1);
    }
    25% {
        transform: scale(0.8);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
