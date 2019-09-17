<template lang="html">
  <div
    class="lisitng-head bg-gray-900 flex justify-between p-4  border-t border-gray-500"
  >
    <h2 class="text-white py-2 font-bold capitalize">{{ item.name }}</h2>

    <div class="toolbar">
      <btn :type="'small'" class="mx-1" @click="toggleModalAddBookmark(item.id)"
        >+1</btn
      >
      <btn
        :type="'small'"
        class="m-1"
        @click="toggleModalAddBookmark(item.id, true)"
        >E</btn
      >
      <btn :type="'small'" class="ml-1" @click="toggleDeleteTaxModal">X</btn>
    </div>
  </div>
</template>

<script>
import btn from "@/components/atoms/btn.vue";
export default {
  name: "OrderSelect",
  components: {
    btn
  },
  props: { item: Object },
  data() {
    return {
      selected: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {
    toggleModalAddBookmark(bookmarkId, isEditing = false) {
      this.$root.$emit("fireModalAddBookmark", {
        bookmarkId: bookmarkId,
        isEditing: isEditing
      });
    },

    toggleDeleteTaxModal(taxId) {
      const key = "catId" in this.item ? "catId" : "taxId";
      this.$root.$emit("fireConfirm", { taxId: taxId, taxKey: key });
    }
  }
};
</script>

<style scoped lang="scss">
.order-select {
}
</style>
