<template>
  <div class="generator h-full">
    <div>
      <h1
        v-if="step < steps.length"
        class="text-sm font-medium p-2"
      >
        Step {{ step + 1 }} of {{ steps.length }}: {{ steps[step].name }}
      </h1>
    </div>
    <div class="overflow-y-auto">
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
      <div v-if="step === 4" class="flex flex-col justify-center items-center h-full text-sm">
        <div v-if="isGenerating">
          <svg class="animate-spin m-auto h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p class="text-sm mt-2">
            Generating sets...
          </p>
        </div>
        <div v-else class="w-2/3 text-center">
          <h2 class="text-lg mb-5">
            Done!
          </h2>
          <p class="mb-6">
            If you have any feedback or would like to report an issue, feel free to drop me a message at
            <a href="https://twitter.com/DonOrDoNot" class="text-blue-600 font-medium">@DonOrDoNot</a>!
          </p>
          <button
            class="bg-blue-600 text-white font-medium text-sm px-4 rounded h-8"
            @click="$emit('update')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="step < steps.length" class="text-right p-2 border-t">
        <button
          v-if="step > 0"
          class="border border-blue-600 text-blue-600 font-medium text-sm px-4 rounded h-8 mr-2"
          @click="back"
        >
          Back
        </button>
        <button
          class="bg-blue-600 text-white font-medium text-sm px-4 rounded h-8"
          @click="next"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
      isGenerating: false,
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
      unique: true,
      decorate: true,
      decorations: [],
      setPieces: [
        'talisman',
        'weapon',
        'head',
        'chest',
        'arms',
        'waist',
        'legs'
      ],
      skillsWeight: 0.5,
      slotsWeight: 0.3,
      defenseWeight: 0.2
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

    if (localStorage.generator) {
      const params = JSON.parse(localStorage.generator)
      this.skills = params.skills
      this.excluded = params.excluded
      this.weapon = params.weapon
      this.talisman = params.talisman
      this.unique = params.unique
      this.decorate = params.decorate
    }
  },
  methods: {
    ...mapMutations({
      addSet: 'sets/add',
      clearSets: 'sets/clear'
    }),
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
    back () {
      if (this.step > 0) {
        this.step--
      }
    },
    next () {
      if (this.step < this.steps.length) {
        this.step++
      }
      if (this.step >= this.steps.length) {
        this.generate()
      }
    },
    async generate () {
      this.isGenerating = true
      const sets = []
      this.clearSets()

      const headArmors = await this.loadArmors('head')
      const chestArmors = await this.loadArmors('chest')
      const armsArmors = await this.loadArmors('arms')
      const waistArmors = await this.loadArmors('waist')
      const legsArmors = await this.loadArmors('legs')

      if (this.decorate) {
        this.decorations = await this.loadDecorations()
      }

      for (const head of headArmors) {
        for (const chest of chestArmors) {
          for (const arms of armsArmors) {
            for (const waist of waistArmors) {
              for (const legs of legsArmors) {
                const set = {
                  talisman: this.generateTalisman(),
                  weapon: this.weapon,
                  head,
                  chest,
                  arms,
                  waist,
                  legs
                }

                if (this.decorate) {
                  this.decorateSet(set)
                }

                if (this.isSetValid(set)) {
                  set._score = (this.calculateSkillsPoints(set) * this.skillsWeight) +
                    (this.calculateSlotsPoints(set) * this.slotsWeight) +
                    (this.calculateDefensePoints(set) * this.defenseWeight)
                  sets.push(set)
                }
              }
            }
          }
        }
      }

      let sorted = sets.sort((a, b) => b._score - a._score)

      if (this.unique) {
        const unique = []
        const pieces = {
          head: {},
          chest: {},
          arms: {},
          waist: {},
          legs: {}
        }
        for (const set of sorted) {
          let exists = false

          for (const piece of ['head', 'chest', 'arms', 'waist', 'legs']) {
            if (pieces[piece][set[piece].slug]) {
              exists = true
              break
            }
          }

          if (!exists) {
            for (const piece of ['head', 'chest', 'arms', 'waist', 'legs']) {
              pieces[piece][set[piece].slug] = true
            }
            unique.push(set)
          }
        }
        sorted = unique
      }

      const shortlist = sorted.slice(0, 5)
      for (const set of shortlist) {
        this.addSet(set)
      }

      this.isGenerating = false
      localStorage.generator = JSON.stringify({
        skills: this.skills,
        excluded: this.excluded,
        talisman: this.talisman,
        weapon: this.weapon,
        unique: this.unique,
        decorate: this.decorate
      })
    },
    isSetValid (set) {
      for (const skill of this.skills) {
        const total = this.getSkillTotal(set, skill.slug)
        if (total > skill.level) {
          return false
        }
      }
      return true
    },
    calculateDefensePoints (set) {
      let total = 0
      for (const piece of this.setPieces) {
        if (!set[piece]) {
          continue
        }
        const defense = set[piece].baseDefense ?? set[piece].defense ?? 0
        total += defense
      }
      return total / 600 // Set pieces that has defense (weapon, head, chest, arms, waist, legs).
    },
    calculateSlotsPoints (set) {
      let total = 0
      for (const piece of this.setPieces) {
        if (set[piece] && set[piece].slots !== undefined) {
          for (const slot of set[piece].slots) {
            total += slot
          }
        }
      }
      return total / (this.setPieces.length * 9)
    },
    calculateSkillsPoints (set) {
      const baseModifier = 0.1
      let modifier = 1
      let total = 0
      let skillCount = 0
      const skillPoints = []

      for (const skill of this.skills.filter(element => element.level > 0)) {
        const totalLevel = this.getSkillTotal(set, skill.slug)
        let points = 0

        if (totalLevel > 0) {
          points = (totalLevel / skill.level) * modifier
        }

        skillPoints.push(points)
        modifier -= baseModifier
        skillCount++
      }

      for (const points of skillPoints) {
        total += points / skillCount
      }

      return total
    },
    decorateSet (set) {
      for (const skill of this.skills.filter(skill => skill.level > 0)) {
        let total = this.getSkillTotal(set, skill.slug)
        const decoration = this.getDecoration(skill.slug)

        if (total < skill.level && decoration) {
          for (const piece of this.setPieces) {
            if (set[piece] && set[piece].slots !== undefined) {
              const slots = set[piece].slots
              const decorations = set[piece].decorations ?? slots.map(() => null)

              const emptySlots = []
              for (let i = 0; i < decorations.length; i++) {
                if (!decorations[i] && slots[i] >= decoration.level) {
                  emptySlots.push(i)
                }
              }

              for (const emptySlot of emptySlots) {
                decorations[emptySlot] = decoration
                set[piece].decorations = decorations
                total++

                if (total >= skill.level) {
                  break
                }
              }

              if (total >= skill.level) {
                break
              }
            }
          }
        }
      }
    },
    getSkillTotal (set, slug) {
      let count = 0
      for (const piece of this.setPieces) {
        if (!set[piece]) {
          continue
        }
        if (set[piece].skills !== undefined) {
          for (const skill of set[piece].skills) {
            if (skill.slug === slug) {
              count += skill.level
            }
          }
        }
        if (set[piece].decorations !== undefined) {
          for (const decoration of set[piece].decorations.filter(element => element)) {
            if (decoration.skillSlug === slug) {
              count++
            }
          }
        }
      }
      return count
    },
    loadDecorations () {
      const slugs = this.skills.map(skill => skill.slug)
      return this.$content('decorations')
        .where({
          skillSlug: {
            $in: slugs
          }
        })
        .fetch()
    },
    getDecoration (slug) {
      return this.decorations.find(decoration => decoration.skillSlug === slug)
    },
    generateTalisman () {
      const slots = this.talisman.slots.filter(slot => slot > 0)
      const skills = this.talisman.skills.filter(skill => skill.level > 0).map((skill) => {
        const skillInfo = this.getSkill(skill.slug)
        return {
          name: skillInfo.name,
          slug: skill.slug,
          level: skill.level
        }
      })
      if (slots.length > 0 || skills.length > 0) {
        return {
          slots,
          skills
        }
      }
      return null
    },
    async loadArmors (type) {
      const armors = []
      const slugs = this.skills.map(skill => skill.slug)
      const conditions = {
        'skills.slug': {
          $containsAny: slugs
        }
      }
      const result = await this.$content(`${type}-armors`).where(conditions).fetch()
      for (const armor of result) {
        const hasExcludedSkill = armor.skills.find(skill => this.excluded.includes(skill.slug))
        if (hasExcludedSkill) {
          continue
        }
        armors.push(armor)
      }
      return armors
    }
  }
}
</script>

<style scoped>
.generator {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
