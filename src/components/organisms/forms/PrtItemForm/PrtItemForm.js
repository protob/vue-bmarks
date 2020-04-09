import { ValidationObserver } from 'vee-validate'
import { SchemaForm } from 'formvuelatte'

import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtInput from '@/components/atoms/form/PrtInput/PrtInput.vue'
import PrtTextarea from '@/components/atoms/form/PrtTextarea/PrtTextarea.vue'
import PrtForm from '@/components/organisms/forms/PrtForm/PrtForm.vue'
const FORM_SCHEMA = {
  email: {
    component: PrtInput,
    label: 'name',
    rules: 'required'
  },
  password: {
    component: PrtInput,
    label: 'url',
    rules: 'required'
  },
  desc: {
    component: PrtTextarea,
    label: 'desc',
    rules: 'required|max:500'
  },
  tags: {
    component: PrtInput,
    label: 'tags',
    rules: ''
  }
}
export default {
  name: 'PrtItemForm',
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
