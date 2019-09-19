<template>
  <div>
    <div class="sm:w-full toolbar">
      <btn class="mx-2" @click="toggleMaodalLogin">Login</btn>
      <btn @click="toggleMaodalRegister">Register</btn>
    </div>
  </div>
</template>

<script>
import btn from "@/components/atoms/btn.vue";

export default {
  components: {
    btn
  },
  methods: {
    toggleMaodalLogin() {
      this.$root.$emit("fireModalLogin", { target: "login" });
    },
    toggleMaodalRegister() {
      this.$root.$emit("fireModalLogin", { target: "register" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
