<template>
  <div class="text-center p-1">
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
            v-if="!readOnly"
            class="inline-flex justify-center items-center cursor-pointer rounded-full bg-gray-200 h-8 w-8 text-xs"
            :class="{ 'bg-blue-200': decorations[slotIndex] }"
            @click="clickDecorationHandler({ level: slots[slotIndex], slot: slotIndex, current: decorations[slotIndex], isRampage: false })"
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
    <div v-if="equipmentType === 'weapon'" class="font-light text-xs pb-1 mt-1">
      Rampage decorations
    </div>
    <div v-if="equipmentType === 'weapon'" class="grid grid-cols-1 place-items-center h-8">
      <div v-for="(level, slotIndex) in 1" :key="slotIndex">
        <div v-if="!rampSlots[slotIndex]">
          &mdash;
        </div>
        <template v-else>
          <a
            v-if="!readOnly"
            class="inline-flex justify-center items-center cursor-pointer rounded-full bg-gray-200 h-8 w-8 text-xs"
            :class="{ 'bg-blue-200': rampDecorations[slotIndex] }"
            @click="clickDecorationHandler({ level: rampSlots[slotIndex], slot: slotIndex, current: rampDecorations[slotIndex], isRampage: true })"
          >
            {{ rampSlots[slotIndex] }}
          </a>
          <div
            v-else
            class="inline-flex justify-center items-center rounded-full border border-gray h-8 w-8 text-xs"
            :class="{ 'bg-blue-200': rampDecorations[slotIndex] }"
          >
            {{ rampSlots[slotIndex] }}
          </div>
        </template>
      </div>
    </div>
    <div v-if="!readOnly" class="text-xs text-gray-400 mt-1 font-light">
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
              class="text-xs text-gray-500 font-bold"
            >
              {{ decorations[decorationIndex].skill }}
            </div>
          </div>
          <button
            v-if="!readOnly"
            class="text-red-600"
            @click="$emit('remove', {
              slot: decorationIndex,
              isRampage: false
            })"
          >
            <MinusCircleIcon class="w-4 h-4 text-red-400" />
          </button>
        </div>
      </template>
    </div>
    <div v-if="hasRampDecorations" class="m-1 border rounded shadow px-1">
      <template
        v-for="(decoration, decorationIndex) in 3"
      >
        <div v-if="rampDecorations[decorationIndex]" :key="decorationIndex" class="flex border-b last:border-none p-1 last:p-0">
          <div class="flex-grow text-sm text-left">
            <div>
              {{ rampDecorations[decorationIndex].name }}
            </div>
            <div
              class="text-xs text-gray-500 font-bold"
            >
              {{ rampDecorations[decorationIndex].skill }}
            </div>
          </div>
          <button
            v-if="!readOnly"
            class="text-red-600"
            @click="$emit('remove', {
              slot: decorationIndex,
              isRampage: true
            })"
          >
            <MinusCircleIcon class="w-4 h-4 text-red-400" />
          </button>
        </div>
      </template>
    </div>
    <SetDecorationModal
      v-if="decorationLevel"
      :level="decorationLevel"
      :selected="currentDecoration && currentDecoration.slug"
      :is-rampage="isRampage"
      @select="selectDecorationHandler"
      @close="decorationLevel = 0"
    />
    <SkillInfoModal
      v-if="showSkill"
      :value="showSkill"
      @close="showSkill = null"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SkillInfoModal from './SkillInfoModal'
import SetDecorationModal from './SetDecorationModal'
import MinusCircleIcon from './icons/MinusCircleIcon'

export default {
  name: 'CardDecorations',
  components: { MinusCircleIcon, SetDecorationModal, SkillInfoModal },
  props: {
    readOnly: {
      type: Boolean,
      default: true
    },
    slots: {
      type: Array,
      required: true
    },
    decorations: {
      type: Array,
      default: () => ([])
    },
    rampSlots: {
      type: Array,
      default: () => ([])
    },
    rampDecorations: {
      type: Array,
      default: () => ([])
    },
    equipmentType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showSkill: null,
      decorationLevel: 0,
      slot: -1,
      currentDecoration: null,
      isRampage: false
    }
  },
  computed: {
    ...mapGetters({
      getSkill: 'skills/getSkill'
    }),
    hasDecorations () {
      const decorations = this.decorations.filter(value => value)
      return decorations.length > 0
    },
    hasRampDecorations () {
      const decorations = this.rampDecorations.filter(value => value)
      return decorations.length > 0
    }
  },
  methods: {
    selectDecorationHandler (decoration) {
      this.$emit('add', {
        slot: this.slot,
        isRampage: this.isRampage,
        decoration
      })

      this.decorationLevel = 0
      this.slot = -1
      this.currentDecoration = null
      this.isRampage = false
    },
    clickDecorationHandler ({ level, slot, current, isRampage }) {
      this.decorationLevel = level
      this.slot = slot
      this.currentDecoration = current
      this.isRampage = isRampage
    }
  }
}
</script>
