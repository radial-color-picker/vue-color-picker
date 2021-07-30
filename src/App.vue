<template>
    <color-picker v-bind="color" @input="onInput" :disabled="true" />
</template>

<script>
import ColorPicker from '../src/ColorPicker.vue';

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
        onInput(hue) {
            this.color.hue = hue;
        },
    },
};
</script>
