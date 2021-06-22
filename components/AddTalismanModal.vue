<template>
  <Modal
    title="Set talisman"
    @close="$emit('close')"
  >
    <div class="px-4 py-2 h-full">
      <TalismanSettings
        :slots="slots"
        :skills="skills"
        @select="selectSkill"
        @update:skill="updateSkill"
        @update:slot="updateSlot"
      />
      <div class="text-right mt-4">
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
import TalismanSettings from './TalismanSettings'
import Modal from './Modal'

export default {
  name: 'AddTalismanModal',
  components: { Modal, TalismanSettings },
  data () {
    return {
      maxSkills: 3,
      slots: [0, 0, 0],
      skills: []
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
  mounted () {
    for (let i = 0; i < this.maxSkills; i++) {
      this.skills.push({
        name: '',
        slug: '',
        level: 0
      })
    }
  },
  methods: {
    updateSlot ({ index, value }) {
      this.$set(this.slots, index, value)
    },
    selectSkill ({ index, value }) {
      if (!value) {
        this.$set(this.skills, index, {
          name: '',
          slug: '',
          level: 0
        })
      } else {
        const skill = this.getSkill(value)
        if (skill) {
          this.$set(this.skills, index, {
            name: skill.name,
            slug: skill.slug,
            level: 1
          })
        }
      }
    },
    updateSkill ({ index, value }) {
      this.$set(this.skills[index], 'level', parseInt(value))
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
</style>
