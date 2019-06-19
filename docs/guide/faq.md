# First Asked Questions

## What's the browser support?

The **last two versions of major browsers** (Chrome, Safari, Firefox, Edge) are supported though it will probably work in other browsers, webviews and runtimes as well.


## How to select other shades of the solid colors?

The saturation, luminosity and alpha props are **display-only** values - you can only change the hue through the picker. We suggest to add a custom slider for saturation and luminosity or use `<input type="range">`.


## Why HSL?

Regular HEX color format is limitting (no alpha channel) and browser support for HSLA is great. It's also sometimes more intuitive to work with HSLA notation since hue and angles map 1:1. Primary red color is at 0º, primary green is at 120º and gold for example sits somewhere in between. When a user rotates the wheel the hue is updated respectively.

::: tip Setting The Value of input of type color
The value of an `<input>` element of type `"color"` is a 7-character string specifying an RGB color in hexadecimal format. In addition, colors with an alpha channel are not supported; specifying a color in 9-character hexadecimal notation (e.g. `#009900aa`) will also result in the color being set to `"#000000"`.
:::
_[Source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value)_

## Why exactly `input`/`change` events?

Event names are based on the HTML `<input type="color">`

::: tip Tracking color change of input of type color
As is the case with other `<input>` types, there are two events that can be used to detect changes to the color value: input and change. input is fired on the `<input>` element every time the color changes. The change event is fired when the user dismisses the color picker.
:::
_[Source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Tracking_color_changes)_

## Why is the scroll-to-rotate functionality not turned on by default?

It's another non-passive event that could potentially introduce jank on scroll. To rotate the color knob, but stay on the same scrolling position the `wheel` event is blocked with `preventDefault()`. Thus, if you really want this feature for your users you'll have to explicitly add `:mouse-scroll="true"`.

## Why am I getting a warning event in the console?

The `[Violation] Added non-passive event listener to a scroll-blocking 'touchmove' event.` warning may appear in Google Chrome DevTools console.

`touchmove` is used with `preventDefault()` to block scrolling on mobile while rotating the color knob. Even the [Web Incubator Community Group](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#removing-the-need-to-cancel-events) acknowledges that in some cases a passive event listener can't be used.
