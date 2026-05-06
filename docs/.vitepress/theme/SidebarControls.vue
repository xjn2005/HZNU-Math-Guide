<script setup lang="ts">
function toggleAll(shouldCollapse: boolean) {
  const selector = shouldCollapse
    ? '.VPSidebar .VPSidebarItem.collapsible:not(.collapsed) > .item'
    : '.VPSidebar .VPSidebarItem.collapsible.collapsed > .item'

  const items = Array.from(document.querySelectorAll<HTMLElement>(selector))
  for (const item of items) {
    item.click()
  }
}
</script>

<template>
  <div class="sidebar-controls">
    <button type="button" @click="toggleAll(false)">展开全部</button>
    <button type="button" @click="toggleAll(true)">折叠全部</button>
  </div>
</template>
