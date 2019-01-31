const { sidebarTree } = require('../api/config');
module.exports = {
    contentLoading: true,
    title: 'Hello vuepress-jsdoc',
    base: '/gxclient-node/',
    dest: './docs-dist',    // 设置输出目录
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'gxclient',
            description: 'A wrapped toolkit of gxbjs, a client to interact with gxchain apis'
        }
    },
    themeConfig: {
        repo: 'https://github.com/gxchain/gxclient-node',
        docsDir: 'docs',
        editLinks: true,
        sidebarDepth: 3,
        theme: 'vue',
        algolia: {

        },
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: [
                    {
                        text: 'Introduce',
                        link: '/introduce/',
                    },
                    {
                        text: 'API',
                        link: '/api/',
                    },
                    {
                        text: 'Manual',
                        link: '/manual/',
                    }
                ],
                sidebar: {
                    '/introduce/': genSidebarConfig('introduce'),
                    '/manual/': genSidebarConfig('manual'),
                    ...sidebarTree('Overview')
                }
            }
        }
    }
}

function genSidebarConfig(link) {
    switch (link) {
        case 'introduce':
            return [
                {
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ]
        case 'manual':
            return [{
                collapsable: false,
                children: [
                    '',
                    'example'
                ]
            }]
    }
}
