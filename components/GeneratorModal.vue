<template>
  <Modal
    @close="$emit('close')"
  >
    <Generator
      @close="$emit('close')"
    />
  </Modal>
</template>

<script>
import Generator from './Generator'
import Modal from './Modal'

export default {
  name: 'GeneratorModal',
  components: { Modal, Generator }
}
</script>

<style scoped>

</style>
