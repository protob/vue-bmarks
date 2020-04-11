import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtTags from '@/components/molecules/PrtTags/PrtTags.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
export default {
  name: 'PrtItem',
  components: { PrtButton, PrtTags, PrtIcon },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    catUuid: {
      type: String,
      required: true,
      default: null
    },
    title: {
      type: String,
      default: 'Categories'
    }
  },
  methods: {
    toggleDeleteItemModal(target, taxUuid, taxName) {
      this.$root.$emit('fireConfirm', { target, taxUuid, taxName })
    },

    openModal(target, taxUuid, bookmark = null, isEditing = true) {
      // ediging exsiting bookmark
      if (bookmark) {
        // console.log('kaka', bookmark)
        if (isEditing) {
          const tagsArr = bookmark.bookmarks_tags.map(elem => {
            return {
              uuid: elem.tag.uuid,
              name: elem.tag.name
            }
          })

          this.$store.dispatch('setModalFormData', {
            target,
            taxUuid,
            taxName: bookmark.name,
            desc: bookmark.desc,
            slug: bookmark.slug,
            url: bookmark.url,
            tags: tagsArr,
            catUuid: this.catUuid,
            isBookmark: true,
            isEditing
          })

          this.$root.$emit('fireModal', {
            target,
            taxUuid,
            bookmark,
            isEditing
          })
        }
      }
    }

    // openModal(target) {
    //   this.$root.$emit('fireModal', { target })
    // }
  }
}
