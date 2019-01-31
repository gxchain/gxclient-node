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
            lang: 'zh-CN',
            title: 'gxclient',
            description: 'gxclient desc'
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
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: [
                    {
                        text: '介绍',
                        link: '/introduce/',
                    },
                    {
                        text: 'API',
                        link: '/api/',
                    },
                    {
                        text: '手册',
                        link: '/manual/',
                    }
                ],
                sidebar: {
                    '/introduce/': genSidebarConfig('introduce'),
                    '/manual/': genSidebarConfig('manual'),
                    ...sidebarTree('概览')
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
