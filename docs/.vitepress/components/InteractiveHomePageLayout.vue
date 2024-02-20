<script setup>
    import { ref } from 'vue';
    import DefaultTheme from 'vitepress/theme';

    const { Layout } = DefaultTheme;
    const hue = ref(50);

    const updateColor = (value) => {
        hue.value = value;

        const left = value - 70 <= 0 ? 360 - (70 - value) : value - 70;

        document.documentElement.style.setProperty(
            '--vp-home-hero-name-background',
            `linear-gradient(90deg, hsl(${left}deg 100% 58.43%) 30%, hsl(${value}deg 100% 50%))`
        );
    };
</script>

<template>
    <Layout>
        <template #home-hero-image>
            <color-picker :hue="hue" @input="updateColor" />
        </template>
    </Layout>
</template>

<style>
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: linear-gradient(90deg, hsl(340deg 100% 58.43%) 30%, hsl(50deg 100% 50%));
    }
</style>
