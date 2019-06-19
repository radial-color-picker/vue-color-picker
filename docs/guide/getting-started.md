# Getting Started

## Using NPM

Color Picker on [npm](https://www.npmjs.com/package/@radial-color-picker/vue-color-picker)
```bash
npm install @radial-color-picker/vue-color-picker
```

And in your app:

```vue
<template>
    <color-picker v-bind="color" @input="onInput"></color-picker>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';

export default {
    components: { ColorPicker },
    data() {
        return {
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
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

<style>
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
```

Depending on your build tool of choice you may have to setup the appropriate loaders or plugins. Checkout the [examples](https://github.com/radial-color-picker/vue-color-picker/tree/master/examples) folder. There's an example with Vue CLI 3 and Nuxt.js. If you're using `vue-cli` or `poi` you don't have to do anything else - these tools come preconfigured and support CSS/SCSS import out of the box.

## Using CDN

You can also use the minified sources directly:

```html
<head>
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.js"></script>
    <link href="https://unpkg.com/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css" rel="stylesheet">
</head>
<body>
    <color-picker v-bind="color" @input="onInput"></color-picker>

    <script>
        var ColorPicker = window.VueColorPicker;

        var app = new Vue({
            el: '#app',
            components: {
                ColorPicker: ColorPicker
            },
            data: {
                color: {
                    hue: 50,
                    saturation: 100,
                    luminosity: 50,
                    alpha: 1
                }
            },
            methods: {
                onInput: function(hue) {
                    this.color.hue = hue;
                }
            }
        });
    </script>
</body>
```
