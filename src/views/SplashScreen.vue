<template>
  <div class="bg-gray-500 h-full">
    <top-nav />
    <placeholder />
  </div>
</template>

<script>
import topNav from "@/components/organisms/topNav.vue";
import placeholder from "@/components/templates/placeholder.vue";
export default {
  name: "Home",
  components: { placeholder, topNav }
};
</script>
