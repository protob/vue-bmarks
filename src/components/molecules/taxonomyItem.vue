<template lang="html">
  <div
    class="lisitng-head bg-gray-900 flex justify-between p-4  border-t border-gray-500"
  >
    <a @click.prevent="filterByTaxonomy(item.uuid, item.name, item.__typename)">
      <h2 class="text-white py-2 font-bold capitalize cursor-pointer">
        {{ item.name }}
      </h2>
    </a>
    <div class="toolbar">
      <btn
        :type="'small'"
        class="mx-1"
        @click="openModal('bookmark', item.uuid)"
        >+1</btn
      >
      <btn
        :type="'small'"
        class="m-1"
        @click="openModal('bookmark', item.uuid, true)"
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
    filterByTaxonomy(uuid, name, target) {
      const eventName =
        target == "cats" ? "filterItemsByCat" : "filterItemsByTag";
      this.$root.$emit(eventName, { uuid, name });
    },

    openModal(target, taxUuid, isEditing = false) {
      this.$root.$emit("fireModal", { target, taxUuid, isEditing });
    },

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
