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
  mounted() {}
};
</script>

<style lang="scss">
.segment {
  min-height: 100vh;
}
</style>
