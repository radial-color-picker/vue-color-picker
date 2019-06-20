module.exports = {
    base: '/vue-color-picker/',
    title: 'Radial Color Picker',
    description: 'Minimalistic color picker with a focus on size, accessibility and performance.',
    themeConfig: {
        repo: 'radial-color-picker/vue-color-picker',
        editLinks: true,
        lastUpdated: true,
        editLinkText: 'Edit this page on GitHub',
        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Examples', link: '/examples/' },
            { text: 'Config Reference', link: '/api/' },
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: ['', 'getting-started', 'faq'],
                },
            ],
        },
    },
    head: [
        ['link', { rel: 'icon', href: '/vue-logo.png' }],
    ],
};
