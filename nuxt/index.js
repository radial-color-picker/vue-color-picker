const { resolve } = require('path');

module.exports = function nuxtRadialColorPicker(options) {
    this.addPlugin({
        src: resolve(__dirname, 'plugin.js'),
        fileName: 'radial-color-picker.js',
        options,
    });

    this.options.css.push('@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css');
};

module.exports.meta = require('../package.json');
