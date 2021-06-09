<template>
  <WeaponSearch
    @select="$emit('select', $event)"
  />
</template>

<script>
import WeaponSearch from './WeaponSearch'

export default {
  name: 'AddWeaponModal',
  components: { WeaponSearch }
}
</script>

<style scoped>

</style>
