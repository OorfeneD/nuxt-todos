export const state = () => {
  return {
    user: null
  }
}

export const getters = {
  user: state => state.user
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  setUser ({ state, commit }, user) {
    if (state.user) {
      // TODO: remove console
      console.error('User is already logged in') // eslint-disable-line
    } else {
      commit('setUser', user)
    }
  },
  resetUser ({ commit }) {
    commit('setUser', null)
  }
}
