<template>
  <BuildList
    class="m-2 max-w-xs mx-auto"
    :set="set"
  />
</template>

<script>
import BuildList from './BuildList'
export default {
  name: 'SetPreviewModal',
  components: { BuildList },
  props: {
    set: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
