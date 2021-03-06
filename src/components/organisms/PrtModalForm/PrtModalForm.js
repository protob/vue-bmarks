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
      const action = this.isEditing ? 'Edit' : 'Add'
      const title =
        this.target === 'cat'
          ? 'Category'
          : this.target == 'item'
          ? 'Item'
          : 'Tag'
      return `${action} ${title}`
    },
    currentProperties: function() {
      return {
        tax:
          this.target === 'cat'
            ? 'cat'
            : this.target === 'item'
            ? 'item'
            : 'tag'
      }
    }
  },
  data: () => {
    return {
      isEditing: false,
      form: {},
      target: null,
      taxUuid: null,
      userUuid: localStorage.userUuid ? localStorage.userUuid : '',
      userId: localStorage.userId ? localStorage.userId : '',
      isModalVisible: false,
      currentModalForm: 'PrtTaxForm'
    }
  },

  methods: {
    async addTaxonomyItem(obj, target) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId

      await CreateService.addTaxonomyItem(
        this.$apollo,
        obj,
        target,
        userUuid,
        userId
      )

      this.toggleModal()
      this.$store.dispatch('setModalFormData', {})
      this.$root.$emit('refetchTax')
    },
    async addCollectionItemAndMaybeTags(obj) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId
      // console.log('oo', obj)
      await CreateService.addCollectionItemAndMaybeTags(
        this.$apollo,
        obj,
        userId,
        userUuid
      )
      this.toggleModal()
      this.$root.$emit('refetchItems')
      this.$root.$emit('refetchTax')
    },

    async updateTaxonomyItem(obj, target) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId

      await UpdateService.updateTaxonomyItem(
        this.$apollo,
        obj,
        target,
        userUuid,
        userId
      )

      this.toggleModal()
      this.$store.dispatch('setModalFormData', {})
      this.$root.$emit('refetchItems')
      this.$root.$emit('refetchTax')
    },

    async updateCollectionItem(obj) {
      const userUuid = this.getCurrentUserUuid,
        userId = this.getCurrentUserId

      await UpdateService.updateCollectionItem(
        this.$apollo,
        obj,
        userId,
        userUuid
      )
      this.toggleModal()
      this.$root.$emit('refetchTax')
      this.$root.$emit('refetchItems')
    },
    enableSendData() {
      this.$root.$on('sendData', data => {
        const { dataObj, formId, isEditing } = data

        // console.log('dataObj', dataObj)
        // item form
        if (formId == 'itemForm') {
          isEditing
            ? this.updateCollectionItem(dataObj)
            : this.addCollectionItemAndMaybeTags(dataObj)
        } else {
          // cat from
          const tax = formId === 'catForm' ? 'cat' : 'tag'
          isEditing
            ? this.updateTaxonomyItem(dataObj, tax)
            : this.addTaxonomyItem(dataObj, tax)
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
        this.$root.$emit('fireModalSetData')
        this.target = data.target
        //this.currentModalForm =

        this.isEditing = data.isEditing

        data.taxUuid ? (this.taxUuid = data.taxUuid) : (this.taxUuid = null)
        this.currentModalForm =
          this.target === 'item' ? 'PrtItemForm' : 'PrtTaxForm'
        this.toggleModal()
      })
    }
  }
}
