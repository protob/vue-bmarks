<template>
  <div id="app">
    <router-view />
    <modal-confirm />
    <modal-form />
  </div>
</template>

<style lang="scss"></style>

<script>
import UserService from "@/services/user.service.js";
import modalConfirm from "@/components/organisms/modalConfirm.vue";
import modalForm from "@/components/organisms/modalForm.vue";

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
      UserService.setUserUuid(this.$store, this.$apollo);
    },

    syncUser() {
      UserService.syncUser(this.$store, this.$apollo, this.token);
    }
  }
};
</script>

<style lang="scss">
.segment {
  min-height: 100vh;
}
</style>
