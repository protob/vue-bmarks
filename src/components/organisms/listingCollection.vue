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

const GET_BOOKMARKS_BY_PHRASE = gql`
  query getBookmarksByPhrase($phrase: String!) {
    bookmarks(
      where: {
        _or: [
          { name: { _ilike: $phrase } }
          { desc: { _ilike: $phrase } }
          { url: { _like: $phrase } }
        ]
      }
    ) {
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
  mounted() {
    this.$root.$on("filterItemsByPhrase", data => {
      const phrase = data.phrase;
      if (!phrase) {
        this.$apollo
          .query({
            query: GET_BOOKMARKS_BY_CAT
          })
          .then(result => {
            this.bookmarksByCat = result.data.cats;
          });
        return false;
      }

      const queryName = "%" + phrase + "%";
      this.$apollo
        .query({
          query: GET_BOOKMARKS_BY_PHRASE,
          variables: {
            phrase: queryName
          }
        })
        .then(result => {
          console.log(result);
          const tempId = new Date().getTime();
          const items = result.data.bookmarks.map(item => {
            return { bookmark: item };
          });
          console.log(items);
          let item = {
            name: phrase,
            id: tempId,
            bookmarks_cats: items
          };

          this.bookmarksByCat = [item];
        });
    });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.listing-cats {
}
</style>
