const pkg = require('./package');

module.exports = {
    mode: 'universal',
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Add the Color Picker CSS globally
    css: [
        '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'
    ]
};
