import PrtItemForm from '@/components/organisms/forms/PrtItemForm/PrtItemForm.vue'
import PrtCatForm from '@/components/organisms/forms/PrtCatForm/PrtCatForm.vue'
import PrtTagForm from '@/components/organisms/forms/PrtTagForm/PrtTagForm.vue'
import PrtLoginForm from '@/components/organisms/forms/PrtLoginForm/PrtLoginForm.vue'
import PrtModal from '@/components/molecules/PrtModal/PrtModal.vue'
export default {
  name: 'PrtModalForm',
  components: {
    PrtModal,
    PrtItemForm,

    PrtCatForm,
    PrtTagForm,
    PrtLoginForm
  },
  mounted() {
    this.currentModalForm = 'PrtTagForm'
    this.enableFireModal()
  },
  data: () => {
    return {
      isModalVisible: false,
      currentModalForm: 'PrtTagForm'
    }
  },
  methods: {
    // enable event handlers
    toggleModal() {
      this.isModalVisible = !this.isModalVisible
    },
    enableCloseModal() {
      this.$root.$on('closeModal', () => {
        this.toggleModal()
      })
    },
    enableFireModal() {
      this.$root.$on('fireModal', data => {
        this.target = data.target

        this.toggleModal()
      })
    }
  }
}
