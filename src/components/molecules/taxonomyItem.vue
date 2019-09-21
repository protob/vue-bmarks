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
        v-if="item.__typename == 'cats'"
        :type="'small'"
        class="mx-1"
        @click="openModal('bookmark', item.uuid)"
        >+1</btn
      >
      <btn
        :type="'small'"
        class="m-1"
        @click="openModal(taxonomyName, item.uuid, item.name, true)"
        >E</btn
      >
      <btn
        :type="'small'"
        class="ml-1"
        @click="toggleDeleteTaxModal(taxonomyName, item.uuid, item.name)"
        >X</btn
      >
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
  // eslint-disable-next-line vue/require-valid-default-prop
  props: { item: { type: Object, default: {} } },
  data() {
    return {
      selected: "",
      taxonomyName: this.item.__typename == "cats" ? "cat" : "tag"
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

    openModal(target, taxUuid, taxName, isEditing = false) {
      const isBookmark = target == "bookmark" ? true : false;
      const data = {
        target,
        taxUuid,
        taxName,
        isEditing,
        catUuid: taxUuid,
        isBookmark: isBookmark
      };

      this.$store.dispatch("setModalFormData", data);

      this.$root.$emit("fireModal", { target, taxUuid, taxName, isEditing });
    },

    toggleDeleteTaxModal(target, taxUuid, taxName) {
      this.$root.$emit("fireConfirm", { target, taxUuid, taxName });
    }
  }
};
</script>

<style scoped lang="scss">
.order-select {
}
</style>
