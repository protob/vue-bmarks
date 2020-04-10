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
      formData: {}
    }
  },
  computed: {
    schema() {
      return FORM_SCHEMA
    }
  },
  methods: {
    resetData(forceUpdate = true) {
      Object.keys(this.data).forEach(key => {
        this.data[key] = ''
      })

      if (forceUpdate) {
        this.$forceUpdate()
      }
    },
    submit() {
      let data = {
        uuid: this.data.uuid,
        name: this.data.name
      }

      this.$root.$emit('sendData', {
        json: data,
        formId: 'catForm',
        isEditing: false
      })
      this.resetData()
      this.success = true
    }
  }
}
