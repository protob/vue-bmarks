<template lang="html">
  <aside class="sidebar">
    <listing-cats />
    <listing-tags />
  </aside>
</template>

<script>
import listingCats from "@/components/organisms/listingCats.vue";
import listingTags from "@/components/organisms/listingTags.vue";
export default {
  name: "Sidebar",
  components: {
    listingCats,
    listingTags
  },
  props: [],
  data() {
    return {};
  },
  computed: {},

  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.sidebar {
}
</style>
