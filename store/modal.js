export const state = () => ({
  status: false
})

export const getters = {
  status: state => state.status
}

export const mutations = {
  show (state) {
    state.status = true
  },
  hide (state) {
    state.status = false
  }
}
