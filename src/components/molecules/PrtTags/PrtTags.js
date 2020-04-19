import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
export default {
  name: 'PrtTags',
  components: {
    PrtButton
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    filterItemsByTag(uuid, name) {
      this.$root.$emit('filterItemsByTag', { uuid, tagName: name })
    }
  }
}
