import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtTags from '@/components/molecules/PrtTags/PrtTags.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
export default {
  name: 'PrtItem',
  components: { PrtButton, PrtTags, PrtIcon },
  props: {
    title: {
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
