<template>
    <div class="color-picker"
         tabindex="0"
         @keyup.enter="selectColor"
         @keydown.up.right.prevent="rotate($event, true)"
         @keydown.down.left.prevent="rotate($event, false)">
        <div class="palette" :class="isPaletteIn ? 'is-in' : 'is-out'" @transitionend="toggleKnob">
            <canvas ref="palette"></canvas>
        </div>

        <div class="rotator"
             :class="{ 'disabled': isDisabled, 'dragging': isDragging }"
             @dblclick.self="rotateToMouse"
             ref="rotator"
             @transitionend="hidePalette">
            <div class="knob" :class="isKnobIn ? 'is-in' : 'is-out'"></div>
        </div>

        <div class="ripple"
             :class="{ 'is-rippling': isRippling }"
             :style="{ borderColor: color }"
             @animationend="stopRipple">
        </div>

        <button type="button"
                class="selector"
                :class="{ 'is-pressed': isPressed }"
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
        name: 'vue-radial-color-picker',
        props: {
            value: {
                default: () => ({ hue: 0, saturation: 100, luminosity: 50, alpha: 1 }),
            },
            scrollSensitivity: {
                default: 2,
            },
            mouseScroll: {
                default: false,
            },
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
                const { hue, saturation, luminosity, alpha } = this.value;

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

            fillColorWheel(this.$refs.palette, this.$el.offsetWidth || 280);

            rotator = new Rotator(this.$refs.rotator, {
                inertia: 0.7,
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
                    rotator.angle += this.scrollSensitivity;
                } else {
                    rotator.angle -= this.scrollSensitivity;
                }
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

                rotator.angle += this.scrollSensitivity * multiplier;
            },
            updateColor(hue) {
                this.$emit('input', {
                    hue,
                    saturation: this.value.saturation,
                    luminosity: this.value.luminosity,
                    alpha: this.value.alpha,
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
                if (this.isDisabled) {
                    this.isKnobIn = true;
                } else {
                    this.isKnobIn = false;
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

<style lang="scss">
    .color-picker {
        $initial-color: #ff0000;
        $button-border: #b2b2b2;
        $material-curve-angular: cubic-bezier(0.35, 0, 0.25, 1);

        @function z-depth-all($depth: 1) {
            $color1:    0.12, 0.19, 0.19, 0.21, 0.22, 0.38;
            $blur1:     10px, 20px, 50px, 55px, 77px, 30px;

            $color2:    0.16, 0.2, 0.24, 0.22, 0.2, 0.48;
            $blur2:     5px, 17px, 15px, 28px, 24px, 15px;
            @return 0 0 nth($blur1, $depth) rgba(0, 0, 0, nth($color1, $depth)), 0 0 nth($blur2, $depth) rgba(0, 0, 0, nth($color2, $depth));
        }

        @mixin z-depth-all($depth: 1) {
            box-shadow: z-depth-all($depth);
        }

        @mixin disable-user-select() {
            -webkit-touch-callout: none;
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;

            -webkit-tap-highlight-color: transparent;
        }

        display: block;
        overflow: hidden;
        width: 280px;
        height: 280px;
        position: relative;

        &:focus {
            outline: 0;

            .knob {
                @include z-depth-all(6);
            }
        }

        &,
        .palette,
        .rotator,
        .selector,
        .ripple,
        .knob {
            @include disable-user-select();
            box-sizing: border-box;

            &::before {
                box-sizing: border-box;
            }
        }

        .palette {
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
            transition: transform .5s $material-curve-angular,
                        opacity .5s $material-curve-angular;

            &::before {
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

            &.is-in {
                transform: scale(1);
                opacity: 1;
            }

            &.is-out {
                transform: scale(0);
                opacity: 0;
            }
        }

        .rotator {
            width: 100%;
            height: 100%;
            position: absolute;

            &.dragging {
                z-index: 1;
            }

            &.disabled {
                pointer-events: none;
            }
        }

        .knob {
            @include z-depth-all(1);
            border-radius: 50%;
            position: absolute;
            width: 7%;
            height: 7%;
            top: 2.5%;
            left: 46.5%;
            background-color: #fff;
            transition: transform .4s $material-curve-angular;
            outline: 0;
            border-style: none;

            &.is-in {
                transform: scale(1);
            }

            &.is-out {
                transform: scale(0);
            }
        }

        &:not(:focus) .knob:hover {
            @include z-depth-all(3);
        }

        .dragging .knob {
            @include z-depth-all(6);
        }

        .selector {
            position: absolute;
            width: 25%;
            height: 25%;
            top: 37.5%;
            left: 37.5%;
            padding: 0;
            margin: 0;
            border-radius: 50%;
            background-color: $initial-color;
            outline: 0;
            cursor: pointer;
            transition: transform .7s $material-curve-angular;
            will-change: transform;
            overflow: visible;
            border: 6px solid #fff;
            box-shadow: 0 0 0 1px $button-border;

            &::-moz-focus-inner {
              border: 0;
            }

            &:hover {
                box-shadow: 0 0 1px 1px #333;
            }

            &:focus {
                box-shadow: 0 0 1px 2px $button-border;
            }

            &.is-pressed {
                animation: color-picker-beat .4s $material-curve-angular forwards;
            }
        }

        .ripple {
            width: 20%;
            height: 20%;
            border-radius: 50%;
            border: $initial-color solid 8px;
            opacity: 0;
            position: absolute;
            top: 40%;
            left: 40%;
            z-index: -1;
        }

        .is-rippling {
            z-index: 0;
            animation: color-picker-ripple .5s $material-curve-angular forwards;
        }
    }

@keyframes color-picker-ripple {
    0%   { transform: scale(1); opacity: .3; }
    50%  { opacity: .1; }
    100% {
        opacity: 0;
        border-width: 0;
        transform: scale(3.8);
    }
}

@keyframes color-picker-beat {
    0%   { transform: scale(1); }
    25%  { transform: scale(0.8); }
    50%  { transform: scale(1); }
    100% { transform: scale(1); }
}
</style>
