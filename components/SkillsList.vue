<template>
  <div class="text-center p-1 flex-grow">
    <SkillInfoModal
      v-if="showSkill"
      :value="showSkill"
      @close="showSkill = null"
    />
    <div class="font-light text-xs p-1">
      {{ header }}
    </div>
    <div>
      <ul v-if="skills.length > 0">
        <li
          v-for="(skill, skillIndex) of skills"
          :key="skillIndex"
          class="cursor-pointer text-blue-600"
          @click="clickHandler(skill.slug)"
        >
          {{ skill.name }} Lv {{ skill.level }}
        </li>
      </ul>
      <div v-else class="italic">
        None
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SkillInfoModal from './SkillInfoModal'

export default {
  name: 'SkillsList',
  components: { SkillInfoModal },
  props: {
    skills: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      default: 'Skills'
    }
  },
  data () {
    return {
      showSkill: null
    }
  },
  computed: {
    ...mapGetters({
      getSkill: 'skills/getSkill'
    })
  },
  methods: {
    clickHandler (slug) {
      this.showSkill = this.getSkill(slug)
    }
  }
}
</script>

<style scoped>

</style>
