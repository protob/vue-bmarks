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

import gql from "graphql-tag";
const ADD_USER = gql`
  mutation AddUser(
    $uuid: uuid!
    $username: String!
    $email: String!
    $id: String!
    $userId: String!
    $name: String!
    $slug: String!
  ) {
    insert_users(
      objects: {
        uuid: $uuid
        username: $username
        email: $email
        id: $id
        userId: $userId
        name: $name
        slug: $slug
      }
      on_conflict: { constraint: users_pkey, update_columns: username }
    ) {
      returning {
        uuid
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
    users(where: { userId: { _eq: $userId } }) {
      name
      uuid
    }
  }
`;

const uuidv4 = require("uuid/v4");
import { mapState } from "vuex";
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
    //   this.$root.$on("syncUser", () => { }
  },
  methods: {
    syncUser() {
      if (this.token) {
        const obj = jwt_decode(this.token);

        const data = {
          uuid: uuidv4(), //,
          email: obj.email,
          name: obj.nickname,
          userId: obj.sub,
          id: obj.sub,
          slug: obj.nickname,
          username: obj.nickname
        };

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
              // eslint-disable-next-line no-console
              console.log("user exist");
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
