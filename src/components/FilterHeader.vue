<template>
  <div style="display: none" class="tbw-container">
    <div v-if="isShowDown" class="tbw-down-bar">
      <div class="tbw-left">
        <slot name="left" />
      </div>
      <div class="tbw-right">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlots, useAttrs, ref, computed  } from 'vue'
const attrs = useAttrs()
const slot = useSlots()

let isShowDown = computed(() => {
  if (slot.left || slot.right) {
    return true
  }
  return false
})
</script>

<style lang="scss">
.tbw-container {
  margin-bottom: 10px;
  padding: 14px 0 14px 0;
  display: block !important;
  .tbw-down-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tbw-left {
      display: flex;
      align-items: center;
      .el-button:not(:last-child) {
        margin-right: 8px;
      }
      .el-button + .import-button {
        margin-left: 8px;
      }
      .import-button:not(:last-child) {
        margin-right: 8px;
      }
    }
    .tbw-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>