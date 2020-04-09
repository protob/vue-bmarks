import Vue from 'vue'
import PrtSelectOption from './_internal/PrtSelectOption.vue'
Vue.component('PrtSelectOption', PrtSelectOption)
export default {
  name: 'PrtSelect',
  components: {},
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: ''
    },

    selected: {
      type: [String, Number, Object],
      default: ''
    },

    size: {
      type: Number,
      default: 5
    },

    required: {
      type: Boolean,
      default: false
    },

    valid: {
      type: Boolean,
      default: undefined
    },

    errorMessage: {
      type: String,
      default: 'This field is not correct.'
    }
  },
  data() {
    return {
      open: false,
      options: [],
      indexes: {},
      optionHeight: 0
    }
  },
  computed: {
    index: {
      get() {
        const stringified = this.indexes[JSON.stringify(this.selected)]
        if (typeof stringified === 'undefined') {
          return -1
        }
        return stringified
      },
      set(index) {
        this.$emit('change', this.options[index].value)
      }
    },
    html() {
      if (this.index < 0) return
      return this.options[this.index].html
    },
    maxHeight() {
      if (!this.size) return
      return `${this.optionHeight * this.size}px`
    },
    isActive() {
      return this.open
    },
    isSelected() {
      return this.selected
    }
  },
  watch: {
    open: {
      immediate: true,
      handler: function(visible) {
        if (visible) {
          this.$nextTick(() => {
            this.optionHeight = this.$slots.default[0].elm.offsetHeight
          })
        }
      }
    }
  },

  mounted: function() {
    const options = []
    const indexes = {}
    let i = 0
    if (!this.$slots.default) return
    this.$on('update', this.update)
    this.$slots.default.forEach(slot => {
      if (!slot.tag) return
      options.push({
        ...slot.componentOptions.propsData,
        html: slot.elm.innerHTML
      })
      indexes[JSON.stringify(slot.componentOptions.propsData.value)] = i
      i++
    })
    this.options = options
    this.indexes = indexes
  },
  beforeDestroy: function() {
    this.$off('update', this.update)
  },
  methods: {
    update(index) {
      this.index = index
    },
    move(payload) {
      const optionsLength = this.options.length
      let index = this.index
      index += payload
      if (index < 0) index = 0
      if (index >= optionsLength) index = optionsLength - 1
      this.index = index
    },
    enter() {
      this.toggle()
    },
    toggle(event) {
      if (this.$refs.cancel && event.target.contains(this.$refs.cancel.$el)) {
        return
      }
      this.open = !this.open
    },
    openHandler() {
      this.open = true
    },
    closeHandler() {
      this.open = false
    }
  }
}
