import PrtItemForm from '@/components/organisms/forms/PrtItemForm/PrtItemForm.vue'
import PrtCatForm from '@/components/organisms/forms/PrtCatForm/PrtCatForm.vue'
import PrtTagForm from '@/components/organisms/forms/PrtTagForm/PrtTagForm.vue'
import PrtLoginForm from '@/components/organisms/forms/PrtLoginForm/PrtLoginForm.vue'
import PrtModal from '@/components/molecules/PrtModal/PrtModal.vue'

import { mapGetters } from 'vuex'
import CreateService from '@/services/creation.service.js'
import UpdateService from '@/services/update.service.js'

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
    this.currentModalForm = ''
    this.enableFireModal()
    this.enableSendData()
  },
  computed: {
    ...mapGetters(['getCurrentUserUuid', 'getCurrentUserId']),
    title() {
      const title = this.target === 'cat' ? 'Add Category' : 'Add Tag'
      return title
    }
  },
  data: () => {
    return {
      isEditing: false,
      form: {},
      target: null,
      userUuid: localStorage.userUuid ? localStorage.userUuid : '',
      userId: localStorage.userId ? localStorage.userId : '',
      isModalVisible: false,
      currentModalForm: 'PrtTagForm'
    }
  },

  methods: {
    // enable event handlers
    addTaxonomyItem(obj, target) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId

      CreateService.addTaxonomyItem(this.$apollo, obj, target, userUuid, userId)
      this.toggleModal()
      this.$store.dispatch('setModalFormData', {})
    },
    addCollectionItemAndMaybeTags(obj) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId
      CreateService.addCollectionItemAndMaybeTags(
        this.$apollo,
        obj,
        userId,
        userUuid
      )
      this.toggleModal()
    },
    updateCollectionItem(obj) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId
      UpdateService.updateCollectionItem(this.$apollo, obj, userId, userUuid)
      this.toggleModal()
    },
    enableSendData() {
      this.$root.$on('sendData', data => {
        const { id, obj } = data

        if (data.formid == 'itemForm') {
          data.isEditing
            ? this.updateCollectionItem(obj)
            : this.addCollectionItemAndMaybeTags(obj)
        } else {
          id == 'catForm'
            ? this.addTaxonomyItem(obj, 'cat')
            : this.addTaxonomyItem(obj, 'tag')
        }
      })
    },

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
        this.currentModalForm =
          this.target === 'cat' ? 'PrtCatForm' : 'PrtTagForm'

        this.toggleModal()
      })
    }
  }
}
