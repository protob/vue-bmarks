import PrtBar from '@/components/molecules/PrtBar/PrtBar.vue'
import PrtOverlay from '@/components/atoms/PrtOverlay/PrtOverlay.vue'
import PrtIcon from '@/components/atoms/PrtIcon/PrtIcon.vue'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  name: 'PrtModal',

  components: {
    PrtBar,
    PrtOverlay,
    PrtIcon
  },
  model: {
    prop: 'visible',
    event: 'close'
  },
  props: {
    showDesktopBar: {
      type: Boolean,
      default: true
    },
    /**
     * Heading title of the modal
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Visibility of the modal
     */
    visible: {
      type: Boolean,
      default: false
    },
    /**
     * Cross closing modal button
     */
    cross: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to show the overlay
     */
    overlay: {
      type: Boolean,
      default: true
    },
    /**
     * If true clicking outside will not dismiss the modal
     */
    persistent: {
      type: Boolean,
      default: false
    },
    /**
     * overlay transition effect
     */
    transitionOverlay: {
      type: String,
      default: 'fade'
    },
    /**
     * overlay transition effect
     */
    transitionModal: {
      type: String,
      default: 'fade'
    },
    /**
     * aria-label of the close button
     */
    ariaLabelClose: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      staticClass: null,
      className: null
    }
  },
  watch: {
    visible: {
      handler: function(value) {
        if (typeof window === 'undefined' || typeof document === 'undefined')
          return
        if (value) {
          this.$nextTick(() => {
            disableBodyScroll(this.$refs.content)
          })
          document.addEventListener('keydown', this.keydownHandler)
        } else {
          clearAllBodyScrollLocks()
          document.removeEventListener('keydown', this.keydownHandler)
        }
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    checkPersistence() {
      if (!this.persistent) {
        this.close()
      }
    },
    keydownHandler(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.close()
      }
    },
    classHandler() {
      if (this.staticClass !== this.$vnode.data.staticClass) {
        this.staticClass = this.$vnode.data.staticClass
      }
      if (this.className !== this.$vnode.data.class) {
        this.className = this.$vnode.data.class
      }
    }
  }
}
