<template>
  <Modal @close="$emit('close')">
    <div class="p-2">
      <div class="border rounded p-2 mb-2">
        <div class="text-sm font-medium mb-2 flex">
          <div class="flex-grow">
            Prioritize skills
          </div>
          <div class="w-16">
            Level
          </div>
        </div>
        <div class="text-xs text-gray-500 mb-2">
          <p class="mb-2">
            Select up to {{ selectedSkills.length }} skills that you want to prioritize. You can also set the max. level for each skill.
          </p>
          <p class="mb-2">
            Skills at the top are prioritized over the skills at the bottom.
          </p>
        </div>
        <div v-for="(skill, index) of selectedSkills" :key="index" class="flex">
          <Dropdown
            label="Select skill"
            :required="false"
            :options="skillsOptions"
            :value="skill.skill.slug"
            class="flex-grow mr-2"
            @update="selectSkill(index, $event)"
          />
          <input
            v-model="skill.level"
            type="text"
            placeholder="Level"
            class="rounded border-gray-300 text-sm w-16 leading-none mb-1"
          >
        </div>
      </div>
      <div class="border rounded p-2 mb-2">
        <h3 class="text-sm font-medium mb-2">
          Exclude skills
        </h3>
        <div class="text-xs text-gray-500 mb-2">
          Select up to {{ excludedSkills.length }} skills that you want to exclude.
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-3">
          <Dropdown
            v-for="(skill, index) of excludedSkills"
            :key="index"
            label="Exclude skill"
            :required="false"
            :options="skillsOptions"
            :value="skill"
            @update="excludeSkill(index, $event)"
          />
        </div>
      </div>
      <div class="text-right">
        <button
          class="bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
          @click="$emit('input', { selectedSkills, excludedSkills })"
        >
          Generate
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from './Modal'
import Dropdown from './Dropdown'
export default {
  name: 'GeneratorModal',
  components: { Dropdown, Modal },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      selectedSkills: [],
      excludedSkills: []
    }
  },
  computed: {
    ...mapGetters({
      skills: 'skills/skills',
      getSkill: 'skills/getSkill'
    }),
    skillsOptions () {
      const options = []
      for (const skill of this.skills) {
        options.push({
          label: skill.name,
          value: skill.slug
        })
      }
      return options
    }
  },
  mounted () {
    this.selectedSkills = this.value.selectedSkills || []
    this.excludedSkills = this.value.excludedSkills || []

    for (let i = 0; i < 5; i++) {
      if (i >= this.selectedSkills.length) {
        this.selectedSkills.push({
          skill: '',
          level: 0
        })
      }
    }

    for (let i = 0; i < 3; i++) {
      if (i >= this.excludedSkills.length) {
        this.excludedSkills.push('')
      }
    }
  },
  methods: {
    selectSkill (index, skill) {
      if (skill) {
        this.selectedSkills[index].skill = this.getSkill(skill)
        this.selectedSkills[index].level = this.selectedSkills[index].skill.level
      } else {
        this.selectedSkills[index].skill = ''
        this.selectedSkills[index].level = 0
      }
    },
    excludeSkill (index, skill) {
      this.$set(this.excludedSkills, index, skill)
    }
  }
}
</script>

<style scoped>

</style>
