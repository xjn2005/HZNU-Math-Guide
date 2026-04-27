<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { REPO_URL } from '../site'

const { frontmatter } = useData()
const route = useRoute()

const isHomePage = computed(() => frontmatter.value.layout === 'home')

const routePath = computed(() => {
  const normalized = decodeURIComponent(route.path).replace(/\/$/, '')
  return normalized || '/'
})

const docPath = computed(() => {
  if (routePath.value === '/') {
    return 'docs/index.md'
  }

  return `docs${routePath.value}.md`
})

const pageLabel = computed(() => (routePath.value === '/' ? '首页' : routePath.value))

const feedbackLink = computed(() => {
  const params = new URLSearchParams({
    title: `页面反馈：${pageLabel.value}`,
    body: [
      '## 页面信息',
      `- 页面路径：\`${routePath.value}\``,
      `- 源文件：\`${docPath.value}\``,
      '',
      '## 问题描述',
      '- 请在这里补充错字、失效链接、事实错误或结构建议。'
    ].join('\n')
  })

  return `${REPO_URL}/issues/new?${params.toString()}`
})

const editLink = computed(() => `${REPO_URL}/edit/main/${docPath.value}`)

const resourceLink = computed(() => {
  const params = new URLSearchParams({
    title: `资源补充：${pageLabel.value}`,
    body: [
      '## 资源补充',
      `- 目标页面：\`${routePath.value}\``,
      `- 对应文件：\`${docPath.value}\``,
      '',
      '## 建议补充的资源',
      '- 资源名称：',
      '- 资源链接：',
      '- 推荐理由：'
    ].join('\n')
  })

  return `${REPO_URL}/issues/new?${params.toString()}`
})
</script>

<template>
  <section v-if="!isHomePage" class="contribution-note">
    <p class="contribution-note__text">
      <a :href="feedbackLink" target="_blank" rel="noreferrer">反馈问题</a>
      <span class="contribution-note__separator">·</span>
      <a :href="editLink" target="_blank" rel="noreferrer">编辑此页</a>
      <span class="contribution-note__separator">·</span>
      <a :href="resourceLink" target="_blank" rel="noreferrer">补充资源</a>
    </p>
  </section>
</template>

<style scoped>
.contribution-note {
  margin: 8px 0 0;
}

.contribution-note__text {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.contribution-note__text a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.contribution-note__text a:hover {
  text-decoration: underline;
}

.contribution-note__separator {
  margin: 0 8px;
  color: var(--vp-c-text-3);
}

:global(.VPDocFooter) {
  position: relative;
}

@media (min-width: 640px) {
  .contribution-note {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
  }

  .contribution-note__text {
    line-height: 32px;
    white-space: nowrap;
  }
}
</style>
