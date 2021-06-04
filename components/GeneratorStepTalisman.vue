<template>
  <div class="p-2">
    <div class="border rounded p-2 mb-2">
      <h3 class="text-sm font-medium mb-2">
        Slots
      </h3>
      <div class="text-xs text-gray-500 mb-2">
        Set the slots that your talisman has.
      </div>
      <div class="grid grid-cols-3 gap-3">
        <Dropdown
          v-for="(slot, index) of slots"
          :key="index"
          label="Slot"
          :required="false"
          :options="slotOptions"
          :value="slot"
          @update="$emit('update:slot', { index, value: $event })"
        />
      </div>
    </div>
    <div class="border rounded p-2 mb-2">
      <div class="text-sm font-medium mb-2 flex">
        <div class="flex-grow">
          Skill
        </div>
        <div class="w-16">
          Level
        </div>
      </div>
      <div class="text-xs text-gray-500 mb-2">
        <p class="mb-2">
          Add the skills that your talisman has.
        </p>
      </div>
      <div v-for="(skill, index) in skills" :key="index" class="flex">
        <Dropdown
          label="Select skill"
          :required="false"
          :options="skillOptions"
          :value="skill.slug"
          class="flex-grow mr-2"
          @update="$emit('select', { index, value: $event })"
        />
        <input
          :value="skill.level"
          type="number"
          placeholder="Level"
          class="rounded border-gray-300 text-sm w-20 leading-none mb-1"
          @input="$emit('update:skill', { index, value: $event.target.value })"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dropdown from './Dropdown'
export default {
  name: 'GeneratorStepTalisman',
  components: { Dropdown },
  props: {
    slots: {
      type: Array,
      default: () => [
        0, 0, 0
      ]
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      skillOptions: 'skills/getSkillOptions'
    }),
    slotOptions () {
      return [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
