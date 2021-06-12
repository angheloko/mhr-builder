<template>
  <div class="canvas flex items-start overflow-x-auto p-2">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Canvas'
}
</script>

<style scoped>
.canvas {
  height: calc(100vh - 3rem);
}
</style>
