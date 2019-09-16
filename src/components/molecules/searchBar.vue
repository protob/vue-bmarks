<template lang="html">
  <section class="search-form">
    <div class="ml-auto hidden md:block">
      <div class="filer">
        <h2>filter</h2>
        <input
          v-model="filterPhrase"
          class="form-input border border-black p-2"
          type="text"
          @input="filterItems"
        />

        <h2>Filter phrase:</h2>
        <div>{{ filterPhrase }}</div>
      </div>
    </div>
  </section>
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
