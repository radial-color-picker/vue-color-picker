<template>
    <color-picker v-bind="color" @change="onChange" />
</template>

<script>
    import ColorPicker from './ColorPicker';

    export default {
        components: { ColorPicker },
        data() {
            return {
                color: {
                    hue: 50,
                    saturation: 100,
                    luminosity: 50,
                    alpha: 1,
                },
            };
        },
        methods: {
            onChange(hue) {
                this.hue = hue;
            },
        },
    };
</script>
