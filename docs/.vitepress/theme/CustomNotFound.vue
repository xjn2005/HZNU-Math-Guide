<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <section class="custom-not-found">
    <p class="custom-not-found__code">404</p>
    <h1 class="custom-not-found__title">页面不存在</h1>
    <p class="custom-not-found__text">
      这个地址可能已经变更，或者你访问的是旧链接。
    </p>
    <div class="custom-not-found__actions">
      <a :href="withBase('/')">返回首页</a>
      <a :href="withBase('/学习帮助')">查看学习帮助</a>
    </div>
  </section>
</template>
