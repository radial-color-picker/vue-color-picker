import ColorPicker from '../../dist/vue-color-picker.es.js';
import '../../dist/vue-color-picker.css';

import ExampleAccessibility from './components/ExampleAccessibility.vue';
import ExampleBasic from './components/ExampleBasic.vue';
import ExampleNonCollapsingMode from './components/ExampleNonCollapsingMode.vue';
import ExampleNonPrimary from './components/ExampleNonPrimary.vue';
import ExampleUncontrolled from './components/ExampleUncontrolled.vue';

export default ({ app }) => {
    app.use(ColorPicker);
    app.component('ExampleAccessibility', ExampleAccessibility);
    app.component('ExampleBasic', ExampleBasic);
    app.component('ExampleNonCollapsingMode', ExampleNonCollapsingMode);
    app.component('ExampleNonPrimary', ExampleNonPrimary);
    app.component('ExampleUncontrolled', ExampleUncontrolled);
};
