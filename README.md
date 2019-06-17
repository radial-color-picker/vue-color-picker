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
* Small size - 3.7 KB gzipped (JS and CSS combined)
* Supports touch devices
* Optimized animations
* Ease of use
    * Double click anywhere to move the knob to a color
    * <kbd>Tab</kbd> to focus the picker
    * <kbd>↑</kbd> or <kbd>→</kbd> arrow key to increase hue. <kbd>Shift + ↑/→</kbd> to go quicker and <kbd>Ctrl + ↑/→</kbd> to go even quicker.
    * <kbd>↓</kbd> or <kbd>←</kbd> arrow key to decrease hue. <kbd>Shift + ↓/←</kbd> to go quicker and <kbd>Ctrl + ↓/←</kbd> to go even quicker.
    * <kbd>Enter</kbd> to select a color and close the picker or to open it
    * Mouse <kbd>ScrollUp</kbd> to increase and <kbd>ScrollDown</kbd> to decrease hue (Opt-in)

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
* [FAQ](#first-asked-questions)
* [Change log](#change-log)
* [Migration from v1](#migration-from-v1)
* [Contributing](#contributing)
* [Credits](#credits)
* [License](#license)

## Demos

* Basic Example - [Codepen](https://codepen.io/rkunev/pen/zjEmwV/)

## Usage

#### With Module Build System
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

Depending on your build tool of choice you may have to setup the appropriate loaders or plugins. Checkout the [examples](./examples) folder. There's an example with Vue CLI 3 and Nuxt.js. If you're using `vue-cli` or `poi` you don't have to do anything else - these tools come preconfigured and support CSS/SCSS import out of the box.

#### UMD version

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

[Back To Top](#quick-links)

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
| variant      | String  | `collapsible`  | Use `persistent` to prevent collapsing/closing |
| mouse-scroll | Boolean | `false`        | Use wheel (scroll) event to rotate. |
| step         | Number  | `2`            | Amount of degrees to rotate the picker with keyboard and/or wheel. |
| initially-collapsed | Boolean | `false` | Hides the palette initially |

### Events

| Name     | Description |
|----------|-------------|
| `input`  | Emitted every time the color changes (i.e. rotation of the wheel). |
| `change` | Emitted when the user dismisses the color picker (i.e. interacting with the middle color well). |

[Back To Top](#quick-links)

## First Asked Questions

<details>
    <summary>What's the browser support?</summary>
    <p>The <b>last two versions of major browsers</b> (Chrome, Safari, Firefox, Edge) are supported though it will probably work in other browsers, webviews and runtimes as well.</p>
</details>

<details>
    <summary>How to select other shades of the solid colors?</summary>
    <p>We suggest to add a custom slider for saturation and luminosity or use <code>&lt;input type="range"&gt;</code>.</p>
</details>

<details>
    <summary>Why HSL?</summary>
    <p>Regular HEX color format is limitting (no alpha channel) and browser support for HSLA is great. It's also sometimes more intuitive to work with HSLA notation since hue and angles map 1:1. Primary red color is at 0º, primary green is at 120º and gold for example sits somewhere in between. When a user rotates the wheel the hue is updated respectively. The saturation, luminosity and alpha props are <b>display-only</b> values - you can only change the hue.
    </p>
    <blockquote>
        The value of an <code>&lt;input&gt;</code> element of type <code>"color"</code> is a 7-character string specifying an RGB color in hexadecimal format. In addition, colors with an alpha channel are not supported; specifying a color in 9-character hexadecimal notation (e.g. <code>#009900aa</code>) will also result in the color being set to <code>"#000000"</code>.
        <p><i><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value">Setting The Value of input of type color - MDN</a></i></p>
    </blockquote>
</details>

<details>
    <summary>Why exactly <i><code>input</code></i>/<i><code>change</code></i> events?</summary>
    <p>
        Event names are based on the HTML <code>&lt;input type="color"&gt;</code>
    </p>
    <blockquote>
        As is the case with other <code>&lt;input&gt;</code> types, there are two events that can be used to detect changes to the color value: input and change. input is fired on the <code>&lt;input&gt;</code> element every time the color changes. The change event is fired when the user dismisses the color picker.
        <p><i><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Tracking_color_changes">Tracking color change of input of type color - MDN</a></i></p>
    </blockquote>
</details>

<details>
    <summary>Why does Google Chrome throw a <code>[Violation] Added non-passive event listener to a scroll-blocking 'touchmove' event.</code> warning in the console?</summary>
    <p><code>touchmove</code> is used with <code>preventDefault()</code> to block scrolling on mobile while rotating the color knob. Even the <a href="https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#removing-the-need-to-cancel-events">Web Incubator Community Group</a> acknowledges that in some cases a passive event listener can't be used.</p>
</details>

<details>
    <summary>Why is the scroll-to-rotate functionality not turned on by default?</summary>
    <p>It's another non-passive event that could potentially introduce jank on scroll. To rotate the color knob, but stay on the same scrolling position the <code>wheel</code> event is blocked with <code>preventDefault()</code>. Thus, if you really want this feature for your users you'll have to explicitly add <code>:mouse-scroll="true"</code>.</p>
</details>

<br>

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
