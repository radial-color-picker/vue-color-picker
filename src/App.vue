<template>
    <div class="color-picker" tabindex="0">
        <div class="color-palette" :class="isPaletteIn ? 'blur-palette-in' : 'blur-palette-out'" @transitionend="onPaletteTransitionEnd">
            <canvas ref="colorPalette"></canvas>
        </div>

        <div @dblclick.self="changeHueToMouse" ref="rotator" class="rotator" :class="{ 'disabled': isDisabled, 'dragging': isDragging }" @transitionend="onKnobTransitionEnd">
            <div class="knob" :class="isKnobIn ? 'zoom-knob-in' : 'zoom-knob-out'"></div>
        </div>

        <div :class="{ 'color-shadow-animate': isRippleAnimating }" :style="{ borderColor: color }" @animationend="onRippleAnimationEnd" class="color-shadow"></div>

        <button :class="{ 'click-color': isColorSelAnimating }" :style="{ backgroundColor: color }" @animationend="onColorSelAnimationEnd" @click="onColorSelClick" type="button" class="color"></button>
    </div>
</template>

<script>
    import fillColorWheel from '@radial-color-picker/color-wheel';
    import Rotator from '@radial-color-picker/rotator';

    let rotator;

    export default {
        name: 'vue-radial-color-picker',
        data() {
            return {
                isPaletteIn: true,
                isKnobIn: true,
                isColorSelAnimating: false,
                isRippleAnimating: false,
                angle: 0,
                isDragging: false,
                isDisabled: false,
                color: `hsla(0, 100%, 50%, 1)`
            }
        },
        mounted() {
            fillColorWheel(this.$refs.colorPalette, this.$el.offsetWidth || 280);

            rotator = new Rotator(this.$refs.rotator, {
                angle: this.angle,
                inertia: 0.7,
                onRotate: angle => {
                    let color = `hsla(${angle}, 100%, 50%, 1)`;

                    this.color = color;
                },
                onDragStart: () => {
                    this.isDragging = true;
                },
                onDragStop: () => {
                    this.isDragging = false;
                },
            });
        },
        methods: {
            changeHueToMouse(ev) {
                if (this.isDisabled)
                    return;

                rotator.setAngleFromEvent(ev);
            },
            onColorSelClick() {
                this.isColorSelAnimating = true;

                if (!this.isDisabled) {
                    this.isRippleAnimating = true;
                } else {
                    this.isPaletteIn = true;
                }
            },
            onColorSelAnimationEnd() {
                if (this.isDisabled) {
                    this.isKnobIn = true;
                } else {
                    this.isKnobIn = false;
                }

                this.isColorSelAnimating = false;
            },
            onKnobTransitionEnd() {
                if (!this.isDisabled) {
                    this.isPaletteIn = false;
                } else {
                    this.isDisabled = false;
                }
            },
            onRippleAnimationEnd() {
                this.isRippleAnimating = false;
            },
            onPaletteTransitionEnd(ev) {
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
        .color-palette,
        .rotator,
        .color,
        .color-shadow,
        .knob {
            @include disable-user-select();
            box-sizing: border-box;

            &::before {
                box-sizing: border-box;
            }
        }

        .color-palette {
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

            &.blur-palette-in {
                transform: scale(1);
                opacity: 1;
            }

            &.blur-palette-out {
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

            &.zoom-knob-in {
                transform: scale(1);
            }

            &.zoom-knob-out {
                transform: scale(0);
            }
        }

        &:not(:focus) .knob:hover {
            @include z-depth-all(3);
        }

        .dragging .knob {
            @include z-depth-all(6);
        }

        .color {
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

            &.zoom-color-in {
                transform: scale(1);
            }

            &.zoom-color-out {
                transform: scale(0);
                transition-delay: .5s;
            }

            &.click-color {
                animation: click-color .4s $material-curve-angular forwards;
            }
        }

        .color-shadow {
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

        .color-shadow-animate {
            z-index: 0;
            animation: color-shadow-animation .5s $material-curve-angular forwards;
        }
    }

@keyframes color-shadow-animation {
    0%   { transform: scale(1); opacity: .3; }
    50%  { opacity: .1; }
    100% {
        opacity: 0;
        border-width: 0;
        transform: scale(3.8);
    }
}

@keyframes click-color {
    0%   { transform: scale(1); }
    25%  { transform: scale(0.8); }
    50%  { transform: scale(1); }
    100% { transform: scale(1); }
}
</style>
