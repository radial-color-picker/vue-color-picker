<template>
    <div class="color-picker">
        <div class="color-palette" :class="{ 'blur-palette-in': isPaletteIn, 'blur-palette-out': !isPaletteIn }">
            <canvas ref="colorPalette"></canvas>
        </div>
    </div>
</template>

<script>
    import fillColorWheel from '@radial-color-picker/color-wheel';

    export default {
        name: 'vue-radial-color-picker',
        data() {
            return {
                isPaletteIn: true,
            }
        },
        mounted() {
            fillColorWheel(this.$refs.colorPalette, this.$el.offsetWidth || 280);
        }
    };
</script>

<style lang="scss">
    .color-picker {
        $material-curve-angular: cubic-bezier(0.35, 0, 0.25, 1);

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
        }

        &,
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
    }
</style>
