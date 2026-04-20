import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
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
      { text: '抽象代数', link: '/数学进阶/抽象代数' }
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
    text: 'CS 核心课程',
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
  { text: '后记', link: '/后记' }
]
