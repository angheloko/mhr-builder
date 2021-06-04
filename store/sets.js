import Vue from 'vue'

export const state = () => ({
  sets: [],
  persist: true
})

export const mutations = {
  persist (state, persist) {
    state.persist = persist
  },
  load (state) {
    state.sets = localStorage.sets ? JSON.parse(localStorage.sets) : []
  },
  add (state, set) {
    state.sets.push(set)
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  remove (state, index) {
    state.sets.splice(index, 1)
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  equip (state, { index, type, item }) {
    Vue.set(state.sets[index], type, item)
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  unequip (state, { index, type }) {
    Vue.set(state.sets[index], type, null)
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  decorate (state, { index, type, slot, decoration }) {
    if (state.sets[index][type].decorations) {
      Vue.set(state.sets[index][type].decorations, slot, decoration)
    } else {
      const decorations = state.sets[index][type].slots.map(() => null)
      decorations[slot] = decoration
      Vue.set(state.sets[index][type], 'decorations', decorations)
    }
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  undecorate (state, { index, type, slot }) {
    Vue.set(state.sets[index][type].decorations, slot, null)
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  update (state, { index, set }) {
    state.sets[index] = set
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  clear (state) {
    state.sets = []
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  }
}

export const getters = {
  sets: state => state.sets
}
