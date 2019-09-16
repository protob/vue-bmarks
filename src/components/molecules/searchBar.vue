<template lang="html">
  <div class="search-form">
    <div class="ml-auto md:block">
      <div class="filer">
        <input
          v-model="filterPhrase"
          placeholder="Search"
          class="appearance-none placeholder-black block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          @input="filterItems"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
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
.search-form {
}
</style>
