<template>
  <Modal
    @close="$emit('close')"
  >
    <WeaponSearch
      @select="$emit('select', $event)"
    />
  </Modal>
</template>

<script>
import WeaponSearch from './WeaponSearch'
import Modal from './Modal'

export default {
  name: 'AddWeaponModal',
  components: { Modal, WeaponSearch }
}
</script>

<style scoped>

</style>
