<template lang="html">
  <div class="listing-tags">
    <div
      class="lisitng-head bg-blue-700 flex xxl:flex-no-wrap flex-wrap justify-between p-4"
    >
      <h2 class="sm:w-full text-white py-2 font-bold uppercase">Tags</h2>
      <div class="sm:w-full toolbar">
        <btn class="mx-2" @click="openModal('tag')">+1</btn>

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
const GET_TAGS = gql`
  query getTags {
    tags(order_by: { name: asc }) {
      uuid
      name
      slug
    }
  }
`;

export default {
  name: "ListingTags",
  components: {
    btn,
    taxonamyItem
  },
  props: [],

  data() {
    return {
      items: []
    };
  },

  apollo: {
    items: {
      query: GET_TAGS,
      update: data => data.tags
    }
  },

  computed: {},
  mounted() {},
  methods: {
    openModal(target) {
      this.$root.$emit("fireModal", { target });
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
