<template>
  <div class="p-2">
    <div class="border rounded p-2 mb-2">
      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          class="h-4 w-4 rounded"
          :checked="decorate"
          @change="$emit('update:decorate', $event.target.checked)"
        >
        <span class="font-medium text-sm">Add decorations</span>
      </label>
      <div class="text-xs text-gray-500 mt-1">
        If selected, decorations will be added in order to reach required skill levels.
      </div>
    </div>
    <div class="border rounded p-2 mb-2">
      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          class="h-4 w-4 rounded"
          :checked="unique"
          @change="$emit('update:unique', $event.target.checked)"
        >
        <span class="font-medium text-sm">Unique sets only</span>
      </label>
      <div class="text-xs text-gray-500 mt-1">
        If selected, every set will be unique. Armor pieces will not be reused in other sets.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneratorStepOptions',
  props: {
    unique: {
      type: Boolean,
      default: false
    },
    decorate: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
