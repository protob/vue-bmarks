<template>
  <div>
    <div class="sm:w-full toolbar">
      <btn class="mx-2" @click="openModal('login')">Login</btn>
      <btn @click="openModal('register')">Register</btn>
    </div>

    <ul class="navbar-nav ml-auto">
      <li v-if="isLoggedIn" class="nav-item">
        <a href class="nav-link" @click.prevent="logout()">Logout</a>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <a href class="nav-link" @click.prevent="login()">Login</a>
      </li>
    </ul>
  </div>
</template>

<script>
import btn from "@/components/atoms/btn.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    btn
  },
  computed: {
    isLoggedIn() {
      return this.getUser();
    }
  },
  methods: {
    ...mapGetters("account", { getUser: "getUser" }),
    logout() {
      this.$store.dispatch("account/logout");
    },
    login() {
      this.$store.dispatch("account/login");
    },

    openModal(target) {
      this.$root.$emit("fireModal", { target });
    }
  }
};
</script>

<style lang="scss" scoped></style>
