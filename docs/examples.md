---
sidebar: auto
---

# Examples

:::tip
Looking for a quicker way to try it out yourself? Checkout the [examples](https://github.com/radial-color-picker/vue-color-picker/tree/master/examples) folder in GitHub. There's an example with Vite and a vanilla example without a build step.

There's a [codepen](https://codepen.io/rkunev/pen/zjEmwV/) as well.
:::

## Basic

In it's most basic form the color picker can be used as below.

<ExampleBasic />

@[code](./.vuepress/components/ExampleBasic.vue)

## Working with non-primary colors

The basic example assumes only the most saturated colors and uses the default values for `saturation`, `luminosity` and `alpha`, but we're not limitted to them. Here's an example with a less aggressive saturation and luminosity:

<ExampleNonPrimary />

@[code vue](./.vuepress/components/ExampleNonPrimary.vue)

## Uncontrolled component

If you only need to react to `@change` or `@select` events you can skip `hue` + `@input`. Here's an example

<ExampleUncontrolled />

@[code vue](./.vuepress/components/ExampleUncontrolled.vue)

## Persistent mode

It's not always convenient to show the picker in a modal window that is shown/hidden on demand. That's why the color picker has an inline mode where interacting with the color well in the middle will not collapse the palette and the picker will stay opened.

<ExampleNonCollapsingMode />

@[code vue](./.vuepress/components/ExampleNonCollapsingMode.vue)

## Accessibility

The color picker already has built-in screen reader support, but if you wish to customize it further you're free to do so! In fact, if you're app has internationalization (e.g. it's translated in Spanish) you _should_ also translate the `aria-label`, `aria-roledescription`, `aria-valuetext`, and `aria-label-color-well`. The following example highlights how to tweak the `aria-valuetext` since it's a dynamic value.

<ExampleAccessibility />

@[code vue](./.vuepress/components/ExampleAccessibility.vue)

<style>
.rcp {
    margin: 32px auto;
}
</style>
