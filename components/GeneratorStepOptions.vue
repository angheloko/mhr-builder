<template>
  <div class="px-4 py-2">
    <div class="border rounded p-2 mb-2">
      <div class="text-sm text-gray-700 font-bold mb-1">
        Armor rank
      </div>
      <label class="flex items-center space-x-2 mb-2">
        <input
          type="radio"
          name="armorRank"
          class="h-4 w-4 rounded-full"
          value="2"
          :checked="armorRank === 2"
          @change="$emit('update:armorRank', $event.target.value)"
        >
        <span class="font-medium text-sm">Master rank only</span>
      </label>
      <label class="flex items-center space-x-2">
        <input
          type="radio"
          name="armorRank"
          class="h-4 w-4 rounded rounded-full"
          value="1"
          :checked="armorRank === 1"
          @change="$emit('update:armorRank', $event.target.value)"
        >
        <span class="font-medium text-sm">High rank only</span>
      </label>
      <div class="text-xs text-gray-500 mt-1">
        Only armors from the selected rank will be included.
      </div>
    </div>
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
        If selected, decorations will automatically be added in order to reach required skill levels.
      </div>
    </div>
    <div class="border rounded p-2 mb-2">
      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          class="h-4 w-4 rounded"
          :checked="allowEmptyPieces"
          @change="$emit('update:allowEmptyPieces', $event.target.checked)"
        >
        <span class="font-medium text-sm">Allow skill-less pieces</span>
      </label>
      <div class="text-xs text-gray-500 mt-1">
        If selected, armor with no skills but with the necessary slots, such as
        the <span class="font-medium">Vaik Mail S</span>, will be included.
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
    <div class="text-sm my-4">
      <p class="mb-2">
        <span class="font-bold">Important:</span> Any unpinned sets from your collection will be
        removed. You can pin a set by clicking the menu icon <DotsVerticalIcon class="w-4 h-4 inline-block" />
        of the set and selecting <BookmarkIcon class="w-4 h-4 inline-block" />
        <span class="font-bold">Pin</span>.
      </p>
      <p>
        Only high and master rank armors are included when generating.
      </p>
    </div>
  </div>
</template>

<script>
import BookmarkIcon from './icons/BookmarkIcon'
import DotsVerticalIcon from './icons/DotsVerticalIcon'

export default {
  name: 'GeneratorStepOptions',
  components: { DotsVerticalIcon, BookmarkIcon },
  props: {
    unique: {
      type: Boolean,
      default: false
    },
    decorate: {
      type: Boolean,
      default: false
    },
    allowEmptyPieces: {
      type: Boolean,
      default: false
    },
    armorRank: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style scoped>

</style>
