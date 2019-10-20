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

import { mapGetters } from "vuex";
const slugify = require("slugify");
const uuidv4 = require("uuid/v4");

const ADD_CAT = gql`
  mutation AddCat(
    $name: String!
    $slug: String!
    $userUuid: uuid!
    $userId: String!
    $uuid: uuid!
  ) {
    insert_cats(
      objects: [
        {
          uuid: $uuid
          name: $name
          slug: $slug
          userUuid: $userUuid
          userId: $userId
        }
      ]
      on_conflict: { constraint: cats_pkey, update_columns: [name, slug] }
    ) {
      returning {
        uuid
      }
    }
  }
`;

const ADD_TAG = gql`
  mutation AddTag(
    $name: String!
    $slug: String!
    $userId: String!
    $userUuid: uuid!
    $uuid: uuid!
  ) {
    insert_tags(
      objects: [
        {
          uuid: $uuid
          name: $name
          slug: $slug
          userUuid: $userUuid
          userId: $userId
        }
      ]
      on_conflict: { constraint: tags_pkey, update_columns: [name, slug] }
    ) {
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
  mutation AddBookmarkWithTags(
    $bookmarkUuid: uuid!
    $userUuid: uuid!
    $userId: String!
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
          userId: $userId
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

const ADD_BOOKMARK_DEEP = gql`
  mutation AddBookmarkWithTags(
    $bookmarkUuid: uuid!
    $userUuid: uuid!
    $userId: String!
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
          userId: $userId
          catUuid: $catUuid
        }
      ]

      on_conflict: {
        constraint: bookmarks_pkey
        update_columns: [name, url, slug, desc]
      }
    ) {
      affected_rows
      returning {
        name
        uuid
      }
    }
    # insert_bookmarks_cats(
    #   objects: { bookmarkUuid: $bookmarkUuid, catUuid: $catUuid }
    #   on_conflict: {
    #     constraint: bookmarks_cats_pkey
    #     update_columns: bookmarkUuid
    #   }
    # ) {
    #   returning {
    #     bookmarkUuid
    #     catUuid
    #   }
    # }

    insert_bookmarks_tags(
      objects: $tags
      on_conflict: {
        constraint: bookmarks_tags_pkey
        update_columns: bookmarkUuid
      }
    ) {
      returning {
        bookmarkUuid
        tagUuid
      }
    }
  }
`;

const GET_TAGS_BY_USERID = gql`
  query getTagsBySLug($userId: String!, $objects: [String!]!) {
    tags(
      where: { _and: { userId: { _eq: $userId }, slug: { _in: $objects } } }
    ) {
      name
      slug
      userUuid
      userId
      uuid
    }
  }
`;

// --- upsert bookmark only, without cats and tags

const UPDATE_BOOKMARK_SHALLOW = gql`
  mutation AddBookmark(
    $bookmarkUuid: uuid!
    $userUuid: uuid!
    $userId: String!
    $name: String!
    $slug: String!
    $url: String!
    $desc: String!
    $catUuid: uuid! # $tags: [bookmarks_tags_insert_input!]!
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
          userId: $userId
          catUuid: $catUuid
        }
      ]
      on_conflict: {
        constraint: bookmarks_pkey
        update_columns: [name, url, slug, desc]
      }
    ) {
      affected_rows
      returning {
        name
        uuid
      }
    }
    insert_bookmarks_cats(
      objects: { bookmarkUuid: $bookmarkUuid, catUuid: $catUuid }
      on_conflict: {
        constraint: bookmarks_cats_pkey
        update_columns: bookmarkUuid
      }
    ) {
      returning {
        bookmarkUuid
        catUuid
      }
    }

    # insert_bookmarks_tags(
    #   objects: $tags
    #   on_conflict: { constraint: tags_pkey, update_columns: updated_at }
    # ) {
    #   returning {
    #     bookmarkUuid
    #     tagUuid
    #   }
    # }
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
      taxUuid: null,
      userUuid: localStorage.userUuid ? localStorage.userUuid : "",
      userId: localStorage.userId ? localStorage.userId : ""
    };
  },
  computed: {
    ...mapGetters(["getCurrentUserUuid", "getCurrentUserId"])
  },
  mounted() {
    this.$root.$on("closeModal", () => {
      this.toggleModal();
    });

    this.$root.$on("fireModal", data => {
      this.target = data.target;
      this.$store.dispatch("changeFormMode", { mode: this.target });
      if (data.isEditing == true) {
        this.isEditing = true;
        // edit single bookmark item

        if (data.taxUuid) {
          this.taxUuid = data.taxUuid;
        }
      } else {
        this.isEditing = false;
        // this.$store.dispatch("setModalFormData", {});
      }

      this.toggleModal();
    });

    this.$root.$on("sendData", data => {
      const id = data.formid;
      const obj = data.json;

      if (data.formid == "loginForm") {
        this.loginWithEmailAndPassword(obj);
      } else if (data.formid == "registerForm") {
        this.registerWithEmailAndPassword(obj);
      } else if (data.formid == "bookmarkForm") {
        if (data.isEditing) {
          this.updateCollectionItem(obj);
        } else {
          this.addCollectionItem(obj);
        }
      } else {
        if (id == "catForm") {
          this.addTaxonomyItem(obj, "cat");
        } else if (id == "tagForm") {
          this.addTaxonomyItem(obj, "tag");
        }
      }
    });
  },
  methods: {
    //form and modals
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
    },

    // login
    loginWithEmailAndPassword(obj) {
      this.$store.dispatch("loginWithEmailAndPassword", obj);
      return obj;
    },
    registerWithEmailAndPassword(obj) {
      return obj;
    },

    // ADD

    addTaxonomyItem(obj, target) {
      const MUTATION = target == "cat" ? ADD_CAT : ADD_TAG;
      const query = target == "cat" ? "getCats" : "getTags";
      const name = obj.name;
      const userUuid = this.getCurrentUserUuid;
      const slug = slugify(name);
      const uuid = obj.uuid ? obj.uuid.trim() : uuidv4();
      const userId = this.getCurrentUserId;

      const data = {
        uuid,
        name,
        slug,
        userUuid,
        userId
      };

      this.$apollo
        .mutate({
          mutation: MUTATION,
          variables: data,
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

      this.$store.dispatch("setModalFormData", {});
    },
    addCollectionItem(obj) {
      let tags = !obj.tags ? [] : obj.tags;
      if (typeof obj.tags == "object") {
        tags = JSON.parse(JSON.stringify(obj.tags));
      } else {
        tags = obj.tags.trim().split(",");
      }

      const userId = this.userId;
      const bookmarkObj = {
        bookmarkUuid: uuidv4(),
        userUuid: this.getCurrentUserUuid,
        userId: userId,
        url: obj.url,
        slug: slugify(obj.name),
        name: obj.name,
        desc: obj.desc,
        tags: tags.filter(n => n), // remove empty strings
        // catUuid: this.taxUuid
        catUuid: obj.catUuid
      };

      if (tags.length > 0) {
        const tagsToInsert = bookmarkObj.tags.map(el => {
          return {
            name: el,
            slug: slugify(el),
            userId: this.userId,
            userUuid: this.getCurrentUserUuid
          };
        });

        this.insertTags(tagsToInsert, bookmarkObj);
      } else {
        this.insertBookmark(bookmarkObj, []);
      }

      this.toggleModal(bookmarkObj);
    },
    // INSERT

    insertTags(tagsToInsert, bookmarkObj) {
      this.$apollo
        .mutate({
          mutation: ADD_TAGS,
          variables: {
            objects: tagsToInsert
          },
          refetchQueries: ["getAllBookmarksByCat", "getTags"]
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

    // prepare

    prepareTagsBeforeSend(itemsObj, bookmarkObj) {
      const userId = this.getCurrentUserId;
      const itemsObj2 = itemsObj.filter(
        (item, index, self) =>
          index === self.findIndex(elem => elem.slug === item.slug)
      ); // only unique tag slugs

      const slugsArr = itemsObj2.map(item => item.slug);

      this.$apollo
        .query({
          query: GET_TAGS_BY_USERID,
          variables: {
            userId: userId,
            objects: [...slugsArr]
          },
          fetchPolicy: "no-cache",
          refetchQueries: ["getAllBookmarksByCat", "getTags"]
        })
        .then(result => {
          const data = result.data.tags;

          const dataToSend = itemsObj2;

          let updatedData = dataToSend;
          if (data.length) {
            const res = data.filter(n =>
              dataToSend.some(n2 => n.slug == n2.slug)
            );
            const responseObj = Object.assign(
              {},
              ...res.map(item => ({ [item.slug]: item }))
            );

            updatedData = dataToSend.map(item => ({
              ...item,
              // uuid: responseObj[item.slug].uuid

              uuid: responseObj[item.slug]
                ? responseObj[item.slug].uuid
                : uuidv4()
            }));
          } else {
            updatedData = dataToSend.map(item => ({
              ...item,
              uuid: uuidv4()
            }));
          }

          this.updateTags(updatedData, bookmarkObj);
        });
    },

    //UPDATE
    updateItemDeep(bookmarkObj) {
      this.$apollo
        .mutate({
          mutation: ADD_BOOKMARK_DEEP,
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

    updateCollectionItem(obj) {
      let tags = !obj.tags ? [] : obj.tags;
      if (typeof obj.tags == "object") {
        tags = JSON.parse(JSON.stringify(obj.tags));
      } else {
        tags = obj.tags.trim().split(",");
      }

      const userId = this.getCurrentUserId;

      const bookmarkObj = {
        bookmarkUuid: obj.uuid,
        userUuid: this.getCurrentUserUuid,
        userId: userId,
        url: obj.url,
        slug: slugify(obj.name),
        name: obj.name,
        desc: obj.desc,
        catUuid: obj.catUuid
        // tags: tags .filter(n => n) // remove empty strings
      };

      this.$apollo
        .mutate({
          mutation: UPDATE_BOOKMARK_SHALLOW,
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

      if (tags.length > 0) {
        const tagsToInsert = tags.map(el => {
          return {
            name: el,
            slug: slugify(el),
            userId: this.userId,
            userUuid: this.getCurrentUserUuid
          };
        });

        this.updateTagsStep1(tagsToInsert, bookmarkObj);
      }
      this.toggleModal(bookmarkObj);
    },

    updateTagsStep1(tagsToInsert, bookmarkObj) {
      // prevent duplicates

      this.prepareTagsBeforeSend(tagsToInsert, bookmarkObj);
    },

    updateTags(tagsToInsert, bookmarkObj) {
      this.$apollo
        .mutate({
          mutation: ADD_TAGS,
          variables: {
            objects: tagsToInsert
          },
          refetchQueries: ["getAllBookmarksByCat", "getTags"]
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

          this.updateItemDeep(bookmarkObj);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.add-cat-form {
}
</style>
