<template>
  <div id="app">
    <router-view />
    <login-form />
    <add-cat-form />
    <add-tag-form />
    <add-bookmark-form />
    <modal-confirm />
  </div>
</template>

<style lang="scss"></style>

<script>
// src/App.vue
import addBookmarkForm from "@/components/organisms/forms/addBookmarkForm.vue";
import addCatForm from "@/components/organisms/forms/addCatForm.vue";
import addTagForm from "@/components/organisms/forms/addTagForm.vue";
import loginForm from "@/components/organisms/forms/loginForm.vue";
import modalConfirm from "@/components/organisms/modalConfirm.vue";
export default {
  components: {
    addCatForm,
    addTagForm,
    addBookmarkForm,
    modalConfirm,
    loginForm
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
