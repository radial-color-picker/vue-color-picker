<template>
    <color-picker variant="persistent" :hue="hue" @input="updateColor" />
</template>

<script>
export default {
    name: 'ExampleNonCollapsingMode',
    data() {
        return { hue: 50 };
    },
    methods: {
        updateColor(hue) { this.hue = hue },
    },
};
</script>

