<template>
    <ColorPicker :hue="hue" @input="updateColor" />
</template>

<script>
    import { ref } from 'vue';

    export default {
        name: 'example-basic',
        setup() {
            const hue = ref(50);

            return {
                hue,
                updateColor(value) {
                    hue.value = value;
                },
            };
        },
    };
</script>
