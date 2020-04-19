import { ValidationObserver } from 'vee-validate'
import { SchemaForm } from 'formvuelatte'

import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'

import PrtInput from '@/components/atoms/form/PrtInput/PrtInput.vue'

import PrtForm from '@/components/organisms/forms/PrtForm/PrtForm.vue'
import { mapGetters } from 'vuex'
const FORM_SCHEMA = {
  name: {
    component: PrtInput,
    label: 'name',
    rules: 'required'
  }
}
export default {
  name: 'PrtTaxForm',
  components: { SchemaForm, ValidationObserver, PrtButton, PrtForm },
  data: () => {
    return {
      formData: { uuid: null },
      success: null
    }
  },
  props: {
    tax: {
      type: String,
      required: true,
      default: 'cat'
    }
  },
  created() {
    this.setData()
    this.$root.$on('fireModalSetData', () => {
      //next run
      this.success = false // It is required to reset form input data
      this.setData()
    })
  },
  computed: {
    ...mapGetters(['getCurrentUserUuid', 'getModalForm', 'getFormMode']),
    schema() {
      return FORM_SCHEMA
    },
    submitLabel() {
      return this.getModalForm.isEditing ? 'Submit' : 'Add'
    }
  },
  methods: {
    resetData(forceUpdate = true) {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = ''
      })

      if (forceUpdate) {
        this.$forceUpdate()
      }
    },
    setData() {
      this.resetData(false)

      this.isBookmark = this.getModalForm.isBookmark
      this.catUuid = this.getModalForm.catUuid
      if (this.getModalForm.isEditing) {
        this.formData.uuid = this.getModalForm.taxUuid // tax uid is itemuid
        this.formData.name = this.getModalForm.taxName

        //------

        this.formData.slug = this.getModalForm.slug
        this.formData.url = this.getModalForm.url
        this.formData.tags = this.getModalForm.tags
          ? this.getModalForm.tags.map(item => item.name).join(',') // make sting from array
          : ''
        this.formData.desc = this.getModalForm.desc
      }
      this.$forceUpdate()
    },

    submitForm() {
      // uuid is needed for ediuting
      let dataObj = {
        uuid: this.formData.uuid,
        name: this.formData.name
      }

      this.$root.$emit('sendData', {
        dataObj,
        formId: this.tax === 'cat' ? 'catForm' : 'tagForm',
        isEditing: this.getModalForm.isEditing
      })
      this.resetData()
      this.success = true
    }
  }
}
