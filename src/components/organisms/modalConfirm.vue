<template>
  <div
    ref="modal-del-item"
    class="modal-container modal opacity-0 pointer-events-none absolute w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"
      @click="toggleModal"
    ></div>

    <div
      class="form-1 absolute h-32 rounded-sm shadow-lg flex items-center justify-center text-2xl"
    >
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="mb-6">
          <h1>
            Delete {{ itemData.taxName }}
            <span v-if="itemData.target == 'cat'">and its links.</span>
            <span v-else-if="itemData.target == 'tag'"
              >and remove it from links</span
            >
            <br />Are you sure?
          </h1>
        </div>

        <div class="flex items-center justify-between">
          <btn :type="'small'" @click="deleteItem">Ok</btn>
          <btn :type="'small'" @click="toggleModal">Cancel</btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import gql from "graphql-tag";

const DELETE_BOOKMARK = gql`
  mutation DeleteBookmarks($uuid: uuid!) {
    delete_bookmarks_cats(where: { bookmarkUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        catUuid
      }
    }
    delete_bookmarks_tags(where: { bookmarkUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        tagUuid
      }
    }
    delete_bookmarks(where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

const DELETE_CAT = gql`
  mutation DeleteCats($uuid: uuid!) {
    delete_bookmarks_cats(where: { catUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        catUuid
      }
    }

    delete_bookmarks(where: { catUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        catUuid
      }
    }

    delete_cats(where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTags($uuid: uuid!) {
    delete_bookmarks_tags(where: { tagUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        tagUuid
      }
    }

    delete_tags(where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

// const DELETE_BOOKMARKS_TAGS = gql`
//   mutation DeleteTags($objects: [bookmarks_tags_insert_input!]!) {
//     delete_bookmarks_tags(where: { bookmarkUuid: { _nin: $objects } }) {
//       affected_rows
//       returning {
//         tagUuid
//       }
//     }
//   }
// `;

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
import btn from "@/components/atoms/btn.vue";
export default {
  components: {
    btn
  },
  data() {
    return {
      itemId: null,

      itemData: {
        target: "",
        taxName: "",
        taxUuid: ""
      }
    };
  },
  mounted() {
    this.$root.$on("fireConfirm", data => {
      // console.log(data);
      this.toggleModal();
      this.itemData = data;
    });
  },

  methods: {
    prepareDeleteBookmarksTagsQuery(arr) {
      const queryString = `mutation DeleteTags{delete_bookmarks_tags(where: {bookmarkUuid:{
				_in: ${JSON.stringify(arr)}
			}}) {
						affected_rows
							returning {
								tagUuid
							}
						}
					}
					`;

      const query = gql`
        ${queryString}
      `;

      return query;
    },

    generateBookmarkTagMap() {
      const uuid = this.itemData.taxUuid;
      this.$apollo
        .query({
          query: GET_BOOKMARKS_BY_CAT,
          variables: {
            uuid
          }
        })
        .then(result => {
          const cats = result.data.cats;

          const catItems = cats[0].bookmarks; // currently single cat filter is supported
          const formattedItems = catItems.map(el => {
            return { bookmark: el };
          });
          let tempItem = {
            name: this.itemData.name,
            bookmarks_cats: formattedItems
          };

          let o = {};
          tempItem.bookmarks_cats.forEach(item => {
            const tags = item.bookmark.bookmarks_tags;
            if (tags) {
              const arr = tags.map(el => {
                return {
                  uuid: el.tag.uuid
                };
              });
              if (arr.length) {
                o[item.bookmark.uuid] = arr;
              }
            }
          });

          this.deleteBookmarks(o);
        });
    },
    deleteCat() {
      const uuid = this.itemData.taxUuid;
      const MUTATION = this.itemData.target == "cat" ? DELETE_CAT : DELETE_TAG;
      const taxQuery = this.itemData.target == "cat" ? "getCats" : "getTags";

      this.$apollo
        .mutate({
          mutation: MUTATION,
          variables: {
            uuid
          },
          refetchQueries: [taxQuery, "getAllBookmarksByCat"]
        })

        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });

      this.toggleModal();
    },
    deleteBookmarks(bookmarkTagsMap) {
      // const uuid = this.itemData.taxUuid;
      const bookmarksUuids = Object.keys(bookmarkTagsMap);

      const taxQuery = this.itemData.target == "cat" ? "getCats" : "getTags";

      const DELETE_BOOKMARKS_TAGS = this.prepareDeleteBookmarksTagsQuery(
        bookmarksUuids
      );

      this.$apollo
        .mutate({
          mutation: DELETE_BOOKMARKS_TAGS,

          refetchQueries: [taxQuery, "getAllBookmarksByCat"]
        })

        .then(output => {
          // eslint-disable-next-line no-console
          console.log(output.data);
          this.deleteCat();
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    deleteItem() {
      const uuid = this.itemData.taxUuid;

      if (this.itemData.target == "bookmark") {
        this.$apollo
          .mutate({
            mutation: DELETE_BOOKMARK,
            variables: {
              uuid
            },
            refetchQueries: ["getCats", "getTags", "getAllBookmarksByCat"]
          })

          .then(data => {
            // eslint-disable-next-line no-console
            console.log(data);
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
        this.toggleModal();
      } else {
        //TAG tags
        const MUTATION =
          this.itemData.target == "cat" ? DELETE_CAT : DELETE_TAG;
        const taxQuery = this.itemData.target == "cat" ? "getCats" : "getTags";

        if (this.itemData.target == "cat") {
          // CAT MUTATION
          this.generateBookmarkTagMap();
        } else {
          //TAG MUTAITON
          this.$apollo
            .mutate({
              mutation: MUTATION,
              variables: {
                uuid
              },
              refetchQueries: [taxQuery, "getAllBookmarksByCat"]
            })

            .then(data => {
              // eslint-disable-next-line no-console
              console.log(data);
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
          this.toggleModal();
        }
      }
    },

    toggleModal() {
      const modal = this.$refs["modal-del-item"];

      modal.classList.toggle("opacity-0");
      modal.classList.toggle("pointer-events-none");
    }
  }
};
</script>
