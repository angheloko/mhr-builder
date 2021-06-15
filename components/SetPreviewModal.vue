<template>
  <Modal
    @close="$emit('close')"
  >
    <BuildList
      class="m-2 max-w-xs mx-auto"
      :index="0"
      :value="set"
    />
  </Modal>
</template>

<script>
import BuildList from './BuildList'
import Modal from './Modal'
export default {
  name: 'SetPreviewModal',
  components: { Modal, BuildList },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
