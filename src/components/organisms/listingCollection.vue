<template lang="html">
  <div class="lising-items">
    <collection-item
      v-for="item in getCats"
      :key="item.id"
      :item="item"
      class="item"
    >
    </collection-item>
  </div>
</template>

<script>
import collectionItem from "@/components/molecules/collectionItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "ListingCats",
  components: { collectionItem },
  props: [],

  data() {
    return {};
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
