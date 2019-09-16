<template lang="html">
  <div class="order-toolbar w-full">
    <div class="relative">
      <select
        id="grid-state"
        v-model="selected"
        class="block
				border-black
				appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8
				rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        @change="onChange($event)"
      >
        <option value="" selected disabled hidden>Sort By:</option>
        <option value="name-asc">Name ASC</option>
        <option value="name-desc">Name DESC</option>
        <option value="date-asc">Date ASC</option>
        <option value="date-desc">Date DESC</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class=" h-4 w-4 fill-current "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            stroke="black"
            fill="black"
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderSelect",
  props: [],
  data() {
    return {
      selected: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onChange(event) {
      const order = event.target.value;
      this.sortItems(order);
    },
    sortItems(order) {
      this.$root.$emit("sortItemsByOrder", { order: order });
    }
  }
};
</script>

<style scoped lang="scss">
.order-select {
}
</style>
