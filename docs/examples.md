---
sidebar: auto
---

# Examples

:::tip
Looking for a quicker way to try it out yourself? Checkout the [examples](https://github.com/radial-color-picker/vue-color-picker/tree/master/examples) folder in GitHub. There's an example with Vue CLI and Nuxt.js.

There's a [codepen](https://codepen.io/rkunev/pen/zjEmwV/) as well.
:::

## Basic

In it's most basic form the color picker can be used as below.

<example-basic />
<<< @/docs/.vuepress/components/ExampleBasic.vue

## Working with non-primary colors

The basic example assumes only the most saturated colors and uses the default values for `saturation`, `luminosity` and `alpha`, but we're not limitted to them. Here's an example with a less aggressive saturation and luminosity:

<example-non-primary />
<<< @/docs/.vuepress/components/ExampleNonPrimary.vue{2,10,11,12,13,14,15,19,20,21}

## Uncontrolled component

If you only need to react to `@change` or `@select` events you can skip `hue` + `@input`. Here's an example

<example-uncontrolled />
<<< @/docs/.vuepress/components/ExampleUncontrolled.vue{2,10,14,15,16}

## Persistent mode

It's not always convenient to show the picker in a modal window that is shown/hidden on demand. That's why the color picker has an inline mode where interacting with the color well in the middle will not collapse the palette and the picker will stay opened.

<example-non-collapsing-mode />
<<< @/docs/.vuepress/components/ExampleNonCollapsingMode.vue{2}

## Accessibility

The color picker already has built-in screen reader support, but if you wish to customize it further you're free to do so! In fact, if you're app has internationalization (e.g. it's translated in Spanish) you _should_ also translate the `aria-label`, `aria-roledescription`, `aria-valuetext`, and `aria-label-color-well`. The following example highlights how to tweak the `aria-valuetext` since it's a dynamic value.

<example-accessibility />
<<< @/docs/.vuepress/components/ExampleAccessibility.vue{2,6,19,20,21,22,23,24,25,26,27,28,29}

<style>
.rcp {
    margin: 32px auto;
}
</style>

