import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
export default {
  name: 'PrtTags',
  components: {
    PrtButton
  },
  props: {
    tags: {
      type: Array,
      default: []
    }
  }
}
