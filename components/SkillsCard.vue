<template>
  <div>
    <button
      class="flex justify-between items-center w-full focus:outline-none font-medium"
      @click="showDetails = !showDetails"
    >
      Skills
      <svg v-if="showDetails" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <div v-if="showDetails" class="px-2 mt-2">
      <template v-if="skills.length > 0">
        <div
          v-for="(skill, index) of skills"
          :key="index"
          class="flex justify-between items-center mb-1"
        >
          <div>{{ skill.name }}</div>
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

export default {
  name: 'SkillsCard',
  props: {
    set: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      equipmentTypes: ['talisman', 'weapon', 'head', 'chest', 'arms', 'waist', 'legs'],
      showDetails: false
    }
  },
  computed: {
    ...mapGetters({
      getSkill: 'skills/getSkill'
    }),
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
    }
  }
}
</script>

<style scoped>

</style>
