<template>
    <ColorPicker v-bind="color" @input="updateColor" />
</template>

<script>
    import { reactive } from 'vue';

    export default {
        name: 'example-non-primary',
        setup() {
            const color = reactive({
                hue: 338,
                saturation: 91,
                luminosity: 57,
                alpha: 0.95,
            });

            return {
                color,
                updateColor(value) {
                    color.hue = value;
                },
            };
        },
    };
</script>
