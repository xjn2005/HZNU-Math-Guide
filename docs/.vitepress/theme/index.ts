import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { onContentUpdated, useData, useRoute } from 'vitepress'
import type { EnhanceAppContext, Theme } from 'vitepress'
import { h, toRefs } from 'vue'
import { GISCUS_CONFIG } from '../site'
import ContributionActions from './ContributionActions.vue'
import BackToTop from './BackToTop.vue'
import CustomNotFound from './CustomNotFound.vue'
import ImageLightbox from './ImageLightbox.vue'
import './link-actions.css'
import './ui-enhancements.css'

function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text)
  }

  return new Promise<void>((resolve, reject) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()

    try {
      document.execCommand('copy')
      resolve()
    } catch (error) {
      reject(error)
    } finally {
      textarea.remove()
    }
  })
}

function attachCopyButtons() {
  const links = document.querySelectorAll<HTMLAnchorElement>('.vp-doc a[href^="http"]')

  for (const link of links) {
    if (
      link.querySelector('img') ||
      link.classList.contains('header-anchor') ||
      link.nextElementSibling?.classList.contains('external-link-copy')
    ) {
      continue
    }

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'external-link-copy'
    button.textContent = '⧉'
    button.setAttribute('aria-label', '复制链接')
    button.title = '复制链接'

    button.addEventListener('click', async () => {
      const originalText = button.textContent
      const originalTitle = button.title

      try {
        await copyText(link.href)
        button.textContent = '✓'
        button.title = '已复制'
        window.setTimeout(() => {
          button.textContent = originalText
          button.title = originalTitle
        }, 1200)
      } catch {
        button.textContent = '!'
        button.title = '复制失败'
        window.setTimeout(() => {
          button.textContent = originalText
          button.title = originalTitle
        }, 1200)
      }
    })

    link.insertAdjacentElement('afterend', button)
  }
}

function clearCopyButtons() {
  const buttons = document.querySelectorAll('.vp-doc .external-link-copy')
  for (const button of buttons) {
    button.remove()
  }
}

const theme: Theme = {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(ContributionActions),
      'not-found': () => h(CustomNotFound),
      'layout-bottom': () => [h(BackToTop), h(ImageLightbox)]
    })
  },
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp?.(ctx)
  },
  setup() {
    const { frontmatter, page } = toRefs(useData())
    const route = useRoute()

    onContentUpdated(() => {
      clearCopyButtons()

      if (frontmatter.value.showCopyLinks === true && page.value.relativePath) {
        attachCopyButtons()
      }
    })

    giscusTalk(
      GISCUS_CONFIG,
      {
        frontmatter,
        route
      },
      true
    )
  }
}

export default theme
