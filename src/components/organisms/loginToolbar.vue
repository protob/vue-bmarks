<template>
  <div>
    <div class="sm:w-full toolbar">
      <btn v-if="isLoggedIn" class="mx-2" @click="logout()">Logout</btn>
      <btn v-if="!isLoggedIn" class="mx-2" @click="login()">Login</btn>
    </div>
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
