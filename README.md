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
    <a href="https://circleci.com/gh/radial-color-picker/vue-color-picker">
        <img src="https://circleci.com/gh/radial-color-picker/vue-color-picker.svg?style=shield" alt="CircleCI">
    </a>
    <a href="https://codecov.io/gh/radial-color-picker/vue-color-picker">
      <img src="https://codecov.io/gh/radial-color-picker/vue-color-picker/branch/master/graph/badge.svg" alt="Code Coverage" />
    </a>
</p>

## Introduction

Great UX starts with two basic principles - ease of use and simplicity. Selecting a color should be as easy as moving a slider, clicking a checkbox or pressing a key just like other basic form elements behave.

This is a flexible and minimalistic color picker. Developed with mobile devices and keyboard usage in mind. Key features:
* Small size - 4 KB gzipped (JS and CSS combined)
* Supports touch devices
* Optimized animations
* Ease of use
    * Double click anywhere to move the knob to a color
    * <kbd>Tab</kbd> to focus the picker
    * <kbd>↑</kbd> or <kbd>→</kbd> arrow key to increase hue. <kbd>Shift + ↑/→</kbd> to go quicker and <kbd>Ctrl + ↑/→</kbd> to go even quicker.
    * <kbd>↓</kbd> or <kbd>←</kbd> arrow key to decrease hue. <kbd>Shift + ↓/←</kbd> to go quicker and <kbd>Ctrl + ↓/←</kbd> to go even quicker.
    * <kbd>Enter</kbd> to select a color and close the picker or to open it
    * Mouse <kbd>ScrollUp</kbd> to increase and <kbd>ScrollDown</kbd> to decrease hue (Opt-in)

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
* [Angular][link-angular-color-picker] (under construction)

## Quick Links

* [Demos](#demos)
* [Usage](#usage)
* [Options](#options)
* [Change log](#change-log)
* [Migration from v1](#migration-from-v1)
* [Contributing](#contributing)
* [Credits](#credits)
* [License](#license)

## Demos

* Basic Example - [Codepen](https://codepen.io/rkunev/pen/zjEmwV/)
* Other Examples in the [docs](https://radial-color-picker.github.io/vue-color-picker/examples.html)

## Usage

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

## Options
`<color-picker>` component has several props and events. [See the "with-config" example](./examples/with-config) which uses all options.

### Props

| Name         | Type    | Default        | Description |
|--------------|---------|----------------|-------------|
| hue          | Number  | `0`            | A number between `0-359`. **Required**. |
| saturation   | Number  | `100`          | A number between `0-100` |
| luminosity   | Number  | `50`           | A number between `0-100` |
| alpha        | Number  | `1`            | A number between `0-1` |
| disabled     | Boolean | `false`        | A boolean to disable UI interactions |
| step         | Number  | `2`            | Amount of degrees to rotate the picker with keyboard and/or wheel. |
| variant      | String  | `collapsible`  | Use `persistent` to prevent collapsing/closing |
| initially-collapsed | Boolean | `false` | Hides the palette initially |
| mouse-scroll | Boolean | `false`        | Use wheel (scroll) event to rotate. |

### Events

| Name     | Description |
|----------|-------------|
| `input`  | Emitted every time the color changes (i.e. rotation of the wheel). **Required**. |
| `change` | Emitted when the user dismisses the color picker (i.e. interacting with the middle color well). |

[Back To Top](#quick-links)

## Change log

Please see [Releases][link-releases] for more information on what has changed recently.

[Back To Top](#quick-links)

## Migration from v1

Straight forward - `v-model` becomes `v-bind` and you need to add the `@input` event (which was previously added by the `v-model` directive implicitly).

```diff
<template>
-   <color-picker v-model="color"></color-picker>
+   <color-picker v-bind="color" @input="onInput"></color-picker>
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
+   methods: {
+       onInput: function(hue) {
+           this.color.hue = hue;
+       }
+   }
};
```

[Back To Top](#quick-links)

## Contributing

If you're interested in the project you can help out with feature requests, bugfixes, documentation improvements or any other helpful contributions. You can use the issue list of this repo for bug reports and feature requests and as well as for questions and support.

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) for details.

[Back To Top](#quick-links)

## Credits

- [Rosen Kanev][link-author]
- [Dennis Dierkes](https://github.com/deen13)
- [All Contributors][link-contributors]

This component is based on the great work that was done for the [AngularJs color picker][link-angularjs-color-picker].

[Back To Top](#quick-links)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-react-color-picker]: https://github.com/radial-color-picker/react-color-picker
[link-vue-color-picker]: https://github.com/radial-color-picker/vue-color-picker
[link-angular-color-picker]: https://github.com/radial-color-picker/angular-color-picker
[link-angularjs-color-picker]: https://github.com/talamaska/angular-radial-color-picker
[link-author]: https://github.com/rkunev
[link-contributors]: ../../contributors
[link-releases]: ../../releases

[Back To Top](#quick-links)
