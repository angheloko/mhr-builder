<template>
  <div>
    <div class="font-medium mb-1">
      Skills
    </div>
    <div class="pl-2">
      <table v-if="skills.length > 0" class="w-full text-gray-600 text-sm">
        <tr v-for="(skill, index) of skills" :key="index">
          <td>{{ skill.name }}</td>
          <td
            class="text-right"
            :class="{'text-red-600': skill.level > skill.max}"
          >
            {{ skill.level }}
          </td>
        </tr>
      </table>
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
      equipmentTypes: ['talisman', 'weapon', 'head', 'chest', 'arms', 'waist', 'legs']
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
              return element.name === skill.name
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
                return element.name === decoration.skill
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
