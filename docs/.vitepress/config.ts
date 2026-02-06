import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'HZNU Math Guide',
  description: '杭州师范大学数学学院自学指南',
  base: '/HZNU-Math-Guide/', 

  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    // 1. 顶部导航：去除文字链接，保持极简
    nav: [], 

    // 2. 社交链接：将 GitHub 以 Icon 形式放在右上角
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xjn2005/HZNU-Math-Guide' },
      {
    // 自定义飞书图标
        icon: {
          svg: '<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M530.735 543.765l187.037-129.776c0-142.838-112.222-246.805-112.222-246.805h-399.256c224.653 142.838 324.441 376.581 324.441 376.581z" fill="currentColor"></path><path d="M929.938 387.971s-37.407 26.018-87.353 155.794c-56.007 145.763-212.114 233.848-212.114 233.848s-194.351-121.417-274.913-169.796c68.65 20.898 143.047-56.529 187.559-102.922 37.512-38.975 74.919-90.906 162.273-129.881 87.249-38.975 224.549 12.957 224.549 12.957zM355.558 607.817c-8.255-2.508-16.405-6.478-24.451-12.016-20.898-14.524-6.792-6.792 24.451 12.016z" fill="currentColor"></path><path d="M94.041 362.026v0.104c533.943 505.208 702.067 260.911 710.844 247.223-7.105 11.285-116.506 182.544-249.208 220.16C231.549 921.464 94.041 751.564 94.041 751.564z" fill="currentColor"></path></svg>'
        },
        link: 'https://wcn0u254fsxg.feishu.cn/wiki/V2ijw3cSXicILjkJWjKcqKCHnec?fromScene=spaceOverview'
      }
    ],

    // 3. 侧边栏：补全所有内容，保持同级视觉
    sidebar: [
      { text: '前言', link: '/前言' },
      { text: '学习帮助', link: '/学习帮助' },

      { text: '书写格式与风格', link: '/书写格式与风格' },
      { text: '检索技巧', link: '/检索技巧' },

      {
        text: '数学基础',
        collapsed: false,
        items: [
          { text: '微积分', link: '/数学基础/微积分' },
          { text: '高等代数', link: '/数学基础/高等代数' },
          { text: '概率论与数理统计', link: '/数学基础/概率论与数理统计' }
        ]
      },

      {
        text: '数学进阶',
        collapsed: false,
        items: [
          { text: '实变函数', link: '/数学进阶/实变函数' },
          { text: '复变函数', link: '/数学进阶/复变函数' },
          { text: '常微分方程', link: '/数学进阶/常微分方程' },
          { text: '偏微分方程', link: '/数学进阶/偏微分方程' },
          { text: '时间序列分析', link: '/数学进阶/时间序列分析' },
          { text: '随机过程', link: '/数学进阶/随机过程' },
          { text: '初等数论', link: '/数学进阶/初等数论' },
          { text: '密码学', link: '/数学进阶/密码学' },
          { text: '抽象代数', link: '/数学进阶/抽象代数' },
        ]
      },

      {
        text: '编程入门',
        collapsed: false,
        items: [
          { text: 'C', link: '/编程入门/C' },
          { text: 'C++', link: '/编程入门/C++' },
          { text: 'Python', link: '/编程入门/Python' },
          { text: 'Java', link: '/编程入门/Java' },
          { text: 'Rust', link: '/编程入门/Rust' },
          { text: 'Go', link: '/编程入门/Go' },
          { text: 'JavaScript', link: '/编程入门/JavaScript' }
        ]
      },

      {
        text: 'CS核心课程',
        collapsed: false,
        items: [
          { text: '数据结构与算法', link: '/CS核心课程/数据结构与算法' },
          { text: '计算机网络', link: '/CS核心课程/计算机网络' },
          { text: '操作系统', link: '/CS核心课程/操作系统' },
          { text: '计算机组成原理', link: '/CS核心课程/计算机组成原理' },
          { text: '数据库', link: '/CS核心课程/数据库' }
        ]
      },

      {
        text: '数据科学',
        collapsed: false,
        items: [
          {
            text: '数分基础',
            collapsed: true,
            items: [
              { text: 'Numpy', link: '/数据科学/数分基础/Numpy' },
              { text: 'Pandas', link: '/数据科学/数分基础/Pandas' },
              { text: 'Matplotlib', link: '/数据科学/数分基础/Matplotlib' }
            ]
          },
          { text: '机器学习', link: '/数据科学/机器学习' },
          { text: '深度学习', link: '/数据科学/深度学习' }
        ]
      },

      { text: 'AI', link: '/AI' },
      { text: '前端开发', link: '/前端开发' },
      { text: '计算机图形学', link: '/计算机图形学' },
      { text: '区块链', link: '/区块链' },
      { text: '后记', link: '/后记' }
    ],

    outline: { label: '本页目录', level: [1, 6] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    search: { provider: 'local' }
  }
})