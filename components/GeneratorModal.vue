<template>
  <Generator
    @update="$emit('close')"
  />
</template>

<script>
import Generator from './Generator'

export default {
  name: 'GeneratorModal',
  components: { Generator }
}
</script>

<style scoped>

</style>
