<template lang="html">
  <section class="top-nav">
    <!--Nav-->
    <nav class="bg-gray-900 px-2 py-4 w-full z-20  ">
      <!-- Three columns -->
      <div class="flex flex-wrap">
        <div class="lg:w-1/3  w-full ">
          <div class="flex">
            <div class="sm:w-1/2 w-full px-2">
              <search-bar />
            </div>
            <div class="sm:w-1/2  w-full px-2">
              <order-select />
            </div>
          </div>
        </div>

        <div class="lg:w-1/3  w-full"></div>
        <div class="lg:w-1/3  w-full "></div>
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
