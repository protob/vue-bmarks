import PrtInput from '@/components/atoms/form/PrtInput/PrtInput.vue'
export default {
  name: 'PrtSearchBox',
  components: {
    PrtInput
  },
  data: () => {
    return {
      filterPhrase: ''
    }
  },
  methods: {
    filterItems() {
      this.$root.$emit('filterItemsByPhrase', { phrase: this.filterPhrase })
    },
    resetFilter() {
      this.$root.$emit('filterItemsByPhrase', { phrase: null })
    }
  }
}
