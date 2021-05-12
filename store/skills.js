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
  getSkill: state => slug => state.skills.find(skill => skill.slug === slug),
  skills: state => state.skills
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
