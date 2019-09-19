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
    // sort by order
    this.$root.$on("sortItemsByOrder", data => {
      this.$apollo
        .query({
          query: this.prepareSortQuery(data.order)
        })
        .then(result => {
          const tempId = new Date().getTime();
          const items = result.data.bookmarks.map(item => {
            return { bookmark: item };
          });

          let item = {
            name: data.order,
            id: tempId,
            bookmarks_cats: items
          };
          this.bookmarksByCat = [item];
        });
    });

    // search by phrase
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
  methods: {
    prepareSortQuery(key) {
      const map = {
        "date-asc": "{updated_at: asc}",
        "date-desc": "{updated_at: desc}",
        "name-asc": "{name: asc}",
        "name-desc": "{name: desc}"
      };
      const order = map[key];

      const queryString = `
						query getBookmarksByOrder{
							bookmarks(order_by:${order}) {
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

      const query = gql`
        ${queryString}
      `;

      return query;
    }
  }
};
</script>

<style scoped lang="scss">
.listing-cats {
}
</style>
