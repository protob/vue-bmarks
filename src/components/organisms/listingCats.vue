<template lang="html">
  <div class="listing-cats">
    <div class="lisitng-head bg-blue-700 flex justify-between p-4">
      <h2 class="text-white py-2 font-bold uppercase">Categories</h2>
      <div class="toolbar"><btn class="mx-2">+1</btn> <btn>all</btn></div>
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
  methods: {}
};
</script>

<style scoped lang="scss">
.listing-cats {
}
</style>
