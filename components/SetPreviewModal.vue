<template>
  <Modal
    @close="$emit('close')"
  >
    <div class="h-full p-2">
      <BuildList
        class="max-w-xs mx-auto"
        :index="0"
        :value="value"
      />
    </div>
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
