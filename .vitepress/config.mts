import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/route.mjs";	// 改成自己的路径


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "寒江雪的小站",
  description: "孤舟蓑立翁,独钓寒江雪",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: {
      '/doc-code/front/': set_sidebar('/doc-code/front/'),
    },
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
