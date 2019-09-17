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
          <h1>Delete item, Are you sure?</h1>
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
import btn from "@/components/atoms/btn.vue";
export default {
  components: {
    btn
  },
  data() {
    return {
      itemId: null,
      itemData: null
    };
  },
  mounted() {
    this.$root.$on("fireConfirm", data => {
      this.toggleModal();
      this.itemData = data;
    });
  },

  methods: {
    deleteItem() {
      this.toggleModal();
      console.log("item deleted");
    },
    toggleModal() {
      const modal = this.$refs["modal-del-item"];

      modal.classList.toggle("opacity-0");
      modal.classList.toggle("pointer-events-none");
    }
  }
};
</script>
