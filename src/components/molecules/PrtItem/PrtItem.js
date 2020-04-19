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
      type: String | Number,
      required: true,
      default: null
    },
    title: {
      type: String | Number,
      default: 'Categories'
    }
  },
  computed: {
    formatedDate() {
      return new Date(this.item.updated_at).toLocaleDateString('en-AU') // 9/17/2016
    }
  },
  methods: {
    toggleDeleteItemModal(target, taxUuid, taxName) {
      this.$root.$emit('fireConfirm', { target, taxUuid, taxName })
    },

    openModal(target, taxUuid, item = null, isEditing = true) {
      // edit exsiting item
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
            catUuid: this.catUuid,
            isItem: true,
            isEditing
          })

          this.$root.$emit('fireModal', {
            target,
            taxUuid,
            item,
            isEditing
          })
        }
      }
    }
  }
}
