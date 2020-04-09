import PrtSelect from '@/components/atoms/form/PrtSelect/PrtSelect.vue'
const optionsList = [
  { value: 'date-asc', label: 'DATE ASC' },
  { value: 'date-desc', label: 'DATE DESC' },
  { value: 'asc', label: 'ASC' },
  { value: 'desc', label: 'DESC' }
]

export default {
  name: 'PrtSortBox',
  components: {
    PrtSelect
  },
  data() {
    return {
      selected: 'desc',
      options: optionsList
    }
  }
}
