import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'
import {
  FEISHU_ICON_SVG,
  FEISHU_URL,
  REPO_URL,
  SITE_BASE,
  SITE_DESCRIPTION,
  SITE_TITLE
} from './site'

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  base: SITE_BASE,
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [],
    socialLinks: [
      { icon: 'github', link: REPO_URL },
      {
        icon: { svg: FEISHU_ICON_SVG },
        link: FEISHU_URL
      }
    ],
    sidebar,
    outline: { label: '本页目录', level: [1, 6] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    search: { provider: 'local' }
  }
})
