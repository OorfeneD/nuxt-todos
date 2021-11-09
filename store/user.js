export const state = () => {
  return {
    data: null,
    token: null
  }
}

export const getters = {
  isLoggedIn: state => !!(state.data && state.token),
  user: state => state.data,
  token: state => state.token
}

export const mutations = {
  setUser (state, data) {
    state.data = data
  },
  setToken (state, data) {
    state.token = data
  }
}

export const actions = {
  async setUser ({ getters, commit }, user) {
    if (getters.isLoggedIn) {
      // TODO: remove console
      console.error('User is already logged in') // eslint-disable-line
    } else {
      await commit('setUser', user)
    }
  },
  async setToken ({ commit }, token) {
    await commit('setToken', token)
  },
  async resetUser ({ commit }) {
    await commit('setUser', null)
    await commit('setToken', null)
  }
}
