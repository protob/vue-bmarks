<template lang="html">
  <div
    ref="modal-add-cat"
    class="modal opacity-0 pointer-events-none absolute w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"
      @click="toggleModal"
    ></div>

    <div
      class="modal-panel form-1 absolute h-32 rounded-sm shadow-lg flex items-center justify-center text-2xl"
    >
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div>
          <h1>Bookmark Form</h1>
          <CatForm />

          <!-- <h2>Edit User Form</h2>
          <UserForm :id="1" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormBuilder from "@/builders/FormBuilder";
import FormDirector from "@/builders/FormDirector";

export default {
  name: "AddBookmarkForm",
  components: {
    CatForm: new FormDirector(new FormBuilder()).makeBookmarkForm()
  },
  props: [],

  data() {
    return {
      isEditing: false,
      form: {}
    };
  },
  computed: {},
  mounted() {
    this.$root.$on("fireModalAddBookmark", data => {
      if (data) {
        this.form = data;
        this.isEditing = true;
      } else {
        this.isEditing = false;
      }
      this.toggleModal();
    });
  },
  methods: {
    updatedCat() {
      console.log("update cat");
    },
    addCat() {
      console.log("addcat");
    },

    toggleModal() {
      const modal = this.$refs["modal-add-cat"];
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
