<template>
  <div class="generator h-full">
    <div>
      <h1
        v-if="step < steps.length"
        class="text-sm font-medium px-4 py-2"
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
        class="px-4 py-2"
        @select="selectTalismanSkill"
        @update:skill="updateTalismanSkill"
        @update:slot="setTalismanSlot"
      />
      <GeneratorStepOptions
        v-if="step === 3"
        :unique="unique"
        :decorate="decorate"
        :allow-empty-pieces="allowEmptyPieces"
        :armor-rank="armorRank"
        @update:unique="updateUnique"
        @update:decorate="updateDecorate"
        @update:allowEmptyPieces="updateAllowEmptyPieces"
        @update:armorRank="updateArmorRank"
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
      <div v-if="step < steps.length" class="text-right px-4 py-2 border-t">
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
      maxSkills: 8,
      maxExcluded: 3,
      skills: [],
      excluded: [],
      maxTalismanSkills: 3,
      talisman: {
        slots: [0, 0, 0],
        skills: []
      },
      maxSlotLevel: 4,
      weapon: null,
      unique: true,
      decorate: true,
      allowEmptyPieces: true,
      armorRank: 2,
      decorations: [],
      skillsWeight: 0.4,
      decorationsWeight: 0.3,
      freeSlotsWeight: 0.2,
      defenseWeight: 0.1,
      armorSkillsWeight: 0.5,
      armorFreeSlotsWeight: 0.4,
      armorDefenseWeight: 0.1,
      armorTypes: [
        'head',
        'chest',
        'arms',
        'waist',
        'legs'
      ]
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
      this.allowEmptyPieces = params.allowEmptyPieces
      this.armorRank = params.armorRank
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
    updateAllowEmptyPieces (value) {
      this.allowEmptyPieces = value
    },
    updateArmorRank (value) {
      this.armorRank = parseInt(value)
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

      const promises = []
      promises.push(this.loadArmors('head'))
      promises.push(this.loadArmors('chest'))
      promises.push(this.loadArmors('arms'))
      promises.push(this.loadArmors('waist'))
      promises.push(this.loadArmors('legs'))

      const result = await Promise.all(promises)
      const headArmors = result[0]
      const chestArmors = result[1]
      const armsArmors = result[2]
      const waistArmors = result[3]
      const legsArmors = result[4]

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
                  set._scores = [
                    this.calculateSkillsPoints(set) * this.skillsWeight,
                    this.calculateDecorationsPoints(set) * this.decorationsWeight,
                    this.calculateFreeSlotsPoints(set) * this.freeSlotsWeight,
                    this.calculateDefensePoints(set) * this.defenseWeight
                  ]
                  set._score = (this.calculateSkillsPoints(set) * this.skillsWeight) +
                    (this.calculateDecorationsPoints(set) * this.decorationsWeight) +
                    (this.calculateFreeSlotsPoints(set) * this.freeSlotsWeight) +
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

          for (const type of this.armorTypes) {
            if (equipments[type][set[type].slug]) {
              exists = true
              break
            }
          }

          if (!exists) {
            for (const type of this.armorTypes) {
              equipments[type][set[type].slug] = true
            }
            unique.push(set)
          }
        }
        sorted = unique
      }

      const shortlist = sorted.slice(0, 10)
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
        decorate: this.decorate,
        allowEmptyPieces: this.allowEmptyPieces,
        armorRank: this.armorRank
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
        const total = this.getSkillTotal(set, skill.slug, true)
        if (total > skill.level) {
          return false
        }
      }
      return true
    },
    calculateArmorDefensePoints (armor) {
      return (armor.baseDefense ?? 0) / 150 // Currently, the highest possible defense is 128.
    },
    calculateDefensePoints (set) {
      let total = 0
      for (const type of this.armorTypes) {
        if (!set[type]) {
          continue
        }
        total += this.calculateArmorDefensePoints(set[type])
      }
      return total / this.armorTypes.length
    },
    calculateArmorFreeSlotsPoints (armor) {
      let total = 0
      const decorations = armor.decorations ?? []

      for (let i = 0; i < armor.slots.length; i++) {
        if (decorations[i] === undefined) {
          total += armor.slots[i]
        }
      }

      return total / 12 // Max. free slots possible (4 x 3)
    },
    calculateFreeSlotsPoints (set) {
      let total = 0

      for (const type of this.armorTypes) {
        if (set[type] && set[type].slots !== undefined) {
          total += this.calculateArmorFreeSlotsPoints(set[type])
        }
      }

      return total / this.armorTypes.length
    },
    calculateArmorSkillsPoints (armor, fromDecorations = false) {
      const baseModifier = 0.1
      let modifier = 1
      let total = 0
      let totalSkills = 0

      for (const skill of this.skills.filter(this.filterSkills)) {
        let totalLevel = 0

        if (fromDecorations) {
          totalLevel = this.getArmorSkillTotalFromDecorations(armor, skill.slug)
        } else {
          totalLevel = this.getArmorSkillTotal(armor, skill.slug)
        }

        total += totalLevel * modifier
        totalSkills += skill.level * modifier
        modifier -= baseModifier
      }

      return total / totalSkills
    },
    calculateSkillsPoints (set) {
      let total = 0

      for (const type of this.armorTypes) {
        if (!set[type]) {
          continue
        }
        total += this.calculateArmorSkillsPoints(set[type])
      }

      return total / this.armorTypes.length
    },
    calculateDecorationsPoints (set) {
      let total = 0

      for (const type of this.armorTypes) {
        if (!set[type]) {
          continue
        }
        total += this.calculateArmorSkillsPoints(set[type], true)
      }

      return total / this.armorTypes.length
    },
    decorateSet (set) {
      const setSkills = {}

      for (const skill of this.skills.filter(this.filterSkills)) {
        setSkills[skill.slug] = this.getSkillTotal(set, skill.slug)
      }

      for (const skill of this.skills.filter(this.filterSkills)) {
        let total = setSkills[skill.slug]

        // Skip to next skill if this skill has already reached
        // its required level.
        if (total >= skill.level) {
          continue
        }

        const decorations = this.getDecoration(skill.slug)

        // Skip if no decoration found for the skill.
        if (!decorations.length) {
          continue
        }

        for (const decoration of decorations) {
          // Start looking for slots with the same level
          // as the decoration.
          let slotLevel = decoration.level

          while (slotLevel <= this.maxSlotLevel) {
            for (const type of this.equipmentTypes) {
              if (!set[type]) {
                continue
              }

              // Get the piece's slots and any existing decorations.
              const slots = set[type].slots ?? []
              const existingDecorations = set[type].decorations ?? slots.map(() => null)

              // Collect the empty slots that can fit the decoration.
              const emptySlots = []
              for (let i = 0; i < existingDecorations.length; i++) {
                if (!existingDecorations[i] && slots[i] === slotLevel) {
                  emptySlots.push(i)
                }
              }

              for (const emptySlot of emptySlots) {
                existingDecorations[emptySlot] = decoration
                set[type].decorations = existingDecorations
                total++

                if (total >= skill.level) {
                  break
                }
              }

              if (total >= skill.level) {
                break
              }
            }

            if (total >= skill.level) {
              break
            }

            // If it reaches here, try a higher slot level.
            slotLevel++
          }
        }
      }
    },
    getArmorSkillTotal (armor, slug) {
      let total = 0

      if (armor.skills !== undefined) {
        for (const skill of armor.skills) {
          if (skill.slug === slug) {
            total += skill.level
          }
        }
      }

      return total
    },
    getArmorSkillTotalFromDecorations (armor, slug) {
      let total = 0

      if (armor.decorations !== undefined) {
        for (const decoration of armor.decorations.filter(element => element)) {
          if (decoration.skillSlug === slug) {
            total += decoration.skillLevel
          }
        }
      }

      return total
    },
    getSkillTotal (set, slug, includeDecorations = false) {
      let total = 0

      for (const type of this.equipmentTypes) {
        if (!set[type]) {
          continue
        }
        total += this.getArmorSkillTotal(set[type], slug)

        if (includeDecorations) {
          total += this.getArmorSkillTotalFromDecorations(set[type], slug)
        }
      }

      return total
    },
    async loadDecorations () {
      const decorations = []
      const slugs = this.skills.map(skill => skill.slug)
      const results = await this.$content('decorations')
        .where({
          skillSlug: {
            $in: slugs
          },
          isRampage: false
        })
        .fetch()

      for (const decoration of results) {
        decorations.push(decoration)
      }

      return decorations
    },
    getDecoration (slug) {
      return this.decorations.filter(decoration => decoration.skillSlug === slug)
    },
    async loadArmors (type) {
      const promises = []
      const armors = []
      const slugs = this.skills.map(skill => skill.slug)

      // All armors with the specified skills.
      const promise1 = this.$content(`${type}-armors`)
        .where({
          'skills.slug': {
            $containsAny: slugs
          },
          rank: this.armorRank
        }).fetch()
      promises.push(promise1)

      // All slot-able skill-less armors.
      if (this.allowEmptyPieces) {
        const promise2 = this.$content(`${type}-armors`)
          .where({
            skills: {
              $size: 0
            },
            slots: {
              $containsAny: [1, 2, 3, 4]
            },
            rank: this.armorRank
          }).fetch()
        promises.push(promise2)
      }

      const results = await Promise.all(promises)

      for (const result of results) {
        for (const armor of result) {
          const hasExcludedSkill = armor.skills.find(skill => this.excluded.includes(skill.slug))
          if (hasExcludedSkill) {
            continue
          }

          const existing = armors.find((item) => {
            return item.slug === armor.slug
          })

          if (!existing) {
            armor._score = (this.calculateArmorSkillsPoints(armor) * this.armorSkillsWeight) +
              (this.calculateArmorFreeSlotsPoints(armor) * this.armorFreeSlotsWeight) +
              (this.calculateArmorDefensePoints(armor) * this.armorDefenseWeight)
            armors.push(armor)
          }
        }
      }

      return armors.sort((a, b) => b._score - a._score).slice(0, 10)
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
