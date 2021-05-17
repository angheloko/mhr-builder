<template>
  <Modal @close="$emit('close')">
    <div class="p-2 talisman-settings h-full">
      <div class="overflow-y-auto">
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
              @update="updateSlot({ index, value: $event })"
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
              @update="selectSkill({ index, value: $event })"
            />
            <input
              :value="skills[index] && skills[index].level"
              type="number"
              placeholder="Level"
              class="rounded border-gray-300 text-sm w-20 leading-none mb-1"
              @input="updateSkill({ index, value: $event.target.value })"
            >
          </div>
          <div class="mt-2 text-right">
            <button
              class="border border-blue-600 text-blue-600 font-medium text-sm px-4 rounded h-8"
              @click="addMoreSkills"
            >
              Add more skills
            </button>
          </div>
        </div>
      </div>
      <div class="text-right">
        <button
          class="text-white bg-blue-600 font-medium text-sm px-4 rounded h-8"
          @click="addTalisman"
        >
          Add
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
  name: 'AddTalismanModal',
  components: { Dropdown, Modal },
  data () {
    return {
      slots: [0, 0, 0],
      skills: [{
        slug: '',
        level: 0
      }]
    }
  },
  computed: {
    ...mapGetters({
      skillOptions: 'skills/getSkillOptions',
      getSkill: 'skills/getSkill'
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
  },
  methods: {
    updateSlot ({ index, value }) {
      this.$set(this.slots, index, value)
    },
    addMoreSkills () {
      this.skills.push({
        slug: '',
        level: 0
      })
    },
    selectSkill ({ index, value }) {
      const skill = this.getSkill(value)
      if (skill) {
        this.$set(this.skills, index, skill)
      }
    },
    updateSkill ({ index, value }) {
      this.$set(this.skills[index], 'level', value)
    },
    addTalisman () {
      let talisman = null
      const skills = this.skills.filter(skill => skill.slug !== '' && skill.level > 0)
      const slots = this.slots.filter(slot => slot > 0)
      if (skills.length > 0 || slots.length > 0) {
        talisman = {
          skills,
          slots
        }
      }
      this.$emit('input', talisman)
    }
  }
}
</script>

<style scoped>
.talisman-settings {
  display: grid;
  grid-template-rows: 1fr auto;
}
</style>
