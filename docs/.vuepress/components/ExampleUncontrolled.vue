<template>
    <color-picker @select="onColorSelect" />
</template>

<script>
export default {
    name: 'example-uncontrolled',
    data() {
        return {
            color: 'hsl(0, 100%, 50%)',
        };
    },
    methods: {
        onColorSelect(hue) {
            this.color = `hsl(${hue}, 100%, 50%)`;
        },
    },
};
</script>
