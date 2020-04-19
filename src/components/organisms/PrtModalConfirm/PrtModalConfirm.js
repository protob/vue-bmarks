import PrtModal from '@/components/molecules/PrtModal/PrtModal.vue'
import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import DeleteService from '@/services/deletion.service.js'

export default {
  name: 'PrtModalConfirm',
  components: {
    PrtModal,
    PrtButton
  },

  computed: {
    title() {
      const title =
        this.target === 'cat'
          ? 'Delete Category'
          : this.target == 'item'
          ? 'Delete Item'
          : 'Delete Tag'
      return title
    }
  },

  data() {
    return {
      target: null,
      taxUuid: null,
      userUuid: localStorage.userUuid ? localStorage.userUuid : '',
      userId: localStorage.userId ? localStorage.userId : '',
      isModalVisible: false,

      itemId: null,
      itemData: {
        target: '',
        taxName: '',
        taxUuid: ''
      }
    }
  },
  mounted() {
    this.$root.$on('fireConfirm', data => {
      this.target = data.target
      this.toggleModal()

      this.itemData = data
    })
  },

  methods: {
    async deleteItem() {
      await DeleteService.deleteItem(this.itemData, this.$apollo)

      this.toggleModal()
      this.$root.$emit('refetchItems')
      this.$root.$emit('refetchTax')
    },

    toggleModal() {
      this.isModalVisible = !this.isModalVisible
    }
  }
}
