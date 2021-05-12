<template>
  <div>
    <div class="font-medium mb-1">
      Skills
    </div>
    <div class="pl-2">
      <table v-if="skills.length > 0" class="w-full">
        <tr v-for="(skill, index) of skills" :key="index">
          <td>{{ skill.name }}</td>
          <td class="text-right">
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
      equipmentTypes: {
        weapon: 'Weapon',
        head: 'Head',
        chest: 'Chest',
        arms: 'Arms',
        waist: 'Waist',
        legs: 'Legs'
      }
    }
  },
  computed: {
    skills () {
      const skills = []

      for (const type in this.equipmentTypes) {
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
                  level: 1
                })
              }
            }
          }
        }
      }

      return skills.sort((a, b) => {
        if (a.level === b.level) {
          return a.name > b.name
        }
        return b.level - a.level
      })
    }
  }
}
</script>

<style scoped>

</style>
