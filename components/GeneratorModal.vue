<template>
  <Modal @close="$emit('close')">
    <div class="p-2 flex flex-col h-full">
      <div class="flex-grow">
        <GeneratorStepSkills
          :skills="skills"
          :excluded="excluded"
          @select="selectSkill"
          @update="updateSkill"
          @exclude="excludeSkill"
        />
      </div>
      <div class="text-right">
        <button
          class="bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
          @click="generate"
        >
          Next
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from './Modal'
import GeneratorStepSkills from './GeneratorStepSkills'
export default {
  name: 'GeneratorModal',
  components: { GeneratorStepSkills, Modal },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      maxSkills: 5,
      maxExcluded: 3,
      skills: [],
      excluded: []
    }
  },
  computed: {
    ...mapGetters({
      getSkill: 'skills/getSkill'
    })
  },
  mounted () {
    for (let i = 0; i < this.maxSkills; i++) {
      this.skills.push({
        slug: '',
        level: 0
      })
    }

    for (let i = 0; i < this.maxExcluded; i++) {
      this.excluded.push('')
    }
  },
  methods: {
    selectSkill ({ index, value }) {
      const skill = this.getSkill(value)
      if (skill) {
        this.skills[index].slug = value
        this.skills[index].level = skill.level
      }
    },
    updateSkill ({ index, value }) {
      const level = parseInt(value)
      if (Number.isInteger(level)) {
        this.skills[index].level = level
      }
    },
    excludeSkill ({ index, value }) {
      this.$set(this.excluded, index, value)
    },
    generate () {
      console.log(this.skills)
      console.log(this.excluded)
    }
  }
}
</script>

<style scoped>

</style>
