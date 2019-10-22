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
          <CatForm v-if="target == 'cat'" :formid="'catForm'" />
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
import { mapGetters } from "vuex";
import CreateService from "@/services/create.service.js";
import UpdateService from "@/services/update.service.js";

export default {
  name: "AddTagForm",
  components: {
    CatForm: new FormDirector(new FormBuilder()).makeCatForm(),
    TagForm: new FormDirector(new FormBuilder()).makeTagForm(),
    BookmarkForm: new FormDirector(new FormBuilder()).makeBookmarkForm()
  },

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
    this.enableCloseModal();
    this.enableFireModal();
    this.enableSendData();
  },
  methods: {
    // enable event handlers
    enableCloseModal() {
      this.$root.$on("closeModal", () => {
        this.toggleModal();
      });
    },
    enableFireModal() {
      this.$root.$on("fireModal", data => {
        this.target = data.target;
        this.$store.dispatch("changeFormMode", { mode: this.target });
        this.isEditing = data.isEditing;
        data.taxUuid ? (this.taxUuid = data.taxUuid) : (this.taxUuid = null);
        this.toggleModal();
      });
    },

    enableSendData() {
      this.$root.$on("sendData", data => {
        const id = data.formid;
        const obj = data.json;

        if (data.formid == "bookmarkForm") {
          data.isEditing
            ? this.updateCollectionItem(obj)
            : this.addCollectionItemAndMaybeTags(obj);
        } else {
          id == "catForm"
            ? this.addTaxonomyItem(obj, "cat")
            : this.addTaxonomyItem(obj, "tag");
        }
      });
    },

    submitForm() {
      this.isEditing ? this.updatedCat() : this.addCat();
    },
    //form and modals
    toggleModal() {
      const modal = this.$refs["modal-login"];
      modal.classList.toggle("opacity-0");
      modal.classList.toggle("pointer-events-none");
    },

    //----------

    addTaxonomyItem(obj, target) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId;

      CreateService.addTaxonomyItem(
        this.$apollo,
        obj,
        target,
        userUuid,
        userId
      );
      this.toggleModal();
      this.$store.dispatch("setModalFormData", {});
    },
    addCollectionItemAndMaybeTags(obj) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId;
      CreateService.addCollectionItemAndMaybeTags(
        this.$apollo,
        obj,
        userId,
        userUuid
      );
      this.toggleModal();
    },

    prepareTagsBeforeSend(itemsObj, bookmarkObj) {
      UpdateService.prepareTagsBeforeSend(itemsObj, bookmarkObj);
    },
    updateItemDeep(bookmarkObj) {
      UpdateService.updateItemDeep(bookmarkObj);
    },
    updateCollectionItem(obj) {
      UpdateService.updateCollectionItem(obj);
    },
    updateTagsStep1(tagsToInsert, bookmarkObj) {
      UpdateService.updateTagsStep1(tagsToInsert, bookmarkObj);
    },
    updateTags(tagsToInsert, bookmarkObj) {
      UpdateService.updateTags(tagsToInsert, bookmarkObj);
    }
  }
};
</script>
