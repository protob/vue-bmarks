import PrtItemForm from '@/components/organisms/forms/PrtItemForm/PrtItemForm.vue'
import PrtTaxForm from '@/components/organisms/forms/PrtTaxForm/PrtTaxForm.vue'
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
    PrtTaxForm,
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
    },
    currentProperties: function() {
      return { tax: this.target === 'cat' ? 'cat' : 'tag' }
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

      // console.log(userUuid)
      // console.log(userId)

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
        const { dataObj, formId, isEditing } = data

        // item form
        if (formId == 'itemForm') {
          isEditing
            ? this.updateCollectionItem(dataObj)
            : this.addCollectionItemAndMaybeTags(dataObj)
        } else {
          // cat from
          formId == 'catForm'
            ? this.addTaxonomyItem(dataObj, 'cat')
            : this.addTaxonomyItem(dataObj, 'tag')
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
        //this.currentModalForm =
        // this.target === 'cat' ? 'PrtCatForm' : 'PrtTagForm'
        this.currentModalForm = 'PrtTaxForm'
        this.toggleModal()
      })
    }
  }
}
