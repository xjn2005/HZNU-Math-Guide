import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'
import { toRefs } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp?.(ctx)
  },
  setup() {
    const { frontmatter } = toRefs(useData())
    const route = useRoute()

    giscusTalk(
      {
        repo: 'xjn2005/HZNU-Math-Guide',
        repoId: 'R_kgDOQ4L4yg',
        category: 'General',
        categoryId: 'DIC_kwDOQ4L4ys4C19GI',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'bottom',
        lang: 'zh-CN',
        lightTheme: 'light',
        darkTheme: 'transparent_dark',
        homePageShowComment: false
      },
      {
        frontmatter,
        route
      },
      true
    )
  }
}
