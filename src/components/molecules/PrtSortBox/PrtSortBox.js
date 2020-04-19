import PrtSelect from '@/components/atoms/form/PrtSelect/PrtSelect.vue'
const optionsList = [
  { value: 'date-asc', label: 'DATE ASC' },
  { value: 'date-desc', label: 'DATE DESC' },
  { value: 'name-asc', label: 'ASC' },
  { value: 'name-desc', label: 'DESC' }
]

export default {
  name: 'PrtSortBox',
  components: {
    PrtSelect
  },
  data() {
    return {
      selected: 'name-desc',
      options: optionsList
    }
  },

  watch: {
    selected: {
      immediate: true,
      handler: function(value) {
        this.$root.$emit('sortItemsByOrder', { order: value })
      }
    }
  }
}
