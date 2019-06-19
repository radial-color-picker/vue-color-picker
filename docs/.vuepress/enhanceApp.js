import ColorPicker from '../../dist/vue-color-picker.esm.js';
import '../../dist/vue-color-picker.css';

ColorPicker.install = function(Vue) {
    Vue.component('color-picker', ColorPicker);
};

export default ({ Vue }) => {
    Vue.use(ColorPicker);
};
