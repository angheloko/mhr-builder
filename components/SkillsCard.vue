<template>
  <div>
    <SkillInfoModal
      v-if="showSkill"
      :value="showSkill"
      @close="showSkill = null"
    />
    <button
      class="flex justify-between items-center w-full focus:outline-none font-medium"
      @click="showDetails = !showDetails"
    >
      Skills
      <ChevronUpIcon v-if="showDetails" />
      <ChevronDownIcon v-else />
    </button>
    <div v-if="showDetails" class="px-2 mt-2">
      <template v-if="skills.length > 0">
        <div
          v-for="(skill, index) of skills"
          :key="index"
          class="flex justify-between items-center mb-1 cursor-pointer"
          @click="clickHandler(skill.slug)"
        >
          <div class="text-blue-600">
            {{ skill.name }}
          </div>
          <div
            class="text-right"
            :class="{'text-red-600': skill.level > skill.max}"
          >
            {{ skill.level }}
          </div>
        </div>
      </template>
      <div v-else class="italic">
        None
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SkillInfoModal from './SkillInfoModal'
import ChevronUpIcon from './icons/ChevronUpIcon'
import ChevronDownIcon from './icons/ChevronDownIcon'
import config from '~/app.config'

export default {
  name: 'SkillsCard',
  components: { ChevronDownIcon, ChevronUpIcon, SkillInfoModal },
  props: {
    set: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDetails: true,
      showSkill: null
    }
  },
  computed: {
    ...mapGetters({
      getSkill: 'skills/getSkill'
    }),
    equipmentTypes () {
      return Object.getOwnPropertyNames(config.equipmentTypes)
    },
    skills () {
      const skills = []

      for (const type of this.equipmentTypes) {
        if (!this.set[type]) {
          continue
        }

        if (this.set[type].skills) {
          for (const skill of this.set[type].skills) {
            const found = skills.findIndex((element) => {
              return element.slug === skill.slug
            })
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

        if (this.set[type].decorations) {
          for (const decoration of this.set[type].decorations) {
            if (decoration) {
              const found = skills.findIndex((element) => {
                return element.slug === decoration.skillSlug
              })
              if (found >= 0) {
                skills[found].level++
              } else {
                skills.push({
                  name: decoration.skill,
                  slug: decoration.skillSlug,
                  level: 1
                })
              }
            }
          }
        }
      }

      for (const i in skills) {
        skills[i].max = this.getSkillMax(skills[i].slug)
      }

      return skills.sort((a, b) => {
        if (a.level === b.level) {
          return a.name > b.name
        }
        return b.level - a.level
      })
    }
  },
  methods: {
    getSkillMax (slug) {
      const skill = this.getSkill(slug)
      return skill ? skill.level : 0
    },
    clickHandler (slug) {
      this.showSkill = this.getSkill(slug)
    }
  }
}
</script>

<style scoped>

</style>
