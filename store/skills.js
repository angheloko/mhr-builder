import { cloneDeep } from 'lodash'

export const state = () => ({
  skills: []
})

export const mutations = {
  add (state, skill) {
    state.skills.push(skill)
  },
  clear (state) {
    state.skills = []
  }
}

export const getters = {
  getSkill: state => slug => cloneDeep(state.skills.find(skill => skill.slug === slug)),
  skills: state => state.skills,
  getSkillOptions: (state) => {
    const options = []
    for (const skill of state.skills) {
      options.push({
        label: skill.name,
        value: skill.slug
      })
    }
    return options
  }
}

export const actions = {
  async load ({ commit }) {
    commit('clear')
    const skills = await this.$content('skills').sortBy('name').fetch()
    for (const skill of skills) {
      commit('add', skill)
    }
  }
}
