import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute } from 'vitepress'
import type { EnhanceAppContext, Theme } from 'vitepress'
import { toRefs } from 'vue'
import { GISCUS_CONFIG } from '../site'

const theme: Theme = {
  ...DefaultTheme,
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
