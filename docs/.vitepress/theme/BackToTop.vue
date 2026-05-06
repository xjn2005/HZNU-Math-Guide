<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 320
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    v-show="visible"
    type="button"
    class="back-to-top"
    aria-label="返回顶部"
    title="返回顶部"
    @click="scrollToTop"
  >
    ↑
  </button>
</template>
