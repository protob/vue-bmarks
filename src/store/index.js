import Vue from "vue";
import Vuex from "vuex";
import accountModule from "./modules/account.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account: accountModule
  },
  state: {
    currentUserId: null,
    currentUserUuid: null,
    formMode: "login", // login/regiser
    modalForm: {
      target: null,
      taxUuid: null,
      taxName: null,
      isEditing: null
    },
    bookmarks: [],
    cats: [],
    tags: []
  },
  mutations: {
    SET_USER_UUID(state, payload) {
      state.currentUserUuid = payload;
    },
    SET_USER_ID(state, payload) {
      state.currentUserId = payload;
    },
    SET_MODAL_FORM_DATA(state, payload) {
      state.modalForm = payload;
    },
    SET_FORM_MODE(state, payload) {
      state.formMode = payload;
    }
  },
  getters: {
    getCurrentUserId: state => {
      return state.currentUserId;
    },
    getCurrentUserUuid: state => {
      return state.currentUserUuid;
    },
    getItems: state => {
      return state.bookmarks;
    },
    getCats: state => {
      return state.cats;
    },
    getTags: state => {
      return state.tags;
    },
    getModalForm: state => {
      return state.modalForm;
    },
    getFormMode: state => {
      return state.formMode;
    }
  },
  actions: {
    changeFormMode(vuexContext, payload) {
      vuexContext.commit("SET_FORM_MODE", payload.mode);
    },
    changeCurrentUserUuid(vuexContext, id) {
      vuexContext.commit("SET_USER_UUID", id);
    },
    changeCurrentUserId(vuexContext, id) {
      vuexContext.commit("SET_USER_ID", id);
    },
    setModalFormData(vuexContext, data) {
      vuexContext.commit("SET_MODAL_FORM_DATA", data);
    }
  }
});
