<template>
  <div class="text-gray-600 bg-gray-50">
    <WelcomeModal
      v-if="showWelcome"
      @close="closeWelcome"
    />
    <GeneratorModal
      v-if="showModal"
      :value="{ selectedSkills, excludedSkills }"
      @close="showModal = false"
      @input="generate"
    />
    <div class="h-12 flex items-center p-1">
      <Logo class="inline-block h-5 w-auto" />
      <h1 class="text-lg inline-block ml-1 flex-grow hidden md:block">
        Monster Hunter Rise Set Builder
      </h1>
      <h1 class="text-lg inline-block ml-1 flex-grow md:hidden">
        MHR Set Builder
      </h1>
      <button
        class="bg-blue-600 text-white font-medium text-sm py-0 px-4 rounded mr-2 ring h-8"
        @click="showModal = true"
      >
        Generate
      </button>
      <div>
        <a href="https://github.com/angheloko/mhr-builder">
          <svg width="24" height="24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path>
          </svg>
        </a>
      </div>
    </div>
    <Nuxt />
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import Logo from '../components/Logo'
import GeneratorModal from '../components/GeneratorModal'
import WelcomeModal from '../components/WelcomeModal'

export default {
  components: { WelcomeModal, GeneratorModal, Logo },
  data () {
    return {
      showModal: false,
      showWelcome: false,
      selectedSkills: [],
      excludedSkills: [],
      types: [
        'head',
        'chest',
        'arms',
        'waist',
        'legs'
      ]
    }
  },
  mounted () {
    this.loadSkills()
    this.showWelcome = !localStorage.welcomed
  },
  methods: {
    ...mapActions({
      loadSkills: 'skills/load'
    }),
    ...mapMutations({
      addSet: 'sets/add',
      clearSets: 'sets/clear'
    }),
    async generate ({ selectedSkills, excludedSkills }) {
      this.showModal = false
      this.selectedSkills = selectedSkills
      this.excludedSkills = excludedSkills

      this.clearSets()
      const headArmors = await this.loadArmors('head')
      const chestArmors = await this.loadArmors('chest')
      const armsArmors = await this.loadArmors('arms')
      const waistArmors = await this.loadArmors('waist')
      const legsArmors = await this.loadArmors('legs')

      const allArmors = [
        ...headArmors,
        ...chestArmors,
        ...armsArmors,
        ...waistArmors,
        ...legsArmors
      ]
      allArmors.sort((a, b) => b.__points - a.__points)
      const sets = this.generateSets(allArmors)

      const shortlist = sets.sort((a, b) => b.__points - a.__points).slice(0, 5)

      // Clean-up.
      for (const set of shortlist) {
        delete set.__points
        for (const type of Object.getOwnPropertyNames(set)) {
          if (set[type]) {
            delete set[type].__points
          }
        }
        this.addSet(set)
      }
    },
    generateSets (armors) {
      let sets = []
      const remainingArmors = []

      const set = {
        head: null,
        chest: null,
        arms: null,
        waist: null,
        legs: null
      }
      for (const armor of armors) {
        if (set[armor.type] !== null) {
          remainingArmors.push(armor)
        } else {
          set[armor.type] = armor
          if (!this.validateSkills(set)) {
            set[armor.type] = null
            remainingArmors.push(armor)
          }
        }
      }
      set.__points = 0
      for (const type of Object.getOwnPropertyNames(set)) {
        if (set[type]) {
          set.__points += set[type].points
        }
      }
      sets.push(set)

      if (remainingArmors.length > 0) {
        sets = [
          ...sets,
          ...this.generateSets(remainingArmors)
        ]
      }

      return sets
    },
    validateSkills (set) {
      const skills = []

      for (const type of Object.getOwnPropertyNames(set)) {
        if (set[type] && set[type].skills) {
          for (const skill of set[type].skills) {
            const found = skills.findIndex(element => element.name === skill.name)
            if (found >= 0) {
              skills[found].level += skill.level
            } else {
              skills.push({
                name: skill.name,
                slug: skill.slug,
                level: skill.level
              })
            }
          }
        }
      }

      for (const skill of skills) {
        const requiredSkill = this.selectedSkills.find(el => el.skill.slug === skill.slug)

        if (requiredSkill) {
          if (skill.level > requiredSkill.level || skill.level > requiredSkill.skill.level) {
            return false
          }
        } else {
          const skillInfo = this.getSkillInfo(skill.slug)
          if (skillInfo) {
            if (skill.level > skillInfo.level) {
              return false
            }
          }
        }
      }

      return true
    },
    async loadArmors (type) {
      const armors = []
      const slugs = this.selectedSkills.map(skill => skill.skill.slug)
      const conditions = {
        'skills.slug': {
          $containsAny: slugs
        }
      }
      const result = await this.$content(`${type}-armors`).where(conditions).fetch()
      for (const armor of result) {
        const hasExcludedSkill = armor.skills.find(skill => this.excludedSkills.includes(skill.slug))
        if (hasExcludedSkill) {
          continue
        }
        armor.__points = this.calculatePoints(armor)
        armors.push(armor)
      }
      return armors
    },
    calculatePoints (armor) {
      const skillsWeight = 0.5
      const slotsWeight = 0.3
      const defenseWeight = 0.2

      const skillsPoints = this.calculateSkillsPoints(armor) * skillsWeight
      const slotPoints = this.calculateSlotPoints(armor) * slotsWeight
      const defensePoints = this.calculateDefensePoints(armor) * defenseWeight

      return skillsPoints +
        slotPoints +
        defensePoints
    },
    calculateSkillsPoints (armor) {
      const baseModifier = 0.1
      let points = 0
      let modifier = 1

      for (const selectedSkill of this.selectedSkills) {
        const skill = selectedSkill.skill
        const maxLevel = selectedSkill.level
        const armorSkill = armor.skills.find(el => el.slug === skill.slug)
        if (armorSkill) {
          points += (armorSkill.level / maxLevel) * modifier
        }
        modifier -= baseModifier
      }

      return points
    },
    calculateSlotPoints (armor) {
      let slots = 0
      for (const slot of armor.slots) {
        slots += slot
      }

      return slots / 9
    },
    calculateDefensePoints (armor) {
      return armor.baseDefense / 100
    },
    getSkillInfo (slug) {
      return this.$store.getters['skills/getSkill'](slug)
    },
    closeWelcome () {
      localStorage.welcomed = true
      this.showWelcome = false
    }
  }
}
</script>
