<template>
  <div class="text-center border-b p-1">
    <div class="font-light text-xs pb-1">
      Decorations
    </div>
    <div class="grid grid-cols-3">
      <div v-for="(level, slotIndex) in 3" :key="slotIndex" class="border-r last:border-none">
        <template v-if="!slots[slotIndex]">
          &mdash;
        </template>
        <template v-else>
          <a
            v-if="canDecorate"
            class="block cursor-pointer"
            :class="{ 'text-blue-600': decorations[slotIndex] }"
            @click="$emit('click-slot', { level: slots[slotIndex], slot: slotIndex, current: decorations && decorations[slotIndex] && decorations[slotIndex].slug })"
          >
            {{ slots[slotIndex] }}
          </a>
          <template v-else>
            {{ slots[slotIndex] }}
          </template>
        </template>
      </div>
    </div>
    <div v-if="canDecorate" class="text-xs text-gray-400 mt-1">
      Click slot to add a decoration
    </div>
    <div v-if="hasDecorations" class="m-1 border rounded shadow px-1">
      <template
        v-for="(decoration, decorationIndex) in 3"
      >
        <div v-if="decorations[decorationIndex]" :key="decorationIndex" class="flex border-b last:border-none p-1 last:p-0">
          <div class="flex-grow">
            <div class="text-sm text-left">
              {{ decorations[decorationIndex].name }}
            </div>
            <div class="text-xs text-left">
              {{ decorations[decorationIndex].skill }}
            </div>
          </div>
          <button class="text-red-600" @click="$emit('remove-decoration', decorationIndex)">
            <!-- heroicons: outline/minus-circle -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDecorations',
  props: {
    canDecorate: {
      type: Boolean,
      default: false
    },
    slots: {
      type: Array,
      required: true
    },
    decorations: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    hasDecorations () {
      const decorations = this.decorations.filter(value => value)
      return decorations.length > 0
    }
  }
}
</script>

<style scoped>

</style>
