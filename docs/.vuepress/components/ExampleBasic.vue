<template>
    <color-picker :hue="hue" @input="updateColor" />
</template>

<script>
export default {
    name: 'example-basic',
    data() {
        return { hue: 50 };
    },
    methods: {
        updateColor(hue) { this.hue = hue },
    },
};
</script>
