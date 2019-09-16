import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    currentUserId: 1,
  },
  mutations: {
    SET_USER_ID(state, payload) {
      state.currentUserId = payload;
    }
  },
  getters: {
    getCurrentUserId: state => {
      return state.getCurrentUserId
    }
  },
  actions: {
    changeCurrentUserId(vuexContext, id) {
      vuexContext.commit("SET_USER_ID", id)
    }
  }
})
