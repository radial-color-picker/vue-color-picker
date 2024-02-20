<template>
    <color-picker v-bind="color" @input="onInput" :aria-valuetext="valuetext" />
</template>

<script>
    import { reactive, computed } from 'vue';

    const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'red'];

    export default {
        name: 'example-accessibility',
        setup() {
            const color = reactive({
                hue: 141,
                saturation: 60,
                luminosity: 75,
            });

            const valuetext = computed(() => {
                // Note: you don't have to cut corners.
                // Use regular switch/if-else if it makes more sense
                const index = Math.round(color.hue / 60);
                const value = colors[index];

                return `light ${value}`;
            });

            return {
                color,
                valuetext,
                onInput(hue) {
                    color.hue = hue;
                },
            };
        },
    };
</script>
