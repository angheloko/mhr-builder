import Vue from 'vue'

export const state = () => ({
  sets: []
})

export const mutations = {
  load (state) {
    const sets = localStorage.sets
    state.sets = sets ? JSON.parse(localStorage.sets) : []
  },
  add (state, set) {
    state.sets.push(set)
    localStorage.sets = JSON.stringify(state.sets)
  },
  remove (state, index) {
    state.sets.splice(index, 1)
    localStorage.sets = JSON.stringify(state.sets)
  },
  equip (state, { index, type, item }) {
    Vue.set(state.sets[index], type, item)
    localStorage.sets = JSON.stringify(state.sets)
  },
  unequip (state, { index, type }) {
    Vue.set(state.sets[index], type, null)
    localStorage.sets = JSON.stringify(state.sets)
  },
  decorate (state, { index, type, slot, decoration }) {
    if (state.sets[index][type].decorations) {
      Vue.set(state.sets[index][type].decorations, slot, decoration)
    } else {
      const decorations = state.sets[index][type].slots.map(() => null)
      decorations[slot] = decoration
      Vue.set(state.sets[index][type], 'decorations', decorations)
    }
    localStorage.sets = JSON.stringify(state.sets)
  },
  undecorate (state, { index, type, slot }) {
    Vue.set(state.sets[index][type].decorations, slot, null)
    localStorage.sets = JSON.stringify(state.sets)
  },
  update (state, { index, set }) {
    state.sets[index] = set
    localStorage.sets = JSON.stringify(state.sets)
  },
  clear (state) {
    state.sets = []
    localStorage.sets = JSON.stringify(state.sets)
  }
}

export const getters = {
  sets: state => state.sets
}
