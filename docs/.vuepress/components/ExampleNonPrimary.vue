<template>
    <color-picker v-bind="color" @input="updateColor" />
</template>

<script>
    export default {
        name: 'example-non-primary',
        data() {
            return {
                color: {
                    hue: 338,
                    saturation: 91,
                    luminosity: 57,
                    alpha: 0.95,
                },
            };
        },
        methods: {
            updateColor(hue) {
                this.color.hue = hue;
            },
        },
    };
</script>
