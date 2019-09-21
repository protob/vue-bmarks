<template lang="html">
  <div class="listing-cats">
    <div
      class="lisitng-head bg-blue-700 flex xxl:flex-no-wrap flex-wrap justify-between p-4"
    >
      <h2 class="sm:w-full text-white py-2 font-bold uppercase">Categories</h2>
      <div class="sm:w-full toolbar">
        <btn class="mx-2" @click="openModal('cat')">+1</btn>
        <btn>all</btn>
      </div>
    </div>
    <div class="lising-items">
      <taxonamy-item
        v-for="item in items"
        :key="item.uuid"
        :item="item"
        class="item"
      >
      </taxonamy-item>
    </div>
  </div>
</template>

<script>
import btn from "@/components/atoms/btn.vue";
import taxonamyItem from "@/components/molecules/taxonomyItem.vue";

import gql from "graphql-tag";
const GET_CATS = gql`
  query getCats {
    cats(order_by: { name: asc }) {
      uuid
      name
      slug
    }
  }
`;

export default {
  name: "ListingCats",
  components: { btn, taxonamyItem },
  props: [],

  data() {
    return {
      items: []
    };
  },
  apollo: {
    items: {
      query: GET_CATS,
      update: data => data.cats
    }
  },

  computed: {},
  mounted() {},
  methods: {
    openModal(target) {
      this.$root.$emit("fireModal", { target });
    },

    showAllCats() {
      this.$root.$emit("showAllCats");
    },

    filterItemsByCat(catId, catName) {
      const data = {
        catId: catId,
        catName: catName
      };

      this.$root.$emit("filterItemsByCat", data);
    }
  }
};
</script>

<style scoped lang="scss">
.listing-cats {
}
</style>
