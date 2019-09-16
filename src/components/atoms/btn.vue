<template lang="html">
  <button
    :class="{ 'btn-small': type == 'small' }"
    class="btn btn-blue"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Btn",
  props: ["type"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
.btn-small {
  @apply font-bold py-1 px-2 rounded;
}
</style>
