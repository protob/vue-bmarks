<template>
  <div>
    <div class="sm:w-full toolbar">
      <btn class="mx-2" @click="openModal('login')">Login</btn>
      <btn @click="openModal('register')">Register</btn>
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
    openModal(target) {
      this.$root.$emit("fireModal", { target });
    }
  }
};
</script>

<style lang="scss" scoped></style>
