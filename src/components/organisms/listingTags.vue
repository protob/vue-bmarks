<template lang="html">
  <div class="listing-tags">
    <div
      class="lisitng-head bg-blue-700 flex xxl:flex-no-wrap flex-wrap justify-between p-4"
    >
      <h2 class="sm:w-full text-white py-2 font-bold uppercase">Tags</h2>
      <div class="sm:w-full toolbar">
        <btn class="mx-2">+1</btn> <btn>all</btn>
      </div>
    </div>
    <div class="lising-items">
      <taxonamy-item
        v-for="item in getTags"
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
  name: "ListingTags",
  components: {
    btn,
    taxonamyItem
  },
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
    ...mapGetters(["getTags"])
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.listing-tags {
}
</style>
