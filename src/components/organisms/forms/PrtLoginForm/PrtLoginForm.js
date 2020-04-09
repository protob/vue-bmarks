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
  },
  email: {
    component: PrtInput,
    label: 'email',
    rules: ''
  },
  password: {
    component: PrtInput,
    label: 'password',
    rules: 'required'
  }
}
export default {
  name: 'PrtLoginForm',
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
  }
}
