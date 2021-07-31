<template>
    <color-picker v-bind="color" @input="onInput" :aria-valuetext="valuetext" />
</template>

<script>
    const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'red'];

    export default {
        name: 'example-accessibility',
        data() {
            return {
                color: {
                    hue: 141,
                    saturation: 60,
                    luminosity: 75,
                },
            };
        },
        computed: {
            // calculate the corresponding color
            valuetext() {
                // Note: you don't have to cut corners.
                // Use regular switch/if-else if it makes more sense
                const index = Math.round(this.color.hue / 60);
                const value = colors[index];

                return `light ${value}`;
            },
        },
        methods: {
            onInput(hue) {
                this.color.hue = hue;
            },
        },
    };
</script>
