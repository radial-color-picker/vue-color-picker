# Getting Started

## Using NPM

Color Picker on [npm](https://www.npmjs.com/package/@radial-color-picker/vue-color-picker)

```bash
npm install @radial-color-picker/vue-color-picker
```

And in your app:

```vue
<template>
    <ColorPicker v-bind="color" @input="onInput" />
</template>

<script>
    import ColorPicker from '@radial-color-picker/vue-color-picker';

    export default {
        components: { ColorPicker },
        setup() {
            const color = reactive({
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            });

            return {
                color,
                onInput(hue) {
                    color.hue = hue;
                },
            };
        },
    };
</script>

<style>
    @import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
```

Depending on your build tool of choice you may have to setup the appropriate loaders or plugins. Checkout the [examples](https://github.com/radial-color-picker/vue-color-picker/tree/master/examples) folder. There's an example with Vite and CSS. If you're using tools such as Vite, Vue CLI, or Poi you don't have to do anything else - these tools come preconfigured and support CSS import out of the box.

## Using the component globally

If you don't want to register the component everywhere it's used you can instead register it globally:

```js
// in your main.js file
import { createApp } from 'vue';
import App from './App.vue';

import ColorPicker from '@radial-color-picker/vue-color-picker';
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

const app = createApp(App);

app.component('ColorPicker', ColorPicker);
app.mount('#app');
```

## Using CDN

You can also use the minified sources directly:

```html
<head>
    <script src="https://unpkg.com/vue@3.4.21/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/@radial-color-picker/vue-color-picker/dist/vue-color-picker.umd.min.js"></script>
    <link
        href="https://unpkg.com/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css"
        rel="stylesheet"
    />
</head>
<body>
    <div id="app">
        <color-picker v-bind="color" @input="onInput"></color-picker>
    </div>

    <script>
        var ColorPicker = window.VueColorPicker;

        Vue.createApp({
            components: {
                ColorPicker: ColorPicker,
            },
            setup() {
                const color = Vue.reactive({
                    hue: 50,
                    saturation: 100,
                    luminosity: 50,
                    alpha: 1,
                });

                return {
                    color,
                    onInput(hue) {
                        color.hue = hue;
                    },
                };
            },
        }).mount('#app');
    </script>
</body>
```