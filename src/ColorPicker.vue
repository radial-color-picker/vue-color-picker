<template>
    <div
        ref="el"
        role="slider"
        :aria-roledescription="ariaRoledescription"
        :aria-label="ariaLabel"
        :aria-expanded="isPaletteIn"
        aria-valuemin="0"
        aria-valuemax="359"
        :aria-valuenow="angle"
        :aria-valuetext="ariaValuetext || valuetext"
        :aria-disabled="disabled"
        class="rcp"
        :class="{ dragging: isDragging, disabled: disabled }"
        :tabindex="disabled ? -1 : 0"
        :style="{ '--rcp-initial-angle': initialAngle }"
        @keyup.enter="selectColor"
        @keydown="onKeyDown"
    >
        <div class="rcp__palette" :class="isPaletteIn ? 'in' : 'out'">
            <canvas></canvas>
        </div>

        <div
            class="rcp__rotator"
            :style="{
                'pointer-events': disabled || isPressed || !isKnobIn ? 'none' : null,
            }"
            v-on="mouseScroll ? { wheel: onScroll } : {}"
            ref="rotator"
        >
            <div class="rcp__knob" :class="isKnobIn ? 'in' : 'out'" @transitionend="hidePalette"></div>
        </div>

        <div class="rcp__ripple" :class="{ rippling: isRippling }" :style="{ borderColor: color }"></div>

        <button
            type="button"
            class="rcp__well"
            :aria-label="ariaLabelColorWell"
            :disabled="disabled"
            :tabindex="disabled ? -1 : 0"
            :class="{ pressed: isPressed }"
            :style="{ backgroundColor: color }"
            @animationend="togglePicker"
            @click="selectColor"
        ></button>
    </div>
</template>

<script>
    import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

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
        name: 'ColorPicker',
        emits: ['select', 'input', 'change'],
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
        setup(props, { emit }) {
            // template refs
            const el = ref(null);
            const rotator = ref(null);

            // instance values
            let rcp = null;

            // state
            const initialAngle = props.hue + 'deg';
            const angle = ref(props.hue);
            const isPaletteIn = ref(!props.initiallyCollapsed);
            const isKnobIn = ref(!props.initiallyCollapsed);
            const isPressed = ref(false);
            const isRippling = ref(false);
            const isDragging = ref(false);

            const color = computed(
                () => `hsla(${angle.value}, ${props.saturation}%, ${props.luminosity}%, ${props.alpha})`
            );

            const valuetext = computed(() => {
                return colors[Math.round(angle.value / 60)];
            });

            watch(
                () => props.hue,
                (value) => {
                    angle.value = value;
                    rcp.angle = value;
                }
            );

            // ignore testing code that will be removed by dead code elimination for production
            // istanbul ignore next
            if (__DEV__ && props.initiallyCollapsed && props.variant === 'persistent') {
                console.warn(
                    `Incorrect config: using variant="persistent" and :initiallyCollapsed="true" at the same time is not supported.`
                );
            }

            onMounted(() => {
                // the Rorator module already has an extensive test suite
                // istanbul ignore next
                rcp = new Rotator(rotator.value, {
                    angle: angle.value,
                    onRotate(hue) {
                        angle.value = hue;
                        emit('input', angle.value);
                    },
                    onDragStart() {
                        isDragging.value = true;
                    },
                    onDragStop() {
                        isDragging.value = false;
                        emit('change', angle.value);
                    },
                });
            });

            onBeforeUnmount(() => {
                rcp.destroy();
                rcp = null;
            });

            const onKeyDown = (ev) => {
                if (props.disabled || isPressed.value || !isKnobIn.value || !(ev.key in keys)) return;

                ev.preventDefault();

                rcp.angle = keys[ev.key](rcp.angle, props.step);

                angle.value = rcp.angle;
                emit('input', angle.value);
                emit('change', angle.value);
            };

            const onScroll = (ev) => {
                if (isPressed.value || !isKnobIn.value) return;

                ev.preventDefault();

                if (ev.deltaY > 0) {
                    rcp.angle += props.step;
                } else {
                    rcp.angle -= props.step;
                }

                angle.value = rcp.angle;
                emit('input', angle.value);
                emit('change', angle.value);
            };

            const selectColor = () => {
                isPressed.value = true;

                if (isPaletteIn.value && isKnobIn.value) {
                    emit('select', angle.value);
                    isRippling.value = true;
                } else {
                    isPaletteIn.value = true;
                }
            };

            const togglePicker = () => {
                if (props.variant !== 'persistent') {
                    if (isKnobIn.value) {
                        isKnobIn.value = false;
                    } else {
                        isKnobIn.value = true;
                        isPaletteIn.value = true;
                    }
                }

                isRippling.value = false;
                isPressed.value = false;
            };

            const hidePalette = () => {
                if (!isKnobIn.value) {
                    isPaletteIn.value = false;
                }
            };

            return {
                // private API intented for testing memory leaks
                rcp,

                // refs
                el,
                rotator,

                // state
                initialAngle,
                angle,
                isPaletteIn,
                isKnobIn,
                isDragging,
                isRippling,
                isPressed,

                // computed
                color,
                valuetext,

                // methods
                onKeyDown,
                onScroll,
                selectColor,
                togglePicker,
                hidePalette,
            };
        },
    };
</script>

<style>
    .rcp,
    .rcp div,
    .rcp button {
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
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
        -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 53.5%, black 54%);
        mask-image: radial-gradient(circle at 50% 50%, transparent 53.5%, black 54%);
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
        filter: contrast(0.25);
    }

    .rcp__rotator {
        width: 100%;
        height: 100%;
        position: absolute;
        transform: rotate(var(--rcp-initial-angle));
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
        box-shadow: none;
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
