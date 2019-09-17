<template lang="html">
  <div class="listing-cats">
    <div
      class="lisitng-head bg-blue-700 flex xxl:flex-no-wrap flex-wrap justify-between p-4"
    >
      <h2 class="sm:w-full text-white py-2 font-bold uppercase">Categories</h2>
      <div class="sm:w-full toolbar">
        <btn class="mx-2" @click="toggleModalAddCat">+1</btn>
        <btn>all</btn>
      </div>
    </div>
    <div class="lising-items">
      <taxonamy-item
        v-for="item in getCats"
        :key="item.id"
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
import { mapGetters } from "vuex";
export default {
  name: "ListingCats",
  components: { btn, taxonamyItem },
  props: [],

  data() {
    return {
      fakeitems: [...Array(6).keys()].map(i => ({
        id: i + 1,
        name: "Item " + (i + 1)
      }))
    };
  },
  computed: {
    ...mapGetters(["getCats"])
  },
  mounted() {},
  methods: {
    toggleModalAddCat() {
      const data = {
        id: "c2af908a-df6e-4477-ba28-705be7b7169e",
        userId: "1",
        slug: "vue",
        name: "vue",
        lastMod: 1568306037090
      };

      this.$root.$emit("fireModalAddCat", data);
    },

    showAllCats() {
      this.$root.$emit("showAllCats");
    },

    toggleModalEditCat(catId, catName) {
      const data = {
        catId: catId,
        catName: catName
      };
      this.$root.$emit("fireModalAddCat", data);
    },
    toggleModalDelCat(catId) {
      this.$root.$emit("fireModalDelCat", {
        catId: catId
      });
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
