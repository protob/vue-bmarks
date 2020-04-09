<script src="./PrtOverlay.js"></script>
<template>
  <transition :name="transition">
    <div
      v-if="visible"
      ref="overlay"
      class="prt-overlay"
      :class="[staticClass, className]"
      @click="$emit('click')"
    ></div>
  </transition>
</template>
<script>
export default {
  name: 'SfOverlay',
  props: {
    transition: {
      type: String,
      default: 'fade'
    },

    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    staticClass() {
      return this.$vnode.data.staticClass
    },
    className() {
      return this.$vnode.data.class
    }
  }
}
</script>

<style lang="scss">
.prt-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 111;
  background: rgba(0, 0, 0, 0.8);
}
</style>
