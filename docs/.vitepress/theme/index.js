import DefaultTheme from 'vitepress/theme';
import ColorPicker from '../../../dist/vue-color-picker.es.js';
import '../../../dist/vue-color-picker.css';

import InteractiveHomePageLayout from '../components/InteractiveHomePageLayout.vue';

import ExampleBasic from '../components/examples/Basic.vue';
import ExampleAccessibility from '../components/examples/Accessibility.vue';
import ExampleNonCollapsingMode from '../components/examples/NonCollapsingMode.vue';
import ExampleNonPrimary from '../components/examples/NonPrimary.vue';
import ExampleUncontrolled from '../components/examples/Uncontrolled.vue';

export default {
    extends: DefaultTheme,
    Layout: InteractiveHomePageLayout,
    enhanceApp({ app }) {
        app.use(ColorPicker);

        app.component('ExampleBasic', ExampleBasic);
        app.component('ExampleAccessibility', ExampleAccessibility);
        app.component('ExampleNonCollapsingMode', ExampleNonCollapsingMode);
        app.component('ExampleNonPrimary', ExampleNonPrimary);
        app.component('ExampleUncontrolled', ExampleUncontrolled);
    },
};
