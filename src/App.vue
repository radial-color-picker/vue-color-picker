<template>
    <div class="color-picker">
        <div class="color-palette" :class="isPaletteIn ? 'blur-palette-in' : 'blur-palette-out'">
            <canvas ref="colorPalette"></canvas>
        </div>

        <div @dblclick.self="changeHueToMouse" ref="rotator" class="rotator" :class="{ 'dragging': isDragging }">
            <div class="knob" :class="isKnobIn ? 'zoom-knob-in' : 'zoom-knob-out'"></div>
        </div>
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
                angle: 0,
                isDragging: false,
                isDisabled: false,
            }
        },
        mounted() {
            fillColorWheel(this.$refs.colorPalette, this.$el.offsetWidth || 280);

            rotator = new Rotator(this.$refs.rotator, {
                angle: this.angle,
                inertia: 0.7,
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
        },
        beforeDestroy() {
            rotator.destroy();
            rotator = null;
        },
    };
</script>

<style lang="scss">
    .color-picker {
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
        .rotator,
        .color-palette {
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
    }
</style>
