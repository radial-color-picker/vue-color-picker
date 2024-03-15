<template>
    <div id="app">
        <ColorPicker
            aria-roledescription="radial slider"
            aria-label="color picker"
            aria-label-color-well="color well"
            :aria-valuetext="valuetext"
            :hue="hue"
            :saturation="saturation"
            :luminosity="luminosity"
            :alpha="alpha"
            :mouse-scroll="useScroll"
            :step="step"
            :variant="step"
            @input="onInput"
            @change="onChange"
            @select="onSelect"
        />
        <h1>{{ msg }}</h1>
        <pre>{{ { hue, saturation, luminosity, alpha } }}</pre>
    </div>
</template>

<script>
    import ColorPicker from '@radial-color-picker/vue-color-picker';
    import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

    const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'red'];

    export default {
        name: 'app',
        components: { ColorPicker },
        computed: {
            // human readable text alternative of the hue (e.g. red)
            // for more details see https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext
            valuetext() {
                return colors[Math.round(this.hue / 60)];
            },
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',

                // configure the color
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1,

                // increase scroll (and keyboard) step size
                step: 5,

                // change color with mouse scroll
                useScroll: true,

                // 'persistent' for non-collapsing picker
                variant: 'collapsible',

                // support for disabling UI interactions too!
                disabled: false,

                // can start from a collapsed state
                initiallyCollapsed: false,
            };
        },
        methods: {
            // Emitted every time the color updates (i.e. rotation of the wheel).
            onInput(hue) {
                this.hue = hue;
            },

            // Emitted after the user releases the knob
            onChange(hue) {
                this.hue = hue;
                console.log('Color changed. User selected:', hue);
            },

            // Emitted when the user dismisses the color picker (i.e. interacting with the middle color well).
            onSelect(hue) {
                console.log('Color picker was dismissed', hue);
            },
        },
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #2c3e50;
        margin-top: 40px;
    }

    h1 {
        font-weight: normal;
    }

    pre {
        min-width: 275px;
        padding: 15px 30px;
        background: #f8f8f8;
        color: #525252;
        font-size: 15px;
        font-weight: bold;
        line-height: 1.6;
        margin: 0;
    }

    @media (max-width: 420px) {
        h1 {
            font-size: 1.4em;
        }
    }
</style>
