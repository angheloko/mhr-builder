<template>
  <WeaponSearch
    :value="value"
    @select="$emit('select', $event)"
  />
</template>

<script>
import WeaponSearch from './WeaponSearch'
export default {
  name: 'GeneratorStepWeapon',
  components: { WeaponSearch },
  props: {
    value: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
