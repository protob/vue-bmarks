<template>
  <loader />
</template>

<script>
import loader from "@/components/atoms/loader.vue";

export default {
  name: "Callback",
  components: {
    loader
  },
  mounted() {
    this.$store.dispatch("account/handleAuthenticationResponse");
  }
};
</script>

<style scoped></style>
