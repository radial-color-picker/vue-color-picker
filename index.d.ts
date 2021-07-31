import { DefineComponent, ComponentOptionsMixin, PluginInstallFunction } from 'vue';

export type ColorPickerProps = {
    /**
     * A number between 0-359. Around 0º/360º are reds. 120º is where greens are and 240º are blues. Default: 0
     */
    hue?: number;

    /**
     * A number between 0-100. The larger the percentage, the more "colorful" this color is. 0% is completely desaturated (grayscale). 100% is fully saturated (full color). Default: 100
     */
    saturation?: number;

    /**
     * A number between 0-100. 0% is completely dark (black). 100% is completely light (white). 50% is average lightness. Default: 50
     */
    luminosity?: number;

    /**
     * A number between 0-1. Opacity/Transparency value. 0 is fully transparent. 1 is fully opaque. 0.5 is 50% transparent. Default: 1
     */
    alpha?: number;

    /**
     * A boolean to disable UI interactions. When :disabled="true" is used the color picker is rendered with a dimmer color to indicate that the field is not available for use.
     */
    disabled?: boolean;

    /**
     * Amount of degrees to rotate the picker with keyboard and/or wheel. Default: 1
     */
    step?: number;

    /**
     * The mode of the picker. By default it will close/open when the color well is clicked. Use variant="persistent" to prevent collapsing/closing and to keep the widget always open. Default: 'collapsible'
     */
    variant?: 'collapsible' | 'persistent';

    /**
     * Hides the palette initially. Using variant="persistent" and :initially-collapsed="true" at the same time is not supported. Default: false
     */
    initiallyCollapsed?: boolean;

    /**
     * Use wheel (scroll) event to rotate. By default it's off to keep things simple. Add :mouse-scroll="true" to allow the user to change the color by scrolling with mouse/trackpad. Default: false
     */
    mouseScroll?: boolean;

    /**
     * Defines a string value that labels the color well (middle selector). Default: color well
     */
    ariaLabelColorWell?: string;
};

export type ColorPickerEmits = {
    /**
     * Called every time the color updates. This could be a touchstart/mousedown event, when rotating the knob, keyboard shortcuts like ↑, and scrolling if enabled. It's also the glue between the color picker component and the outside world. Use this to update the hue prop.
     */
    input: (hue: number) => void;

    /**
     * Called every time the color changes, but unlike onInput this is not called while rotating the knob. onChange is a less noisy version of `@input` which is useful if you want to react to knob rotation stop for example or to use the <ColorPicker> as an uncontrolled component.
     */
    change: (hue: number) => void;

    /**
     * Called when the user dismisses the color picker (i.e. interacting with the middle color well). Can be used as a secondary confirmation step from the user that this is the color value to be saved for example.
     */
    select: (hue: number) => void;
};

declare const ColorPicker: PluginInstallFunction &
    DefineComponent<ColorPickerProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ColorPickerEmits>;

export default ColorPicker;
