<template>
  <Modal @close="$emit('close')">
    <Generator />
  </Modal>
</template>

<script>
import Modal from './Modal'
import Generator from './Generator'

export default {
  name: 'GeneratorModal',
  components: { Generator, Modal }
}
</script>

<style scoped>

</style>
