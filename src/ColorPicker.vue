<template>
    <div
        role="slider"
        :aria-roledescription="ariaRoledescription"
        :aria-label="ariaLabel"
        aria-valuemin="0"
        aria-valuemax="359"
        :aria-valuenow="angle"
        :aria-valuetext="ariaValuetext || valuetext"
        :aria-disabled="disabled ? 'true' : 'false'"
        class="rcp"
        :class="{ dragging: isDragging, disabled: disabled }"
        :tabindex="disabled ? -1 : 0"
        @keyup.enter="selectColor"
        @keydown="onKeyDown"
    >
        <div class="rcp__palette" :class="isPaletteIn ? 'in' : 'out'" ref="palette">
            <canvas></canvas>
        </div>

        <div
            class="rcp__rotator"
            :style="{
                'pointer-events': disabled || isPressed || !isKnobIn ? 'none' : null,
                transform: `rotate(${ssrHue}deg)`,
            }"
            v-on="mouseScroll ? { wheel: onScroll } : null"
            ref="rotator"
        >
            <div class="rcp__knob" :class="isKnobIn ? 'in' : 'out'" @transitionend="hidePalette"></div>
        </div>

        <div class="rcp__ripple" :class="{ rippling: isRippling }" :style="{ borderColor: color }"></div>

        <button
            type="button"
            class="rcp__well"
            :aria-label="ariaLabelColorWell"
            :disabled="true"
            :tabindex="-1"
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

const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'red'];
const keys = {
    ArrowUp: (oldAngle, step) => oldAngle + step,
    ArrowRight: (oldAngle, step) => oldAngle + step,
    ArrowDown: (oldAngle, step) => oldAngle - step,
    ArrowLeft: (oldAngle, step) => oldAngle - step,
    PageUp: (oldAngle, step) => oldAngle + step * 10,
    PageDown: (oldAngle, step) => oldAngle - step * 10,
    Home: () => 0,
    End: () => 359,
};

export default {
    rcp: null,
    name: 'ColorPicker',
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
            default: 1,
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
        ariaLabel: {
            default: 'color picker',
        },
        ariaRoledescription: {
            default: 'radial slider',
        },
        ariaValuetext: {
            default: '',
        },
        ariaLabelColorWell: {
            default: 'color well',
        },
    },
    data() {
        return {
            angle: 0,
            ssrHue: 0,
            isPaletteIn: !this.initiallyCollapsed,
            isKnobIn: !this.initiallyCollapsed,
            isPressed: false,
            isRippling: false,
            isDragging: false,
        };
    },
    computed: {
        color() {
            return `hsla(${this.angle}, ${this.saturation}%, ${this.luminosity}%, ${this.alpha})`;
        },
        valuetext() {
            return colors[Math.round(this.angle / 60)];
        },
    },
    watch: {
        hue: function (angle) {
            this.angle = angle;
            this.rcp.angle = angle;
        },
    },
    created() {
        // update the SSR value once when the component is created
        // prevents knob jumping when using Server Side Rendering
        // where the knob's position is updated only after the client-side code is executed (on mount)
        this.ssrHue = this.hue;
        this.angle = this.ssrHue;
    },
    mounted() {
        // ignore testing code that will be removed by dead code elimination for production
        /* istanbul ignore next */
        if (process.env.NODE_ENV === 'development' && this.initiallyCollapsed && this.variant === 'persistent') {
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
            angle: this.angle,
            onRotate: hue => {
                this.angle = hue;
                this.$emit('input', this.angle);
            },
            onDragStart: () => {
                this.isDragging = true;
            },
            onDragStop: () => {
                this.isDragging = false;
                this.$emit('change', this.angle);
            },
        });
    },
    methods: {
        onKeyDown(ev) {
            if (this.disabled || this.isPressed || !this.isKnobIn || !(ev.key in keys)) return;

            ev.preventDefault();

            this.rcp.angle = keys[ev.key](this.rcp.angle, this.step);

            this.angle = this.rcp.angle;
            this.$emit('input', this.angle);
            this.$emit('change', this.angle);
        },
        onScroll(ev) {
            if (this.isPressed || !this.isKnobIn) return;

            ev.preventDefault();

            if (ev.deltaY > 0) {
                this.rcp.angle += this.step;
            } else {
                this.rcp.angle -= this.step;
            }

            this.angle = this.rcp.angle;
            this.$emit('input', this.angle);
            this.$emit('change', this.angle);
        },
        selectColor() {
            this.isPressed = true;

            if (this.isPaletteIn && this.isKnobIn) {
                this.$emit('select', this.angle);
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

    /**
     * @hack: MS Edge 18 (not the Chromium based one) has a bug with mask-image and
     * transforms. When `transform: scale(1.04)` is applied the mask-image scales too
     * but its position is incorrect now. Otherwise the much shorter radial-gradient mask
     * could've been used:
     * mask-image: radial-gradient(circle at 50% 50%, transparent 53.5%, black 54%);
     *
     * Instead, below is an base64 inlined SVG:
     * <?xml version="1.0" encoding="UTF-8"?>
     * <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
     *     <defs>
     *        <mask id="mask" x="0" y="0" width="100" height="100">
     *            <rect x="0" y="0" width="100" height="100" fill="#fff"/>
     *            <circle cx="50" cy="50" r="38" />
     *        </mask>
     *    </defs>
     *
     *    <rect x="0" y="0" width="100" height="100" mask="url(#mask)"/>
     * </svg>
     */
    mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgogICAgPGRlZnM+CiAgICAgICAgPG1hc2sgaWQ9Im1hc2siIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICAgICAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiLz4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzgiIC8+CiAgICAgICAgPC9tYXNrPgogICAgPC9kZWZzPgoKICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBtYXNrPSJ1cmwoI21hc2spIi8+Cjwvc3ZnPgo=');
    border-radius: 50%;
    overflow: hidden;
    will-change: transform, opacity;
    transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1), opacity 0.5s cubic-bezier(0.35, 0, 0.25, 1);
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

.rcp__well:disabled:hover {
    cursor: default;
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
