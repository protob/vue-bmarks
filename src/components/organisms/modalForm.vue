<template lang="html">
  <div
    ref="modal-login"
    class="modal-container modal opacity-0 pointer-events-none absolute w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"
      @click="toggleModal"
    ></div>

    <div
      class="modal-panel form-1 absolute h-32 rounded-sm shadow-lg flex items-center justify-center text-2xl"
    >
      <div class="bg-gray-200 shadow-md rounded flex flex-col">
        <div
          class="form-head bg-blue-700 px-8 py-4 text-white font-bold text-center"
        >
          <h1 class="capitalize">{{ target }} Form</h1>
        </div>

        <div class=" px-8 pt-6 pb-8 mb-4 ">
          <LoginForm v-if="target == 'login'" :formid="'loginForm'" />
          <RegisterForm
            v-else-if="target == 'register'"
            :formid="'registerForm'"
          />
          <CatForm v-else-if="target == 'cat'" :formid="'catForm'" />
          <TagForm v-else-if="target == 'tag'" :formid="'tagForm'" />
          <BookmarkForm v-else :formid="'bookmarkForm'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormBuilder from "@/builders/FormBuilder";
import FormDirector from "@/builders/FormDirector";
import gql from "graphql-tag";
// import { InMemoryCache } from "apollo-cache-inmemory";
import { mapGetters } from "vuex";
const slugify = require("slugify");
const uuidv4 = require("uuid/v4");
const ADD_CAT = gql`
  mutation AddCat($name: String!, $slug: String!, $userUuid: uuid!) {
    insert_cats(objects: [{ name: $name, slug: $slug, userUuid: $userUuid }]) {
      returning {
        uuid
      }
    }
  }
`;
const ADD_TAG = gql`
  mutation AddTag($name: String!, $slug: String!, $userUuid: uuid!) {
    insert_tags(objects: [{ name: $name, slug: $slug, userUuid: $userUuid }]) {
      returning {
        uuid
      }
    }
  }
`;

const ADD_TAGS = gql`
  mutation upsertTags($objects: [tags_insert_input!]!) {
    insert_tags(
      objects: $objects
      on_conflict: { constraint: tags_pkey, update_columns: updated_at }
    ) {
      affected_rows
      returning {
        uuid
        name
      }
    }
  }
`;

const ADD_BOOKMARK = gql`
  mutation AddBookmark(
    $bookmarkUuid: uuid!
    $userUuid: uuid!
    $name: String!
    $slug: String!
    $url: String!
    $desc: String!
    $catUuid: uuid!
    $tags: [bookmarks_tags_insert_input!]!
  ) {
    insert_bookmarks(
      objects: [
        {
          uuid: $bookmarkUuid
          name: $name
          slug: $slug
          url: $url
          desc: $desc
          userUuid: $userUuid
          catUuid: $catUuid
        }
      ]
    ) {
      affected_rows
      returning {
        name
        uuid
      }
    }
    insert_bookmarks_cats(
      objects: { bookmarkUuid: $bookmarkUuid, catUuid: $catUuid }
    ) {
      returning {
        bookmarkUuid
        catUuid
      }
    }

    insert_bookmarks_tags(objects: $tags) {
      returning {
        bookmarkUuid
        tagUuid
      }
    }
  }
`;

export default {
  name: "AddTagForm",
  components: {
    LoginForm: new FormDirector(new FormBuilder()).makeLoginForm(),
    RegisterForm: new FormDirector(new FormBuilder()).makeRegisterForm(),
    CatForm: new FormDirector(new FormBuilder()).makeCatForm(),
    TagForm: new FormDirector(new FormBuilder()).makeTagForm(),
    BookmarkForm: new FormDirector(new FormBuilder()).makeBookmarkForm()
  },
  props: [],

  data() {
    return {
      isEditing: false,
      form: {},
      target: "login",
      taxUuid: null
    };
  },
  computed: {
    ...mapGetters(["getCurrentUserUuid"])
  },
  mounted() {
    this.$root.$on("closeModal", data => {
      // eslint-disable-next-line no-console
      console.log(data);
      this.toggleModal();
    });

    this.$root.$on("fireModal", data => {
      this.target = data.target;
      if (data.taxUuid) {
        this.taxUuid = data.taxUuid;
      }
      this.toggleModal();
    });

    this.$root.$on("sendData", data => {
      const id = data.formid;
      const obj = data.json;

      if (id == "catForm") {
        this.addTaxonomyItem(obj, "cat");
      } else if (id == "tagForm") {
        this.addTaxonomyItem(obj, "tag");
      } else {
        this.addCollectionItem(obj);
      }
    });
  },
  methods: {
    addTaxonomyItem(obj, target) {
      const MUTATION = target == "cat" ? ADD_CAT : ADD_TAG;
      const query = target == "cat" ? "getCats" : "getTags";
      const name = obj.name;
      const userUuid = this.getCurrentUserUuid;
      const slug = slugify(name);

      this.$apollo
        .mutate({
          mutation: MUTATION,
          variables: {
            name,
            slug,
            userUuid
          },
          refetchQueries: [query]
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

    addCollectionItem(obj) {
      const bookmarkObj = {
        bookmarkUuid: uuidv4(),
        userUuid: this.getCurrentUserUuid,
        url: obj.url,
        slug: slugify(obj.name),
        name: obj.name,
        desc: obj.desc,
        tags: obj.tags ? obj.tags.trim().split(",") : [],
        catUuid: this.taxUuid
      };

      if (bookmarkObj.tags.length > 0) {
        const tagsToInsert = bookmarkObj.tags.map(el => {
          return {
            name: el,
            slug: slugify(el),
            userUuid: this.getCurrentUserUuid
          };
        });

        this.insertTags(tagsToInsert, bookmarkObj);
      } else {
        this.insertBookmark(bookmarkObj, []);
      }

      this.toggleModal(bookmarkObj);
    },

    insertTags(tagsToInsert, bookmarkObj) {
      this.$apollo
        .mutate({
          mutation: ADD_TAGS,
          variables: {
            objects: tagsToInsert
          },
          refetchQueries: ["getAllBookmarksByCat"]
        })

        .then(resp => {
          const respArr = resp.data.insert_tags.returning;
          const tagsBookmarksMap = respArr.map(item => {
            return {
              bookmarkUuid: bookmarkObj.bookmarkUuid,
              tagUuid: item.uuid
            };
          });

          bookmarkObj.tags = tagsBookmarksMap;
          this.insertBookmark(bookmarkObj);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },

    insertBookmark(bookmarkObj) {
      this.$apollo
        .mutate({
          mutation: ADD_BOOKMARK,
          variables: bookmarkObj,
          refetchQueries: ["getAllBookmarksByCat"]
        })
        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },

    toggleModal() {
      const modal = this.$refs["modal-login"];
      modal.classList.toggle("opacity-0");
      modal.classList.toggle("pointer-events-none");
    },
    submitForm() {
      if (this.isEditing) {
        this.updatedCat();
      } else {
        this.addCat();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.add-cat-form {
}
</style>
