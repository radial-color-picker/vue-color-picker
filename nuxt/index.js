const { resolve } = require('path');

module.exports = function nuxtRadialColorPicker(options) {
    this.addPlugin({
        src: resolve(__dirname, 'plugin.js'),
        fileName: 'radial-color-picker.js',
        options,
    });
};

module.exports.meta = require('../package.json');
