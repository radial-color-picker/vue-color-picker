module.exports = {
    base: '/vue-color-picker/',
    title: 'Radial Color Picker',
    description: 'Minimalistic color picker with a focus on size, accessibility and performance.',
    markdown: {
        code: {
            lineNumbers: false,
        },
    },
    themeConfig: {
        repo: 'radial-color-picker/vue-color-picker',
        navbar: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Examples', link: '/examples.html' },
            { text: 'Config Reference', link: '/api.html' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    collapsable: false,
                    children: [
                        { text: 'Introduction', link: '/guide/index.html' },
                        { text: 'Getting Started', link: '/guide/getting-started.html' },
                        { text: 'First Asked Questions', link: '/guide/faq.html' },
                    ],
                },
            ],
        },
    },
    head: [['link', { rel: 'icon', href: '/vue-logo.png' }]],
};
