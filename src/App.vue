<template>
    <main id="app">
        <h1>Color picker</h1>

        <form>
            <div :class="{ curtain: true, active: isVisible }" :style="{ background: bg }"></div>
            <button type="button" @click="pullCurtains">{{ isVisible ? 'Hide' : 'Show' }} Curtain</button>

            <color-picker v-bind="color" @input="onInput" />

            <label>
                Hue
                <input v-model="color.hue" type="range" name="hue" min="0" max="360" step="1" />
            </label>
        </form>
    </main>
</template>

<script>
import ColorPicker from './ColorPicker';

export default {
    components: { ColorPicker },
    data() {
        return {
            isVisible: false,
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        };
    },
    computed: {
        bg() {
            return `hsl(${this.color.hue}, 95%, 53%)`;
        },
    },
    methods: {
        onInput(hue) {
            this.color.hue = hue;
        },
        pullCurtains() {
            this.isVisible = !this.isVisible;
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2c3e50;
    margin-top: 60px;
    text-align: center;
}

label {
    margin-top: 30px;
    display: flex;
    max-width: 320px;
    width: 100%;
}

input[type='range'] {
    flex-grow: 1;
    margin-left: 15px;
}

.curtain {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: #ccc;
    z-index: 1;
    display: none;
}

.curtain.active {
    display: block;
}

button {
    margin-bottom: 30px;
    position: relative;
    z-index: 2;
}
</style>
