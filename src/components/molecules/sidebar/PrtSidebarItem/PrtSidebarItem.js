import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
export default {
  name: 'PrtSidebarItem',
  components: {
    PrtButton,
    PrtIcon
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tax: {
      type: String,
      default: 'cat'
    }
  },
  methods: {
    toggleDeleteTaxModal(target, taxUuid, taxName) {
      this.$root.$emit('fireConfirm', { target, taxUuid, taxName })
    },
    openModalTax(target, taxUuid, taxName, isEditing = false) {
      // const isBookmark = target == 'bookmark' ? true : false
      const data = {
        target,
        taxUuid,
        taxName,
        isEditing,
        catUuid: taxUuid,
        isBookmark: false
      }

      this.$store.dispatch('setModalFormData', data)

      this.$root.$emit('fireModal', { target, taxUuid, taxName, isEditing })
    },

    openModal(target, taxUuid, bookmark = null, isEditing = false) {
      // ediging exsiting bookmark
      if (bookmark) {
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
            catUuid: taxUuid,
            isBookmark: true,
            isEditing
          })
        } else {
          const data = {
            target,
            taxUuid,
            taxName: bookmark.taxName,
            isEditing: false,
            catUuid: taxUuid,
            isBookmark: true
          }

          this.$store.dispatch('setModalFormData', data)
        }
      }

      this.$root.$emit('fireModal', { target, taxUuid, bookmark, isEditing })
    }

    // openModal(target) {
    //   this.$root.$emit('fireModal', { target })
    // }
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
