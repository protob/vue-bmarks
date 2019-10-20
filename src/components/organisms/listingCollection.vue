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
const GET_ALL_BOOKMARKS_BY_CAT = gql`
  query getAllBookmarksByCat {
    cats {
      name
      uuid
      bookmarks_cats {
        bookmark {
          uuid
          name
          slug
          desc
          updated_at
          url
          user {
            uuid
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

const GET_BOOKMARKS_BY_CAT = gql`
  query getBookmarksByCat($uuid: uuid!) {
    cats(where: { uuid: { _eq: $uuid } }) {
      name
      uuid
      bookmarks {
        name
        uuid
        userUuid
        url
        desc
        updated_at
        slug
        bookmarks_tags {
          tag {
            uuid
            name
            slug
            uuid
          }
        }
      }
    }
  }
`;

const GET_BOOKMARKS_BY_TAG = gql`
  query getBookmarksByTag($uuid: uuid!) {
    tags(where: { uuid: { _eq: $uuid } }) {
      name
      slug
      uuid
      bookmarks_tags {
        bookmark {
          desc
          uuid
          name
          slug
          url
          desc
          updated_at
          uuid
          bookmarks_tags {
            tag {
              updated_at
              slug
              name
              uuid
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
      uuid
      name
      slug
      updated_at
      url
      desc
      user {
        uuid
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
      query: GET_ALL_BOOKMARKS_BY_CAT,
      update: data => data.cats
    }
  },

  computed: {},
  mounted() {
    // items by cat

    this.$root.$on("filterItemsByCat", data => {
      const uuid = data.uuid;
      const tagName = data.name;

      this.$apollo
        .query({
          query: GET_BOOKMARKS_BY_CAT,
          variables: {
            uuid
          },
          fetchPolicy: "no-cache"
        })
        .then(result => {
          const tempId = new Date().getTime();
          const cats = result.data.cats;

          const catItems = cats[0].bookmarks; // currently single cat filter is supported
          const formattedItems = catItems.map(el => {
            return { bookmark: el };
          });
          let item = {
            name: tagName,
            id: tempId,
            bookmarks_cats: formattedItems
          };

          this.bookmarksByCat = [item];
        });
    });

    //items by tag

    this.$root.$on("filterItemsByTag", data => {
      const uuid = data.uuid;
      const tagName = data.name;

      this.$apollo
        .query({
          query: GET_BOOKMARKS_BY_TAG,
          variables: {
            uuid
          }
        })
        .then(result => {
          const tempId = new Date().getTime();
          const tags = result.data.tags;

          const tagItems = tags[0].bookmarks_tags; // currently single tag filter is supported
          let item = {
            name: tagName,
            id: tempId,
            bookmarks_cats: tagItems
          };

          this.bookmarksByCat = [item];
        });
    });

    // sort by order
    this.$root.$on("sortItemsByOrder", data => {
      this.$apollo
        .query({
          query: this.prepareSortQuery(data.order)
        })
        .then(result => {
          const tempId = new Date().getTime();
          const items = result.data.bookmarks.map(el => {
            return { bookmark: el };
          });

          let item = {
            name: data.order,
            uuid: tempId,
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
            query: GET_ALL_BOOKMARKS_BY_CAT
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
          const tempId = new Date().getTime();
          const items = result.data.bookmarks.map(el => {
            return { bookmark: el };
          });

          let item = {
            name: phrase,
            uuid: tempId,
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
								uuid
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
