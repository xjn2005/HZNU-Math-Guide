import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute } from 'vitepress'
import type { EnhanceAppContext, Theme } from 'vitepress'
import { h, toRefs } from 'vue'
import { GISCUS_CONFIG } from '../site'
import ContributionActions from './ContributionActions.vue'

const theme: Theme = {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(ContributionActions)
    })
  },
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp?.(ctx)
  },
  setup() {
    const { frontmatter } = toRefs(useData())
    const route = useRoute()

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
