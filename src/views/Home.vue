<template>
  <div class=" bg-gray-500 h-full">
    <top-nav />
    <main-content />
  </div>
</template>

<script>
import topNav from "@/components/organisms/topNav.vue";
import mainContent from "@/components/templates/mainContent.vue";
export default {
  name: "home",
  components: { mainContent, topNav }
};
</script>
