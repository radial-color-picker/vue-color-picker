<template>
    <div tabindex="0"
         class="rcp"
         :class="{ 'dragging': isDragging }"
         @keyup.enter="selectColor"
         @keydown.up.right.prevent="rotate($event, true)"
         @keydown.down.left.prevent="rotate($event, false)">
        <div class="rcp__palette"
             :class="isPaletteIn ? 'in' : 'out'"
             @transitionend="toggleKnob"
             ref="palette">
            <canvas></canvas>
        </div>

        <div class="rcp__rotator"
             :style="{ 'pointer-events': isDisabled ? 'none' : null }"
             @dblclick.self="rotateToMouse"
             ref="rotator"
             @transitionend="hidePalette">
            <div class="rcp__knob" :class="isKnobIn ? 'in' : 'out'"></div>
        </div>

        <div class="rcp__ripple"
             :class="{ 'rippling': isRippling }"
             :style="{ borderColor: color }"
             @animationend="stopRipple">
        </div>

        <button type="button"
                class="rcp__selector"
                :class="{ 'pressed': isPressed }"
                :style="{ backgroundColor: color }"
                @animationend="togglePicker"
                @click="selectColor">
        </button>
    </div>
</template>

<script>
    import fillColorWheel from '@radial-color-picker/color-wheel';
    import Rotator from '@radial-color-picker/rotator';

    let rotator;

    export default {
        name: 'vue-color-picker',
        props: {
            value: {
                default: () => ({ hue: 0, saturation: 100, luminosity: 50, alpha: 1 }),
            },
            step: {
                default: 2,
            },
            mouseScroll: {
                default: false,
            },
            variant: {
                default: 'collapsible', // collapsible | persistent
            }
        },
        data() {
            return {
                isPaletteIn: true,
                isKnobIn: true,
                isPressed: false,
                isRippling: false,
                isDragging: false,
                isDisabled: false,
            }
        },
        computed: {
            color() {
                const { hue, saturation = 100, luminosity = 50, alpha = 1 } = this.value;

                return `hsla(${hue}, ${saturation}%, ${luminosity}%, ${alpha})`;
            }
        },
        watch: {
            'value.hue': function(newAngle, oldAngle) {
                if (newAngle != oldAngle) {
                    rotator.angle = newAngle;
                }
            },
        },
        mounted() {
            if (this.mouseScroll) {
                this.$refs.rotator.addEventListener('wheel', this.onScroll);
            }

            this.$refs.palette.style.backgroundImage = 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)';

            if (!this.$refs.palette.style.backgroundImage) {
                fillColorWheel(this.$refs.palette.firstElementChild, this.$el.offsetWidth || 280);
            }

            rotator = new Rotator(this.$refs.rotator, {
                angle: this.value.hue,
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
            onScroll(ev) {
                if (this.isDisabled)
                    return;

                ev.preventDefault();

                if (ev.deltaY > 0) {
                    rotator.angle += this.step;
                } else {
                    rotator.angle -= this.step;
                }

                this.updateColor(rotator.angle);
            },
            rotate(ev, isIncrementing) {
                if (this.isDisabled)
                    return;

                let multiplier = isIncrementing ? 1 : -1;

                if (ev.ctrlKey) {
                    multiplier *= 6;
                } else if (ev.shiftKey) {
                    multiplier *= 3;
                }

                rotator.angle += this.step * multiplier;
                this.updateColor(rotator.angle);
            },
            updateColor(hue) {
                this.$emit('input', {
                    hue,
                    saturation: this.value.saturation || 100,
                    luminosity: this.value.luminosity || 50,
                    alpha: this.value.alpha || 1,
                });
            },
            rotateToMouse(ev) {
                if (this.isDisabled)
                    return;

                rotator.setAngleFromEvent(ev);
            },
            selectColor() {
                this.isPressed = true;

                if (!this.isDisabled) {
                    this.$emit('select', this.value);
                    this.isRippling = true;
                } else {
                    this.isPaletteIn = true;
                }
            },
            togglePicker() {
                if (this.variant !== 'persistent') {
                    if (this.isDisabled) {
                        this.isKnobIn = true;
                    } else {
                        this.isKnobIn = false;
                    }
                }

                this.isPressed = false;
            },
            hidePalette() {
                if (!this.isDisabled) {
                    this.isPaletteIn = false;
                } else {
                    this.isDisabled = false;
                }
            },
            stopRipple() {
                this.isRippling = false;
            },
            toggleKnob(ev) {
                // 'transitionend' fires for every transitioned property
                if (ev.propertyName === 'transform') {
                    if (this.isDisabled) {
                        this.isKnobIn = true;
                    } else {
                        this.isDisabled = true;
                    }
                }
            },
        },
        beforeDestroy() {
            rotator.destroy();
            rotator = null;
        },
    };
</script>

<style>
    .rcp, .rcp div, .rcp button {
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
        border-radius: 50%;
        overflow: hidden;
        will-change: transform, opacity;
        transition: transform .5s cubic-bezier(0.35, 0, 0.25, 1),
                    opacity .5s cubic-bezier(0.35, 0, 0.25, 1);
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
        transition: transform .4s cubic-bezier(0.35, 0, 0.25, 1);
        outline: 0;
        border-style: none;
    }

    .rcp__knob.in {
        transform: scale(1);
    }

    .rcp__knob.out {
        transform: scale(0);
    }

    .rcp__selector {
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
        transition: transform .7s cubic-bezier(0.35, 0, 0.25, 1);
        will-change: transform;
        overflow: visible;
        border: 6px solid #fff;
        box-shadow: 0 0 0 1px #b2b2b2;
    }

    .rcp__selector::-moz-focus-inner {
      border: 0;
    }

    .rcp__selector:hover {
        box-shadow: 0 0 1px 1px #333;
    }

    .rcp__selector:focus {
        box-shadow: 0 0 1px 2px #b2b2b2;
    }

    .rcp__selector.pressed {
        animation: rcp-beat .4s cubic-bezier(0.35, 0, 0.25, 1) forwards;
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
        animation: rcp-ripple .5s cubic-bezier(0.35, 0, 0.25, 1) forwards;
    }

    @keyframes rcp-ripple {
        0%   { transform: scale(1); opacity: .3; }
        50%  { opacity: .1; }
        100% {
            opacity: 0;
            border-width: 0;
            transform: scale(3.8);
        }
    }

    @keyframes rcp-beat {
        0%   { transform: scale(1); }
        25%  { transform: scale(0.8); }
        50%  { transform: scale(1); }
        100% { transform: scale(1); }
    }
</style>
