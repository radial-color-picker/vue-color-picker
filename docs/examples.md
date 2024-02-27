# Examples

:::tip
Looking for a quicker way to try it out yourself? Checkout the [examples](https://github.com/radial-color-picker/vue-color-picker/tree/main/examples) folder in GitHub. There's an example with Vite and a vanilla example without a build step.

There's a [codepen](https://codepen.io/rkunev/pen/zjEmwV/) as well.
:::

## Basic

In it's most basic form the color picker can be used as below.

<ExampleBasic />

<<< @/.vitepress/components/examples/Basic.vue{2,6,11,14-17}

## Working with non-primary colors

The basic example assumes only the most saturated colors and uses the default values for `saturation`, `luminosity` and `alpha`, but we're not limitted to them. Here's an example with a less aggressive saturation and luminosity:

<ExampleNonPrimary />

<<< @/.vitepress/components/examples/NonPrimary.vue{2,6,11-17,19-22}

## Uncontrolled component

If you only need to react to `@change` or `@select` events you can skip `hue` + `@input`. Here's an example

<ExampleUncontrolled />

<<< @/.vitepress/components/examples/Uncontrolled.vue

## Persistent mode

It's not always convenient to show the picker in a modal window that is shown/hidden on demand. That's why the color picker has an inline mode where interacting with the color well in the middle will not collapse the palette and the picker will stay opened.

<ExampleNonCollapsingMode />

<<< @/.vitepress/components/examples/NonCollapsingMode.vue{2}

## Accessibility

The color picker already has built-in screen reader support, but if you wish to customize it further you're free to do so! In fact, if you're app has internationalization (e.g. it's translated in Spanish) you _should_ also translate the `aria-label`, `aria-roledescription`, `aria-valuetext`, and `aria-label-color-well`. The following example highlights how to tweak the `aria-valuetext` since it's a dynamic value.

<ExampleAccessibility />

<<< @/.vitepress/components/examples/Accessibility.vue{2,8,19-26,30}

<style>
.rcp {
    margin: 32px auto;
}
</style>
