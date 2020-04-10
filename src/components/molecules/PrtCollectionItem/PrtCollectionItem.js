import PrtItem from '@/components/molecules/PrtItem/PrtItem.vue'
import PrtItemCatHeading from '@/components/molecules/PrtItemCatHeading/PrtItemCatHeading.vue'
export default {
  name: 'PrtCollectionItem',
  components: {
    PrtItem,
    PrtItemCatHeading
  },
  props: {
    collectionItem: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  }
}
