<template>
  <div class="p-2">
    <div class="border rounded p-2 mb-2">
      <div class="text-sm font-medium mb-2 flex">
        <div class="flex-grow">
          Required skill
        </div>
        <div class="w-16">
          Level
        </div>
      </div>
      <div class="text-xs text-gray-500 mb-2">
        <p class="mb-2">
          Select up to {{ skills.length }} skills that you want to prioritize. You can also set the max. level for each skill.
        </p>
        <p class="mb-2 font-medium">
          Skills at the top are prioritized over the skills at the bottom.
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
          @input="$emit('update', { index, value: $event.target.value })"
        >
      </div>
    </div>
    <div class="border rounded p-2 mb-2">
      <h3 class="text-sm font-medium mb-2">
        Exclude skills
      </h3>
      <div class="text-xs text-gray-500 mb-2">
        Select up to {{ excluded.length }} skills that you want to exclude.
      </div>
      <div class="sm:grid sm:grid-cols-3 sm:gap-3">
        <Dropdown
          v-for="(skill, index) in excluded"
          :key="index"
          label="Exclude skill"
          :required="false"
          :options="skillOptions"
          :value="skill"
          :bottom="index >= excluded.length - 3"
          @update="$emit('exclude', { index, value: $event })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dropdown from './Dropdown'
export default {
  name: 'GeneratorStepSkills',
  components: { Dropdown },
  props: {
    skills: {
      type: Array,
      default: () => []
    },
    excluded: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      skillOptions: 'skills/getSkillOptions',
      getSkill: 'skills/getSkill'
    })
  }
}
</script>

<style scoped>

</style>
