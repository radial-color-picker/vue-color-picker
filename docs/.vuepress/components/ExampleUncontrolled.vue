<template>
    <color-picker @select="onColorSelect" />
</template>

<script>
    import { ref } from 'vue';

    export default {
        name: 'example-uncontrolled',
        setup() {
            const color = ref('hsl(0, 100%, 50%)');

            return {
                onColorSelect(hue) {
                    color.value = `hsl(${hue}, 100%, 50%)`;
                },
            };
        },
    };
</script>
