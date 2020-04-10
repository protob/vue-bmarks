import { authService } from '@/services/auth/AuthService'
import router from '@/router'

const user = authService.getUserId()
const state = user
  ? { status: { loggedIn: true }, user, token: '' }
  : { status: {}, user: null, token: '' }

const actions = {
  addToken({ commit }, token) {
    commit('addToken', token)
  },

  login({ commit }) {
    commit('loginRequest', user)
    authService.login()
  },

  syncUser() {},

  async handleAuthenticationResponse({ dispatch, commit }) {
    try {
      const userInfo = await authService.handleAuthentication()
      commit('loginSuccess', userInfo)
      const userData = JSON.parse(localStorage.user_info)
      const token = userData.idToken
      if (token) {
        commit('addToken', token)
      }

      router.push({ path: authService.getReturnUrl() })
    } catch (error) {
      authService.logout()
      commit('loginFailure', error)
      router.push({ path: '/' })
      dispatch('alert/error', error, { root: true })
    }
  },
  logout({ commit }) {
    authService.logout()
    commit('logout')

    router.push('/')
  }
}

const mutations = {
  addToken(state, token) {
    state.token = token
  },

  loginRequest(state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure(state) {
    state.status = {}
    state.user = null
  },
  logout(state) {
    state.status = {}
    state.user = null
  }
}

const getters = {
  getUser(state) {
    return state.user && authService.getUserId()
  },
  getReturnUrl(state, getters) {
    return getters['getUser'] && authService.getReturnUrl()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
