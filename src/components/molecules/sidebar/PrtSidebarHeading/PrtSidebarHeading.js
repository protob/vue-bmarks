import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
export default {
  name: 'PrtSidebarHeading',
  components: {
    PrtButton,
    PrtIcon
  },

  props: {
    tax: {
      type: String,
      default: 'cat'
    },
    text: {
      type: String,
      default: 'Categories'
    }
  },
  methods: {
    openModal(target) {
      this.$root.$emit('fireModal', { target })
    }
  }
}
