<template>
  <Modal @close="$emit('close')">
    <BuildList
      class="m-2 max-w-xs mx-auto"
      :set="set"
    />
  </Modal>
</template>

<script>
import Modal from './Modal'
import BuildList from './BuildList'
export default {
  name: 'SetPreviewModal',
  components: { BuildList, Modal },
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
