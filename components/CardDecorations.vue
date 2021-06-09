<template>
  <div class="text-center border-b p-1">
    <div class="font-light text-xs pb-1">
      Decorations
    </div>
    <div class="grid grid-cols-3 place-items-center h-8">
      <div v-for="(level, slotIndex) in 3" :key="slotIndex">
        <div v-if="!slots[slotIndex]">
          &mdash;
        </div>
        <template v-else>
          <a
            v-if="canDecorate"
            class="inline-flex justify-center items-center cursor-pointer rounded-full bg-gray-200 h-8 w-8 text-xs"
            :class="{ 'bg-blue-200': decorations[slotIndex] }"
            @click="$emit('click:slot', { level: slots[slotIndex], slot: slotIndex, current: decorations && decorations[slotIndex] && decorations[slotIndex].slug })"
          >
            {{ slots[slotIndex] }}
          </a>
          <div
            v-else
            class="inline-flex justify-center items-center rounded-full border border-gray h-8 w-8 text-xs"
            :class="{ 'bg-blue-200': decorations[slotIndex] }"
          >
            {{ slots[slotIndex] }}
          </div>
        </template>
      </div>
    </div>
    <div v-if="canDecorate" class="text-xs text-gray-400 mt-1 font-light">
      Click slot to add a decoration
    </div>
    <div v-if="hasDecorations" class="m-1 border rounded shadow px-1">
      <template
        v-for="(decoration, decorationIndex) in 3"
      >
        <div v-if="decorations[decorationIndex]" :key="decorationIndex" class="flex border-b last:border-none p-1 last:p-0">
          <div class="flex-grow text-sm text-left">
            <div>
              {{ decorations[decorationIndex].name }}
            </div>
            <div
              class="text-xs"
              :class="{'text-blue-600 cursor-pointer': canClickSkill}"
              @click="canClickSkill && $emit('click:skill', decorations[decorationIndex].skillSlug)"
            >
              {{ decorations[decorationIndex].skill }}
            </div>
          </div>
          <button
            v-if="canDecorate"
            class="text-red-600"
            @click="$emit('remove:decoration', decorationIndex)"
          >
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
    canClickSkill: {
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
