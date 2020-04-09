export default {
  name: 'PrtTextarea',
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    label: {
      type: String,
      default: null
    },

    name: {
      type: String,
      default: null
    },

    type: {
      type: String,
      default: 'text'
    },

    valid: {
      type: Boolean,
      default: undefined
    },
    message: {
      type: String,
      default: null
    },

    required: {
      type: Boolean,
      default: false,
      description: 'Native input required attribute'
    },

    disabled: {
      type: Boolean,
      default: false,
      description: 'Native input disabled attribute'
    },

    ariaLabel: {
      type: String,
      default: null
    },
    hasShowPassword: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isPasswordVisible: false,
      inputType: ''
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      }
    },
    isPassword() {
      return this.type === 'password' && this.hasShowPassword
    }
  },
  watch: {
    type: {
      immediate: true,
      handler: function(value) {
        this.inputType = value
      }
    }
  },
  methods: {
    switchVisibilityPassword() {
      this.isPasswordVisible = !this.isPasswordVisible
      this.inputType = this.isPasswordVisible ? 'text' : 'password'
    }
  }
}
