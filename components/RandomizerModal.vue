<template>
  <Modal
    :height="'h-1/3'"
    @close="$emit('close')"
  >
    <Randomizer
      @close="$emit('close')"
    />
  </Modal>
</template>

<script>
import Randomizer from './Randomizer'
import Modal from './Modal'

export default {
  name: 'RandomizerModal',
  components: { Modal, Randomizer }
}
</script>

<style scoped>

</style>
