<template lang="html">
  <section class="top-nav">
    <!--Nav-->
    <nav
      class="bg-gray-900 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto  w-full z-20 top-0 "
    >
      <!-- Three columns -->
      <div class="flex mb-4">
        <div class="w-1/3 bg-gray-400 ">
          <div class="flex mb-4">
            <div class="w-1/2 ">
              <search-bar />
            </div>
            <div class="w-1/2 ">
              <order-select />
            </div>
          </div>
        </div>

        <div class="w-1/3 bg-gray-500 "></div>
        <div class="w-1/3 bg-gray-400 "></div>
      </div>
    </nav>
  </section>
</template>

<script>
import searchBar from "@/components/molecules/searchBar.vue";
import orderSelect from "@/components/molecules/orderSelect.vue";
export default {
  name: "TopNav",
  components: {
    searchBar,
    orderSelect
  },
  props: [],
  data() {
    return {
      filterPhrase: ""
    };
  },

  computed: {},
  mounted() {},
  methods: {
    filterItems() {
      this.$root.$emit("filterItemsByPhrase", { phrase: this.filterPhrase });
    }
  }
};
</script>

<style scoped lang="scss">
.top-nav * {
  color: white;
}
</style>
