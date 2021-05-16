<template>
  <Modal @close="$emit('close')">
    <div class="flex flex-col h-full">
      <div class="flex-grow">
        <GeneratorStepSkills
          v-if="step === 0"
          :skills="skills"
          :excluded="excluded"
          class="px-2"
          @select="selectSkill"
          @update="updateSkill"
          @exclude="excludeSkill"
        />
        <GeneratorStepWeapon
          v-if="step === 1"
          :value="weapon"
          @select="selectWeapon"
        />
      </div>
      <div class="text-right p-2">
        <button
          class="bg-blue-600 text-white font-medium py-2 px-4 rounded"
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
import GeneratorStepWeapon from './GeneratorStepWeapon'
export default {
  name: 'GeneratorModal',
  components: { GeneratorStepWeapon, GeneratorStepSkills, Modal },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      step: 0,
      maxSkills: 5,
      maxExcluded: 3,
      skills: [],
      excluded: [],
      weapon: null
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
    selectWeapon (weapon) {
      this.weapon = weapon
    },
    generate () {
      this.step++
      console.log(this.skills)
      console.log(this.excluded)
      console.log(this.weapon)
    }
  }
}
</script>

<style scoped>

</style>
