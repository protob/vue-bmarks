<template lang="html">
  <div class="lisitng-head bg-gray-900    ">
    <div class="lisitng-head bg-blue-700 flex justify-between p-4">
      <h2 class="text-white py-2 font-bold uppercase">{{ item.name }}</h2>
      <div class="toolbar"><btn class="mx-2">+1</btn> <btn>all</btn></div>
    </div>

    <div v-if="itemsByCat[item.id]" class="bookmarks-lisiting">
      <div
        v-for="item in itemsByCat[item.id].items"
        :key="item.id"
        class="border border-white px-8 pt-4 pb-8 flex justify-between"
      >
        <div class="item-panel">
          <div class="item-data">
            <h1 class="text-white text-4xl pb-2">
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </h1>
            <h1 class="text-white  pb-2">{{ item.url }}</h1>
            <h1 class="text-white  pb-2">{{ item.desc }}</h1>
            <h1 class="text-white pb-2">
              {{ formatDate(item.lastMod) }}
            </h1>
          </div>
          <div class="item-tags">
            <btn
              v-for="tag in item.tags.split(',')"
              v-if="item.tags.split(',') != ''"
              :key="Math.random()"
              :type="'small'"
              class="ml-1"
            >
              {{ tag }}
            </btn>
          </div>
        </div>
        <div class="item-toolbar">
          <btn :type="'small'" class="m-1">E</btn>
          <btn :type="'small'" class="ml-1">X</btn>
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
