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
      <TalismanSettings
        v-if="step === 2"
        :slots="talisman.slots"
        :skills="talisman.skills"
        class="p-2"
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
            Done! 🎉
          </h2>
          <p class="mb-6">
            If you see any problems with the data, found any bugs, or would like to suggest a new feature, please
            <a href="https://github.com/angheloko/mhr-builder/issues" class="text-blue-600 font-bold">submit an issue</a> or
            <a href="mailto:angheloko@gmail.com" class="text-blue-600 font-bold">drop me an email</a>.
          </p>
          <button
            class="bg-blue-600 text-white font-medium text-sm px-4 rounded h-8"
            @click="$emit('close')"
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
import { cloneDeep } from 'lodash'
import config from '~/app.config'
import GeneratorStepSkills from '~/components/GeneratorStepSkills'
import GeneratorStepWeapon from '~/components/GeneratorStepWeapon'
import GeneratorStepOptions from '~/components/GeneratorStepOptions'
import TalismanSettings from '~/components/TalismanSettings'

export default {
  name: 'Generator',
  components: { TalismanSettings, GeneratorStepOptions, GeneratorStepWeapon, GeneratorStepSkills },
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
      maxTalismanSkills: 3,
      talisman: {
        slots: [0, 0, 0],
        skills: []
      },
      weapon: null,
      unique: true,
      decorate: true,
      decorations: [],
      skillsWeight: 0.5,
      slotsWeight: 0.3,
      defenseWeight: 0.2
    }
  },
  computed: {
    ...mapGetters({
      getSkill: 'skills/getSkill'
    }),
    equipmentTypes () {
      return Object.getOwnPropertyNames(config.equipmentTypes)
    }
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

    for (let i = 0; i < this.maxTalismanSkills; i++) {
      this.talisman.skills.push({
        slug: '',
        level: 0
      })
    }

    if (localStorage.generator) {
      const params = JSON.parse(localStorage.generator)

      this.fillArray(this.skills, params.skills.filter(skill => skill.slug && skill.level))
      this.fillArray(this.excluded, params.excluded.filter(skill => skill))

      this.weapon = params.weapon

      this.fillArray(this.talisman.slots, params.talisman.slots.filter(slot => slot))
      this.fillArray(this.talisman.skills, params.talisman.skills.filter(skill => skill.slug && skill.level))

      this.unique = params.unique
      this.decorate = params.decorate
    }
  },
  methods: {
    ...mapMutations({
      addSet: 'sets/add',
      clearSets: 'sets/clear'
    }),
    fillArray (arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        if (i < arr2.length) {
          arr1.splice(i, 1, arr2[i])
        }
      }
    },
    selectSkill ({ index, value }) {
      if (!value) {
        this.skills[index].slug = ''
        this.skills[index].level = 0
      } else {
        const skill = this.getSkill(value)
        if (skill) {
          this.skills[index].slug = value
          this.skills[index].level = skill.level
        }
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
    selectTalismanSkill ({ index, value }) {
      if (!value) {
        this.talisman.skills[index].slug = ''
        this.talisman.skills[index].level = 0
      } else {
        const skill = this.getSkill(value)
        if (skill) {
          this.talisman.skills[index].slug = value
          this.talisman.skills[index].level = 1
        }
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
        this.isGenerating = true

        setTimeout(() => {
          this.generate().then(() => {
            this.isGenerating = false
          })
        }, 300)
      }
    },
    async generate () {
      const sets = []
      this.clearSets()

      const headArmors = await this.loadArmors('head')
      const chestArmors = await this.loadArmors('chest')
      const armsArmors = await this.loadArmors('arms')
      const waistArmors = await this.loadArmors('waist')
      const legsArmors = await this.loadArmors('legs')
      const talisman = this.generateTalisman()

      if (this.decorate) {
        this.decorations = await this.loadDecorations()
      }

      for (const head of headArmors) {
        for (const chest of chestArmors) {
          for (const arms of armsArmors) {
            for (const waist of waistArmors) {
              for (const legs of legsArmors) {
                const set = cloneDeep({
                  talisman,
                  weapon: this.weapon,
                  head,
                  chest,
                  arms,
                  waist,
                  legs
                })

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
        const equipments = {
          head: {},
          chest: {},
          arms: {},
          waist: {},
          legs: {}
        }
        for (const set of sorted) {
          let exists = false

          for (const type of ['head', 'chest', 'arms', 'waist', 'legs']) {
            if (equipments[type][set[type].slug]) {
              exists = true
              break
            }
          }

          if (!exists) {
            for (const type of ['head', 'chest', 'arms', 'waist', 'legs']) {
              equipments[type][set[type].slug] = true
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

      localStorage.generator = JSON.stringify({
        skills: this.skills.filter(skill => skill.slug && skill.level),
        excluded: this.excluded.filter(skill => skill),
        talisman: {
          slots: this.talisman.slots.filter(slot => slot),
          skills: this.talisman.skills.filter(skill => skill.slug && skill.level)
        },
        weapon: this.weapon,
        unique: this.unique,
        decorate: this.decorate
      })
    },
    generateTalisman () {
      let talisman = null
      const slots = this.talisman.slots.filter(slot => slot > 0)
      const skills = []

      for (const skill of this.talisman.skills) {
        if (skill.slug && skill.level > 0) {
          const skillInfo = this.getSkill(skill.slug)
          if (skillInfo) {
            skills.push({
              name: skillInfo.name,
              slug: skill.slug,
              level: skill.level
            })
          }
        }
      }

      if (slots.length > 0 || skills.length > 0) {
        talisman = {
          slots,
          skills
        }
      }

      return talisman
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
      for (const type of this.equipmentTypes) {
        if (!set[type]) {
          continue
        }
        const defense = set[type].baseDefense ?? set[type].defense ?? 0
        total += defense
      }
      return total / 600 // Equipments that has defense (weapon, head, chest, arms, waist, legs).
    },
    calculateSlotsPoints (set) {
      let total = 0
      for (const type of this.equipmentTypes) {
        if (set[type] && set[type].slots !== undefined) {
          for (const slot of set[type].slots) {
            total += slot
          }
        }
      }
      return total / (this.equipmentTypes.length * 9)
    },
    calculateSkillsPoints (set) {
      const baseModifier = 0.1
      let modifier = 1
      let total = 0
      let skillCount = 0
      const skillPoints = []

      for (const skill of this.skills.filter(this.filterSkills)) {
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
      const setSkills = {}

      for (const skill of this.skills.filter(this.filterSkills)) {
        setSkills[skill.slug] = this.getSkillTotal(set, skill.slug)
      }

      for (const skill of this.skills.filter(this.filterSkills)) {
        let total = setSkills[skill.slug]
        const decoration = this.getDecoration(skill.slug)

        if (total < skill.level && decoration) {
          for (const type of this.equipmentTypes) {
            if (!set[type]) {
              continue
            }

            const slots = set[type].slots ?? []
            const decorations = set[type].decorations ?? slots.map(() => null)

            const emptySlots = []
            for (let i = 0; i < decorations.length; i++) {
              if (!decorations[i] && slots[i] >= decoration.level) {
                emptySlots.push(i)
              }
            }

            for (const emptySlot of emptySlots) {
              decorations[emptySlot] = decoration
              set[type].decorations = decorations
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
    },
    getSkillTotal (set, slug) {
      let count = 0
      for (const type of this.equipmentTypes) {
        if (!set[type]) {
          continue
        }
        if (set[type].skills !== undefined) {
          for (const skill of set[type].skills) {
            if (skill.slug === slug) {
              count += skill.level
            }
          }
        }
        if (set[type].decorations !== undefined) {
          for (const decoration of set[type].decorations.filter(element => element)) {
            if (decoration.skillSlug === slug) {
              count++
            }
          }
        }
      }
      return count
    },
    async loadDecorations () {
      const decorations = {}
      const slugs = this.skills.map(skill => skill.slug)
      const results = await this.$content('decorations')
        .where({
          skillSlug: {
            $in: slugs
          }
        })
        .fetch()

      for (const decoration of results) {
        decorations[decoration.skillSlug] = decoration
      }

      return decorations
    },
    getDecoration (slug) {
      return this.decorations[slug]
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
    },
    filterSkills (skill) {
      return skill.slug && skill.level > 0
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
