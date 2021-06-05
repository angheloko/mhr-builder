<template>
  <Modal @close="$emit('close')">
    <WeaponSearch
      @select="$emit('select', $event)"
    />
  </Modal>
</template>

<script>
import Modal from './Modal'
import WeaponSearch from './WeaponSearch'

export default {
  name: 'AddWeaponModal',
  components: { WeaponSearch, Modal }
}
</script>

<style scoped>

</style>
