<template lang="html">
  <div
    class="lisitng-head bg-gray-900 flex justify-between p-4  border-t border-gray-500"
  >
    <h2 class="text-white py-2 font-bold capitalize">{{ item.name }}</h2>
    <div class="toolbar">
      <btn :type="'small'" class="mx-1">+1</btn>
      <btn :type="'small'" class="m-1">E</btn>
      <btn :type="'small'" class="ml-1">X</btn>
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
  props: { item: Object, key: [String, Number] },
  data() {
    return {
      selected: ""
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.order-select {
}
</style>
