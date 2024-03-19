import { defineConfig } from 'vitepress';

export default defineConfig({
    base: '/vue-color-picker/',
    title: 'Radial Color Picker',
    description: 'Minimalistic color picker with a focus on size, accessibility and performance.',
    head: [
        ['link', { rel: 'image/png', href: '/logo.png' }],
        ['meta', { property: 'og:image', content: '/logo.png' }],
        ['meta', { property: 'og:image:height', content: '640' }],
        ['meta', { property: 'og:image:width', content: '640' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:site_name', content: 'Radial Color Picker' }],
        [
            'meta',
            {
                property: 'og:title',
                content:
                    'Radial Color Picker | Minimalistic color picker with a focus on size, accessibility and performance.',
            },
        ],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://radial-color-picker.github.io/vue-color-picker/' }],
    ],

    themeConfig: {
        logo: '/logo.png',

        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Examples', link: '/examples' },
            { text: 'Reference', link: '/api' },
        ],

        sidebar: {
            '/guide': [
                {
                    text: 'Guide',
                    items: [
                        { text: 'Introduction', link: '/guide/' },
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Frequently Asked Questions', link: '/guide/faq' },
                    ],
                },
            ],
        },

        footer: {
            message: 'MIT Licensed',
            copyright: 'Copyright © 2018-present Rosen Kanev',
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/radial-color-picker/vue-color-picker' }],
    },
});
