export const auth = {
  state: {
    auth: false,
    username: '',
    popup: false
  },
  actions: {
    setAuth({ commit }, isAuth) {
      commit('SET_AUTH', isAuth)
    },
    setUsername({ commit }, username) {
      commit('SET_USERNAME', username)
    }
  },
  mutations: {
    SET_AUTH(state, isAuth) {
      state.auth = isAuth
    },
    SET_USERNAME(state, username) {
      state.username = username
    },
    SET_POPUP(state, popup) {
      state.popup = popup
    }
  },
  getters: {
    auth: state => state.auth,
    username: state => state.username,
    popup: state => state.popup
  }
}
