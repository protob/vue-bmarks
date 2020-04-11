import { ValidationObserver } from 'vee-validate'
import { SchemaForm } from 'formvuelatte'

import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'

import PrtInput from '@/components/atoms/form/PrtInput/PrtInput.vue'

import PrtForm from '@/components/organisms/forms/PrtForm/PrtForm.vue'
const FORM_SCHEMA = {
  name: {
    component: PrtInput,
    label: 'name',
    rules: 'required'
  }
}
export default {
  name: 'PrtCatForm',
  components: { SchemaForm, ValidationObserver, PrtButton, PrtForm },
  data: () => {
    return {
      formData: { uuid: null },
      success: null
    }
  },
  computed: {
    schema() {
      return FORM_SCHEMA
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
    submitForm() {
      // uuid is needed for ediuting
      let dataObj = {
        uuid: this.formData.uuid,
        name: this.formData.name
      }

      this.$root.$emit('sendData', {
        dataObj,
        formId: 'catForm',
        isEditing: false
      })
      this.resetData()
      this.success = true
    }
  }
}
