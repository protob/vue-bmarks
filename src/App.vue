<template>
  <div id="app">
    <router-view />

    <modal-confirm />
    <modal-form />
  </div>
</template>

<style lang="scss"></style>

<script>
// src/App.vue

import modalConfirm from "@/components/organisms/modalConfirm.vue";
import modalForm from "@/components/organisms/modalForm.vue";
import * as jwt_decode from "jwt-decode";
import { ADD_USER, GET_USER_BY_ID } from "@/queries/user.js";
const uuidv4 = require("uuid/v4");
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    modalConfirm,
    modalForm
  },
  data() {
    return {
      isLoading: true
    };
  },

  computed: {
    ...mapGetters(["getCurrentUserUuid", "getCurrentUserId"]),
    ...mapState("account", {
      user: "user",
      token: "token"
    })
  },

  watch: {
    token() {
      this.syncUser();
    }
  },
  mounted() {
    this.setUserUuid();
  },
  methods: {
    setUserUuid() {
      const userId = localStorage.userId;

      if (userId) {
        this.$store.dispatch("changeCurrentUserId", userId);

        this.$apollo
          .query({
            query: GET_USER_BY_ID,
            variables: {
              userId: userId
            }
          })
          .then(result => {
            if (result.data.users.length) {
              const userUuid = result.data.users[0].uuid;
              this.$store.dispatch("changeCurrentUserUuid", userUuid);
              localStorage.userUuid = userUuid;
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    },

    syncUser() {
      if (this.token) {
        const obj = jwt_decode(this.token);
        const userUuid = uuidv4();

        this.$store.dispatch("changeCurrentUserUuid", userUuid);
        this.$store.dispatch("changeCurrentUserId", obj.sub);
        localStorage.userUuid = userUuid;
        localStorage.userId = obj.sub;
        const data = {
          uuid: userUuid, //,
          email: obj.email,
          name: obj.nickname,
          userId: obj.sub,
          id: obj.sub,
          slug: obj.nickname,
          username: obj.nickname
        };

        //changeCurrentUserId(vuexContext, id) {
        this.$apollo
          .query({
            query: GET_USER_BY_ID,
            variables: {
              userId: obj.sub
            }
          })
          .then(result => {
            if (result.data.users.length === 0) {
              this.$apollo
                .mutate({
                  mutation: ADD_USER,
                  variables: data
                  // refetchQueries: [query]
                })
                .then(data => {
                  // eslint-disable-next-line no-console
                  console.log(data);
                })
                .catch(error => {
                  // eslint-disable-next-line no-console
                  console.log(error);
                });
            } else {
              this.setUserUuid();
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.segment {
  min-height: 100vh;
}
</style>
