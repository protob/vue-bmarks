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
    filterItemsByTax(uuid, name, tax) {
      return tax === 'cats'
        ? this.$root.$emit('filterItemsByCat', { uuid, catName: name })
        : this.$root.$emit('filterItemsByTag', { uuid, tagName: name })
    },

    toggleDeleteTaxModal(target, taxUuid, taxName) {
      this.$root.$emit('fireConfirm', { target, taxUuid, taxName })
    },
    openModalTax(target, taxUuid, taxName, isEditing = false) {
      // const isItem = target == 'item' ? true : false
      const data = {
        target,
        taxUuid,
        taxName,
        isEditing,
        catUuid: taxUuid,
        isItem: false
      }

      this.$store.dispatch('setModalFormData', data)

      this.$root.$emit('fireModal', { target, taxUuid, taxName, isEditing })
    },

    openModal(target, taxUuid, item = null, isEditing = false) {
      // ediging exsiting item
      if (item) {
        if (isEditing) {
          const tagsArr = item.items_tags.map(elem => {
            return {
              uuid: elem.tag.uuid,
              name: elem.tag.name
            }
          })

          this.$store.dispatch('setModalFormData', {
            target,
            taxUuid,
            taxName: item.name,
            desc: item.desc,
            slug: item.slug,
            url: item.url,
            tags: tagsArr,
            catUuid: taxUuid,
            isItem: true,
            isEditing
          })
        } else {
          const data = {
            target,
            taxUuid,
            taxName: item.taxName,
            isEditing: false,
            catUuid: taxUuid,
            isItem: true
          }

          this.$store.dispatch('setModalFormData', data)
        }
      }

      this.$root.$emit('fireModal', { target, taxUuid, item, isEditing })
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
