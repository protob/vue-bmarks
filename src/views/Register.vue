<template>
  <div class="h-full">
    <top-nav />

    <div class="form-wrap flex justify-center">
      <div class="bg-gray-200 shadow-md rounded form-panel mt-16">
        <div
          class="form-head bg-blue-700 px-8 py-4 text-white font-bold text-center"
        >
          <h1 class="capitalize">Register Form</h1>
        </div>

        <div class="px-8 pt-6 pb-8 mb-4">
          <RegisterForm :formid="'registerForm'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/organisms/topNav.vue";

import FormBuilder from "@/builders/FormBuilder";
import FormDirector from "@/builders/FormDirector";
export default {
  name: "Home",
  components: {
    topNav,
    RegisterForm: new FormDirector(new FormBuilder()).makeRegisterForm()
  }
};
</script>
