---
sidebar: auto
---
# Config Reference

## Props

### hue

* Type: `Number`
* Default: `0`
* **Required**

A number between `0-359`. Around 0º and 360º are reds. 120º is where greens are and 240º are blues.

### saturation

* Type: `Number`
* Default: `100`
* _Optional_

A number between `0-100`. The larger the percentage, the more "colorful" this color is. 0% is completely desaturated (grayscale). 100% is fully saturated (full color).

### luminosity

* Type: `Number`
* Default: `50`
* _Optional_

A number between `0-100`. 0% is completely dark (black). 100% is completely light (white). 50% is average lightness.

### alpha

* Type: `Number`
* Default: `1`
* _Optional_

A number between `0-1`. Opacity/Transparency value. 0 is fully transparent. 1 is fully opaque. 0.5 is 50% transparent.

### disabled

* Type: `Boolean`
* Default: `false`
* _Optional_

A boolean to disable UI interactions. When `:disabled="true"` is used the color picker is rendered with a dimmer color to indicate that the field is not available for use.

### step

* Type: `Number`
* Default: `2`
* _Optional_

Amount of degrees to rotate the picker with keyboard and/or wheel.

### variant

* Type: `String`
* Default: `collapsible`
* _Optional_

The mode of the picker. By default it will close/open when the color well is clicked. Use `variant="persistent"` to prevent collapsing/closing and to keep the widget always open.

### initially-collapsed

* Type: `Boolean`
* Default: `false`
* _Optional_

Hides the palette initially. Using `variant="persistent"` and `:initially-collapsed="true"` at the same time is not supported.

### mouse-scroll

* Type: `Boolean`
* Default: `false`
* _Optional_

Use wheel (scroll) event to rotate. By default it's off to keep things simple. Add `:mouse-scroll="true"` to allow the user to change the color by scrolling with mouse/trackpad.

::: danger Here be dragons!
Keep in mind that by turning the _scroll to rotate_ functionality on it may result in actually worse UX than without it (preventing page scroll while mouse pointer is over the picker). It's also another non-passive event listener that could potentially introduce jank on scroll.
:::

## Events

### input

* Type: `Function`
* Params: `hue` (`Number`)
* **Required**

Emitted every time the color changes (i.e. rotation of the wheel). It's also the glue between the color picker component and the outside world. Use this to update the `hue` prop.

```vue{2,11,12,13}
<template>
    <color-picker :hue="hue" @input="onInput" />
</template>

<script>
export default {
    data() {
        return { hue: 50 };
    },
    methods: {
        onInput(hue) {
            this.hue = hue;
        },
    },
};
</script>
```

### change

* Type: `Function`
* Params: `hue` (`Number`)
* _Optional_

Emitted when the user dismisses the color picker (i.e. interacting with the middle color well). Can be used as a secondary confirmation step from the user that this is the color value to be saved for example.

```vue{2,12,13,14}
<template>
    <color-picker :hue="hue" @input="onInput" @change="onChange" />
</template>

<script>
export default {
    data() {
        return { hue: 50 };
    },
    methods: {
        onInput(hue) { this.hue = hue },
        onChange(hue) {
            console.log('Color picker was dismissed.', hue);
        },
    },
};
</script>
```

