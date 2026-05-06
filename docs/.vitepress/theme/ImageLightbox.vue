<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const activeSrc = ref('')
const activeAlt = ref('')

function close() {
  activeSrc.value = ''
  activeAlt.value = ''
}

function openImage(target: HTMLImageElement) {
  activeSrc.value = target.currentSrc || target.src
  activeAlt.value = target.alt || ''
}

function handleClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof HTMLImageElement)) {
    return
  }

  if (!target.closest('.vp-doc')) {
    return
  }

  if (target.closest('a')) {
    return
  }

  openImage(target)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="activeSrc" class="image-lightbox" @click.self="close">
      <button type="button" class="image-lightbox__close" aria-label="关闭图片预览" @click="close">
        ×
      </button>
      <img class="image-lightbox__image" :src="activeSrc" :alt="activeAlt" />
    </div>
  </Teleport>
</template>
