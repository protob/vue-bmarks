<template lang="html">
  <div class="lisitng-head bg-gray-900    ">
    <div class="lisitng-head bg-blue-700 flex justify-between p-4">
      <h2 class="text-white py-2 font-bold uppercase">{{ item.name }}</h2>
      <div class="toolbar">
        <btn class="mx-2" @click="openModal('bookmark', item.id)">+1</btn>
        <btn>all</btn>
      </div>
    </div>

    <div class="bookmarks-lisiting">
      <div
        v-for="item in item.bookmarks_cats"
        :key="item.id"
        class="border border-white px-8 pt-4 pb-8 flex justify-between"
      >
        <div class="item-panel">
          <div class="item-data">
            <h1 class="text-white text-4xl pb-2">
              <a :href="item.url" target="_blank">{{ item.bookmark.name }}</a>
            </h1>
            <h1 class="text-white  pb-2">{{ item.bookmark.url }}</h1>
            <h1 class="text-white  pb-2">{{ item.bookmark.desc }}</h1>
            <h1 class="text-white pb-2">
              {{ formatDate(item.bookmark.updated_at) }}
            </h1>
          </div>
          <div class="item-tags">
            <btn
              v-for="elem in item.bookmark.bookmarks_tags"
              :key="Math.random()"
              :type="'small'"
              class="ml-1"
              @click="filterByTag(elem.tag.uuid, elem.tag.name)"
            >
              {{ elem.tag.name }}
            </btn>
          </div>
        </div>
        <div class="item-toolbar">
          <btn
            :type="'small'"
            class="m-1"
            @click="openModal('bookmark', item.id, true)"
            >E</btn
          >
          <btn :type="'small'" class="ml-1" @click="toggleDeleteTaxModal"
            >X</btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import btn from "@/components/atoms/btn.vue";
import { mapGetters } from "vuex";
export default {
  name: "OrderSelect",
  components: {
    btn
  },
  props: { item: Object },
  data() {
    return {
      selected: "",
      itemsByCat: {}
    };
  },
  computed: {
    ...mapGetters(["getCats", "getItems"])
  },

  mounted() {
    this.itemsByCat = this.groupItemsByCat();
  },

  methods: {
    filterByTag(uuid, name) {
      this.$root.$emit("filterItemsByTag", { uuid, name });
    },
    openModal(target, bookmarkId, isEditing = false) {
      this.$root.$emit("fireModal", { target, bookmarkId, isEditing });
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
    },

    formatDate(timestamp) {
      const d = new Date(timestamp);
      const formated =
        d.getDate() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      return formated;
    },

    groupItemsByCat() {
      const db = this.getItems;
      let o = this.arrayToObject(this.getCats);

      db.forEach(el => {
        o[el.catId].items.push(el);
      });
      return o;
    },

    arrayToObject: array =>
      array.reduce((obj, item) => {
        obj[item.id] = {
          ...item,
          items: []
        };
        return obj;
      }, {})
  }
};
</script>

<style scoped lang="scss">
.order-select {
}
</style>
