import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
export default {
  name: 'PrtSidebarItem',
  components: {
    PrtButton,
    PrtIcon
  },
  props: {
    tax: {
      type: String,
      default: 'cat'
    }
  },
  methods: {
    openModal(target) {
      this.$root.$emit('fireModal', { target })
    }
    // showAllTags() {
    //   this.$root.$emit('showAllTags')
    // },
    // toggleModalEditTag(tagId, tagName) {
    //   const data = {
    //     tagId: tagId,
    //     tagName: tagName
    //   }
    //   this.$root.$emit('fireModalAddTag', data)
    // },
    // toggleModalDelTag(tagId, tagName) {
    //   this.$root.$emit('fireModalDelTag', {
    //     tagId: tagId,
    //     tagName: tagName
    //   })
    // },
    // filterItemsByTag(tagId, tagName) {
    //   const data = {
    //     tagId: tagId,
    //     tagName: tagName
    //   }
    // }
  }
}
