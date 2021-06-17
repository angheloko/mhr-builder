<template>
  <div class="flex items-start overflow-x-auto space-x-4">
    <BuildList
      v-for="(set, index) of value"
      :key="index"
      :index="index"
      :value="set"
      :read-only="readOnly"
    />
    <slot />
  </div>
</template>

<script>
import BuildList from './BuildList'

export default {
  name: 'Builder',
  components: { BuildList },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
