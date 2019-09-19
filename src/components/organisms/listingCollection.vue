<template lang="html">
  <div class="lising-items">
    <collection-item
      v-for="item in bookmarksByCat"
      :key="item.uuid"
      :item="item"
      class="item"
    >
    </collection-item>
  </div>
</template>

<script>
import collectionItem from "@/components/molecules/collectionItem.vue";

import gql from "graphql-tag";
const GET_BOOKMARKS_BY_CAT = gql`
  query getBookmarksByCat {
    cats {
      name
      uuid
      bookmarks_cats {
        bookmark {
          id
          name
          slug
          updated_at
          url
          user {
            id
          }
          bookmarks_tags {
            tag {
              uuid
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export default {
  name: "ListingCats",
  components: { collectionItem },
  props: [],

  data() {
    return {
      bookmarksByCat: []
    };
  },

  apollo: {
    bookmarksByCat: {
      query: GET_BOOKMARKS_BY_CAT,
      update: data => data.cats
    }
  },

  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.listing-cats {
}
</style>
