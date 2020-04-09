import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
export default {
  name: 'PrtItemCatHeading',
  components: {
    PrtButton,
    PrtIcon
  },
  props: {
    text: {
      type: String,
      default: null
    }
  },
  methods: {
    openModal(target) {
      this.$root.$emit('fireModal', { target })
    }
  }
}
