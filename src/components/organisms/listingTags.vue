<template lang="html">
  <div class="listing-tags">
    <div
      class="lisitng-head bg-blue-700 flex xxl:flex-no-wrap flex-wrap justify-between p-4"
    >
      <h2 class="sm:w-full text-white py-2 font-bold uppercase">Tags</h2>
      <div class="sm:w-full toolbar">
        <btn class="mx-2" @click="toggleModalAddTag">+1</btn>

        <btn>all</btn>
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
  methods: {
    toggleModalAddTag() {
      const data = {
        id: "c2af908a-df6e-4477-ba28-705be7b7169e",
        userId: "1",
        slug: "vue",
        name: "vue",
        lastMod: 1568306037090
      };
      this.$root.$emit("fireModalAddTag", data);
    },

    showAllTags() {
      this.$root.$emit("showAllTags");
    },

    toggleModalEditTag(tagId, tagName) {
      const data = {
        tagId: tagId,
        tagName: tagName
      };

      this.$root.$emit("fireModalAddTag", data);
    },
    toggleModalDelTag(tagId, tagName) {
      this.$root.$emit("fireModalDelTag", {
        tagId: tagId,
        tagName: tagName
      });
    },
    filterItemsByTag(tagId, tagName) {
      const data = {
        tagId: tagId,
        tagName: tagName
      };
      this.$root.$emit("filterItemsByTag", data);
    }
  }
};
</script>

<style scoped lang="scss">
.listing-tags {
}
</style>
