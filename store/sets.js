import Vue from 'vue'

export const state = () => ({
  sets: [],
  persist: true
})

export const actions = {
  pin ({ commit }, index) {
    commit('setMeta', {
      index,
      key: 'pin',
      value: true
    })
    commit('reorder')
  },
  unpin ({ commit }, index) {
    commit('setMeta', {
      index,
      key: 'pin',
      value: false
    })
    commit('reorder')
  }
}

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
  decorate (state, { index, type, slot, decoration, isRampage }) {
    const decorationProp = isRampage ? 'rampDecorations' : 'decorations'
    const slotProp = isRampage ? 'rampSlots' : 'slots'

    if (state.sets[index][type][decorationProp]) {
      Vue.set(state.sets[index][type][decorationProp], slot, decoration)
    } else {
      const decorations = state.sets[index][type][slotProp].map(() => null)
      decorations[slot] = decoration
      Vue.set(state.sets[index][type], decorationProp, decorations)
    }
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  undecorate (state, { index, type, slot, isRampage }) {
    const prop = isRampage ? 'rampDecorations' : 'decorations'

    Vue.set(state.sets[index][type][prop], slot, null)

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
  reorder (state) {
    const sets = state.sets

    sets.sort((a, b) => {
      const isAPinned = a._meta?.pin ?? false
      const isBPinned = b._meta?.pin ?? false
      const aScore = a._score ?? 0
      const bScore = b._score ?? 0

      if (isAPinned === isBPinned) {
        return bScore - aScore
      }

      return isAPinned && !isBPinned ? -1 : 1
    })

    state.sets = sets
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  setMeta (state, { index, key, value }) {
    if (state.sets[index]._meta) {
      Vue.set(state.sets[index]._meta, key, value)
    } else {
      const meta = {}
      meta[key] = value
      Vue.set(state.sets[index], '_meta', meta)
    }

    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  },
  clear (state) {
    state.sets = state.sets.filter((set) => {
      return set._meta?.pin ?? false
    })
    if (state.persist) {
      localStorage.sets = JSON.stringify(state.sets)
    }
  }
}

export const getters = {
  sets: state => state.sets
}
