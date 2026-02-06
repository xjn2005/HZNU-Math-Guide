import DefaultTheme from 'vitepress/theme'
import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import './custom_giscus.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const route = useRoute()
    
    onMounted(() => {
      // 首页不显示评论
      if (route.path !== '/') {
        nextTick(() => {
          loadGiscus()
        })
      }
    })
    
    // 监听路由变化
    watch(() => route.path, (newPath) => {
      // 清除旧的评论区
      const oldContainer = document.querySelector('.giscus-container')
      if (oldContainer) {
        oldContainer.remove()
      }
      
      // 清除旧的脚本
      const oldScript = document.querySelector('script[src*="giscus.app/client.js"]')
      if (oldScript) {
        oldScript.remove()
      }
      
      // 新页面加载评论
      if (newPath !== '/') {
        nextTick(() => {
          loadGiscus()
        })
      }
    })
    
    return h(DefaultTheme.Layout)
  }
}

// 加载giscus脚本
function loadGiscus() {
  // 创建样式
  const style = document.createElement('style')
  style.textContent = `
    .giscus-container {
      max-width: 740px;
      margin: 0 auto;
      padding: 0 1.5rem;
      margin-top: 2rem;
    }
    .giscus-frame {
      width: 100% !important;
    }
    .VPContent .content {
      max-width: 740px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
  `
  
  // 检查是否已有样式，如有则更新，无则添加
  const existingStyle = document.querySelector('style[data-giscus-style]')
  if (existingStyle) {
    existingStyle.textContent = style.textContent
  } else {
    style.setAttribute('data-giscus-style', 'true')
    document.head.appendChild(style)
  }
  
  // 创建giscus容器
  const container = document.createElement('div')
  container.className = 'giscus-container'
  
  // 查找合适的位置插入容器（在文章内容下方，靠近文章末尾）
  // 优先选择中间内容区域的容器
  const articleContainer = document.querySelector('.VPSidebar + .VPContent') || 
                         document.querySelector('.VPContent') || 
                         document.querySelector('main') || 
                         document.querySelector('article')
  
  if (articleContainer) {
    // 确保容器有正确的样式
    (articleContainer as HTMLElement).style.maxWidth = '740px';

    (articleContainer as HTMLElement).style.margin = '0 auto';
(articleContainer as HTMLElement).style.padding = '0 1.5rem'
    
    // 检查是否已有评论区，避免重复添加
    const existingComments = articleContainer.querySelector('.giscus-container')
    if (existingComments) {
      existingComments.remove()
    }
    
    articleContainer.appendChild(container)
  } else {
    // 如果找不到容器，就添加到body末尾
    document.body.appendChild(container)
  }
  
  // 创建giscus脚本标签
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'xjn2005/HZNU-Math-Guide')
  script.setAttribute('data-repo-id', 'R_kgDOQ4L4yg')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOQ4L4ys4C19GI')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '1')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', '')
  
  // 添加到容器中
  container.appendChild(script)
}