import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "寒江雪的小站",
  description: "孤舟蓑立翁,独钓寒江雪",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: 'Examples',
        collapsed: false,    // 默认展开
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '前端小记',
        collapsed: false,    // 默认展开
        items: [
          // { text: '前端小记', 
            // link: '/doc-code/front/index',
          {
            text: 'css小记',
            collapsed: false,    // 默认展开
            items: [
              { text: 'display的用法', link: '/doc-code/front/css/display的用法' },
            ]
        },
        ]
      },
    ],
    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    // 这个是底部的copyright
    footer:{
      copyright: 'Copyright © 2026 寒江雪的小站',
    }
  },
})
