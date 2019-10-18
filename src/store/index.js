import Vue from "vue";
import Vuex from "vuex";
import accountModule from "./modules/account.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account: accountModule
  },
  state: {
    currentUserId: 1,
    currentUserUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    formMode: "login", // login/regiser
    modalForm: {
      target: null,
      taxUuid: null,
      taxName: null,
      isEditing: null
    },
    bookmarks: [
      {
        catId: "c2af908a-df6e-4477-ba28-705be7b7169e",
        desc: "The Vue.js Framework",
        id: "40cfd8b9-b495-4695-803f-71591fe7f38a",
        lastMod: 1568331139234,
        name: "nuxt.js",
        tags: "vue,js,webapps",
        url: "https://nuxtjs.org/",
        userId: "1"
      },

      {
        catId: "ee45f70c-04b8-40ce-b2c2-85f740460363",
        desc: "js ligrary for building user interface",
        id: "8a0fcd2b-e611-4e60-914d-993b353945a2",
        lastMod: 1568306098304,
        name: "react",
        tags: "js,webapps",
        url: "htttps://reactjs.com",
        userId: "1"
      },
      {
        catId: "1a35f916-147f-40e4-b59f-bacffa23d65e",
        desc: "wordpress ecommerce plugin",
        id: "448d536c-79da-478c-8871-fa6bfbb891ef",
        lastMod: 1568306180954,
        name: "woo",
        tags: "wp,woo",
        url: "https://woocommerce.com/",
        userId: "1"
      },
      {
        catId: "1a35f916-147f-40e4-b59f-bacffa23d65e",
        desc: "adobe ecommrece platfrom",
        id: "3b807d7a-9250-4dc8-9ffa-7919c7d116bb",
        lastMod: 1568306204694,
        name: "magento",
        tags: "ecommerce",
        url: "https://magento.com/",
        userId: "1"
      },
      {
        catId: "1a35f916-147f-40e4-b59f-bacffa23d65e",
        desc: "presta",
        id: "64424a4f-611b-4c8a-85e6-1e21ca7c19df",
        lastMod: 1568306257012,
        name: "presta",
        tags: "ecommerce",
        url: "https://www.prestashop.com/en",
        userId: "1"
      },
      {
        catId: "1a35f916-147f-40e4-b59f-bacffa23d65e",
        desc: "shopify",
        id: "6241c44f-1bb4-4679-ad17-40a45900b6ff",
        lastMod: 1568306295976,
        name: "shopify",
        tags: "ecommerce",
        url: "https://www.shopify.com/",
        userId: "1"
      },
      {
        catId: "80f7d9d9-5fe9-4169-bf24-7a10e99401b8",
        desc: "mozilla browser",
        id: "aebc34d4-4d18-4df7-b66b-20177fe093d7",
        lastMod: 1568324721085,
        name: "mozilla",
        tags: "web",
        url: "http://mozilla.org",
        userId: "1"
      }
    ],
    cats: [
      {
        bmarksIds: "",
        catId: "",
        id: "c2af908a-df6e-4477-ba28-705be7b7169e",
        lastMod: 1568306037090,
        name: "vue",
        slug: "vue",
        userId: "1"
      },
      {
        bmarksIds: "",
        catId: "",
        id: "ee45f70c-04b8-40ce-b2c2-85f740460363",
        lastMod: 1568306045773,
        name: "js",
        slug: "js",
        userId: "1"
      },
      {
        bmarksIds: "1,2,3",
        catId: "",
        id: "80f7d9d9-5fe9-4169-bf24-7a10e99401b8",
        lastMod: 1568306139627,
        name: "webdev",
        slug: "wedev",
        userId: "1"
      },
      {
        bmarksIds: "",
        catId: "",
        id: "1a35f916-147f-40e4-b59f-bacffa23d65e",
        lastMod: 1568306148810,
        name: "ecommerce",
        slug: "ecommerce",
        userId: "1"
      }
    ],
    tags: [
      {
        id: "9f4871cf-d88f-4b62-9cd1-76fd24cfd992",
        lastMod: 1568331139234,
        name: "vue",
        slug: "vue",
        tagId: "Id117126",
        userId: "1"
      },
      {
        id: "be9373cb-9b3f-405b-8a44-a77b9a05b35c",
        lastMod: 1568331139234,
        name: "js",
        slug: "js",
        tagId: "Id3401",
        userId: "1"
      },
      {
        id: "a1204839-c2b7-4ef8-89e7-5bc8ca40d937",
        lastMod: 1568331139234,
        name: "webapps",
        slug: "webapps",
        tagId: "Id1223805894",
        userId: "1"
      }
    ]
  },
  mutations: {
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
    changeCurrentUserId(vuexContext, id) {
      vuexContext.commit("SET_USER_ID", id);
    },
    setModalFormData(vuexContext, data) {
      vuexContext.commit("SET_MODAL_FORM_DATA", data);
    }
  }
});
