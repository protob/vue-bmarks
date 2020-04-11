const slugify = require('slugify')
const uuidv4 = require('uuid/v4')
import { ValidationObserver } from 'vee-validate'
import { SchemaForm } from 'formvuelatte'

import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'
import PrtInput from '@/components/atoms/form/PrtInput/PrtInput.vue'
import PrtTextarea from '@/components/atoms/form/PrtTextarea/PrtTextarea.vue'
import PrtForm from '@/components/organisms/forms/PrtForm/PrtForm.vue'

import { mapGetters } from 'vuex'
const FORM_SCHEMA = {
  name: {
    component: PrtInput,
    label: 'name',
    rules: 'required'
  },
  url: {
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
      catUuidFromVuex: '',
      isEditing: false,
      formData: {},
      success: null
    }
  },
  props: {
    tax: {
      type: String,
      required: true,
      default: 'item'
    }
  },
  computed: {
    ...mapGetters(['getCurrentUserUuid', 'getModalForm', 'getFormMode']),
    schema() {
      return FORM_SCHEMA
    }
  },

  created() {
    // first run
    this.setData()

    this.$root.$on('fireModalSetData', () => {
      //next run
      this.success = false // It is required to reset form input data
      this.setData()
    })
  },

  methods: {
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
      this.catUuidFromVuex = this.getModalForm.catUuid

      let dataObj = {
        uuid: this.getModalForm.isEditing ? this.formData.uuid : uuidv4(),
        name: this.formData.name,
        slug: slugify(this.formData.name),
        url: this.formData.url,
        desc: this.formData.desc,
        tags: this.formData.tags,
        catUuid: this.catUuidFromVuex
      }

      this.$root.$emit('sendData', {
        dataObj,
        formId: 'itemForm',
        isEditing: this.getModalForm.isEditing
      })
      this.resetData()
      this.success = true
    }
  }
}
