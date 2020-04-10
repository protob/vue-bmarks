import PrtButton from '@/components/atoms/PrtButton/PrtButton.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'PrtLoginToolbar',
  components: {
    PrtButton
  },
  computed: {
    isLoggedIn() {
      return this.getUser()
    },
    buttonText() {
      return this.isLoggedIn ? 'Logout' : 'Login'
    }
  },
  methods: {
    ...mapGetters('account', { getUser: 'getUser' }),
    authAction() {
      if (this.isLoggedIn) {
        this.logout()
      } else {
        this.login()
      }
    },
    logout() {
      this.$store.dispatch('account/logout')
    },
    login() {
      this.$store.dispatch('account/login')
    }
  }
}
