## Radial Color Picker - Vue

<p align="center"><img width="250" src="https://raw.githubusercontent.com/radial-color-picker/vue-color-picker/HEAD/screenshots/thumbnail.png" alt="screenshot"></p>

<p align="center">
    <a href="https://www.npmjs.com/package/@radial-color-picker/vue-color-picker">
        <img src="https://img.shields.io/npm/dm/@radial-color-picker/vue-color-picker.svg" alt="Downloads">
    </a>
    <a href="https://www.npmjs.com/package/@radial-color-picker/vue-color-picker">
        <img src="https://img.shields.io/npm/v/@radial-color-picker/vue-color-picker.svg" alt="Version">
    </a>
    <a href="https://www.npmjs.com/package/@radial-color-picker/vue-color-picker">
        <img src="https://img.shields.io/npm/l/@radial-color-picker/vue-color-picker.svg" alt="License">
    </a>
    <a href="https://codecov.io/gh/radial-color-picker/vue-color-picker">
        <img src="https://codecov.io/gh/radial-color-picker/vue-color-picker/branch/master/graph/badge.svg" alt="Code Coverage" />
    </a>
</p>

## Introduction

Great UX starts with two basic principles - ease of use and simplicity. Selecting a color should be as easy as moving a slider, clicking a checkbox or pressing a key just like other basic form elements behave.

This is a flexible and minimalistic color picker. Developed with mobile devices and keyboard usage in mind. Key features:
* Small size - 3.3 KB gzipped (JS and CSS combined)
* Supports touch devices
* Optimized animations
* Ease of use
    * Screen reader support.
    * <kbd>Tab</kbd> to focus the picker.
    * <kbd>↑</kbd> or <kbd>→</kbd> arrow key to increase hue. <kbd>PgUp</kbd> to go quicker.
    * <kbd>↓</kbd> or <kbd>←</kbd> arrow key to decrease hue. <kbd>PgDown</kbd> to go quicker.
    * <kbd>Enter</kbd> to select a color and close the picker or to open it.
    * Mouse <kbd>ScrollUp</kbd> to increase and <kbd>ScrollDown</kbd> to decrease hue (Opt-in).
* Experimental TypeScript support

## Documentation

You can find the documentation on the [website](https://radial-color-picker.github.io/vue-color-picker/).
The documentation is divided into several sections:

* [Getting Started](https://radial-color-picker.github.io/vue-color-picker/guide/getting-started.html)
* [Examples](https://radial-color-picker.github.io/vue-color-picker/examples.html)
* [Config Reference](https://radial-color-picker.github.io/vue-color-picker/api.html)
* [First Asked Questions](https://radial-color-picker.github.io/vue-color-picker/guide/faq.html)

## Ecosystem

The right color picker, but not the framework you're looking for?
* [Vue][link-vue-color-picker] - you're here!
* [React][link-react-color-picker]
* [AngularJs][link-angularjs-color-picker]
* [Angular][link-angular-color-picker]

## Demos

* Basic Example - [Codepen](https://codepen.io/rkunev/pen/zjEmwV/)
* Other Examples in the [docs](https://radial-color-picker.github.io/vue-color-picker/examples.html)

## Usage

Color Picker on [npm](https://www.npmjs.com/package/@radial-color-picker/vue-color-picker)
```bash
npm install @radial-color-picker/vue-color-picker@next
```

And in your app:

```vue
<template>
    <color-picker v-bind="color" @input="onInput"></color-picker>
</template>

<script>
    import { reactive } from 'vue';
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

## Change log

Please see [Releases][link-releases] for more information on what has changed recently.

## Vue 3 and `@vue/compat`

If your app isn't ready to upgrade to Vue 3 you can slowly transition via `@vue/compat` and the [instructions provided there](https://www.npmjs.com/package/@vue/compat). Once you're done you might notice a warning message - `ATTR_FALSE_VALUE`. This is intended behavior and you can optionally silence the warning with `configureCompat({ ATTR_FALSE_VALUE: false })`. When using Vue 3 without the compat layer the warning will go away too.

<details>
    <summary>Details</summary>
    <pre>
[Vue warn]: (deprecation ATTR_FALSE_VALUE) Attribute "aria-disabled" with v-bind value `false` will <br>render aria-disabled="false" instead of removing it in Vue 3. To remove the attribute, use `null` or <br>`undefined` instead. If the usage is intended, you can disable the compat behavior and suppress this warning with:<br>
configureCompat({ ATTR_FALSE_VALUE: false })<br>
Details: https://v3.vuejs.org/guide/migration/attribute-coercion.html
at &lt;ColorPicker&gt;
at &lt;App&gt;</pre>
</details>

## Migration

### Migration from v3

1. Double-click to move the knob to the current position of the pointer is gone since this is now the default behavior as soon as the clicks on the palette. If you had a tooltip or a help section in your app that described the shortcut you should remove it.

2. With v4 the keyboard shortcuts are better aligned with the suggested keys for any [sliders](https://www.w3.org/TR/wai-aria-practices/#slider). This means that the <kbd>Shift/Ctrl + ↑/→</kbd>/<kbd>Shift/Ctrl + ↓/←</kbd> non-standard key combos are replaced by the simpler <kbd>PageDown</kbd> and <kbd>PageUp</kbd>. If you had a tooltip or a help section in your app that described the shortcut keys you should update it.

3. The `@change` event is now emitted when the user changes the color (knob drop, click on the palette, keyboard interaction, scroll) and a `@select` event is emitted when interacting with the color well (middle selector).

```diff
  <color-picker
      :hue="hue"
      @input="updateHue"
-     @change="onColorSelect"
  />

  <color-picker
      :hue="hue"
      @input="updateHue"
+     @change="onColorChange"
+     @select="onColorSelect"
  />
```

## Contributing

If you're interested in the project you can help out with feature requests, bugfixes, documentation improvements or any other helpful contributions. You can use the issue list of this repo for bug reports and feature requests and as well as for questions and support.

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) and [CODE_OF_CONDUCT](.github/CODE_OF_CONDUCT.md) for details.

## Credits

- [Rosen Kanev][link-author]
- [Dennis Dierkes](https://github.com/deen13)
- [All Contributors][link-contributors]

This component is based on the great work that was done for the [AngularJs color picker][link-angularjs-color-picker].

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-react-color-picker]: https://github.com/radial-color-picker/react-color-picker
[link-vue-color-picker]: https://github.com/radial-color-picker/vue-color-picker
[link-angular-color-picker]: https://github.com/radial-color-picker/angular-color-picker
[link-angularjs-color-picker]: https://github.com/talamaska/angular-radial-color-picker
[link-author]: https://github.com/rkunev
[link-contributors]: ../../contributors
[link-releases]: ../../releases
