<template>
  <li
    class="prt-select-option"
    :class="{ 'prt-select-option--is-active': selected === value }"
    role="option"
    :aria-selected="selected === value ? 'true' : 'false'"
    @click="clicked"
  >
    <slot />
  </li>
</template>
<script>
export default {
  name: 'PrtSelectOption',
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },
  computed: {
    selected() {
      return this.$parent.selected
    },
    indexes() {
      return this.$parent.indexes
    }
  },
  methods: {
    clicked() {
      this.$parent.$emit('update', this.indexes[JSON.stringify(this.value)])
    }
  }
}
</script>
