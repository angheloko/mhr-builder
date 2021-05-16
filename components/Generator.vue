<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
      <h1 class="text-sm font-medium p-2">
        Step {{ step + 1 }} of {{ steps.length }}: {{ steps[step].name }}
      </h1>
      <GeneratorStepSkills
        v-if="step === 0"
        :skills="skills"
        :excluded="excluded"
        @select="selectSkill"
        @update="updateSkill"
        @exclude="excludeSkill"
      />
      <GeneratorStepWeapon
        v-if="step === 1"
        :value="weapon"
        @select="selectWeapon"
      />
      <GeneratorStepTalisman
        v-if="step === 2"
        :slots="talisman.slots"
        :skills="talisman.skills"
        @add="addTalismanSkills"
        @select="selectTalismanSkill"
        @update:skill="updateTalismanSkill"
        @update:slot="setTalismanSlot"
      />
      <GeneratorStepOptions
        v-if="step === 3"
        :unique="unique"
        :decorate="decorate"
        @update:unique="updateUnique"
        @update:decorate="updateDecorate"
      />
    </div>
    <div class="text-right p-2">
      <button
        class="bg-blue-600 text-white font-medium text-sm px-4 rounded h-8"
        @click="generate"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeneratorStepSkills from './GeneratorStepSkills'
import GeneratorStepWeapon from './GeneratorStepWeapon'
import GeneratorStepTalisman from './GeneratorStepTalisman'
import GeneratorStepOptions from './GeneratorStepOptions'

export default {
  name: 'Generator',
  components: { GeneratorStepOptions, GeneratorStepTalisman, GeneratorStepWeapon, GeneratorStepSkills },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      step: 0,
      steps: [
        {
          name: 'Select skills'
        },
        {
          name: 'Select weapon'
        },
        {
          name: 'Talisman settings'
        },
        {
          name: 'Options'
        }
      ],
      maxSkills: 5,
      maxExcluded: 3,
      skills: [],
      excluded: [],
      talisman: {
        slots: [0, 0, 0],
        skills: [{
          slug: '',
          level: 0
        }]
      },
      weapon: null,
      unique: false,
      decorate: false
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
    setTalismanSlot ({ index, value }) {
      const level = parseInt(value) || 0
      this.$set(this.talisman.slots, index, level)
    },
    addTalismanSkills () {
      this.talisman.skills.push({
        slug: '',
        level: 0
      })
    },
    selectTalismanSkill ({ index, value }) {
      const skill = this.getSkill(value)
      if (skill) {
        this.talisman.skills[index].slug = value
        this.talisman.skills[index].level = skill.level
      }
    },
    updateTalismanSkill ({ index, value }) {
      const level = parseInt(value)
      if (Number.isInteger(level)) {
        this.talisman.skills[index].level = level
      }
    },
    updateUnique (value) {
      this.unique = value
    },
    updateDecorate (value) {
      this.decorate = value
    },
    generate () {
      if (this.step < this.steps.length - 1) {
        this.step++
      }

      console.log(JSON.stringify({
        skills: this.skills,
        excluded: this.excluded,
        weapon: this.weapon,
        talisman: this.talisman,
        unique: this.unique,
        decorate: this.decorate
      }))
    }
  }
}
</script>

<style scoped>

</style>
