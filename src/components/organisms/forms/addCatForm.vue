<template lang="html">
  <div
    ref="modal-add-cat"
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
          <h1>Cat Form</h1>
        </div>

        <div class=" px-8 pt-6 pb-8 mb-4 ">
          <CatForm :formid="'catForm'" />

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
  name: "AddCatForm",
  components: {
    CatForm: new FormDirector(new FormBuilder()).makeCatForm()
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
    this.$root.$on("sendCatData", data => {
      console.log("cat", data);
    });
    this.$root.$on("closeCatModal", data => {
      this.toggleModal();
    });

    this.$root.$on("fireModalAddCat", data => {
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
