<template>
  <div id="app" class="flex flex flex-col min-h-screen bg-gray-400">
    <PrtModalConfirm />
    <PrtModalForm />
    <PrtHeader />

    <main
      class="app__content flex flex-wrap flex-grow"
      :class="!getUser() ? 'justify-center flex-col' : ''"
    >
      <div class="w-full sm:w-3/8 lg:w-2/8" v-if="getUser()">
        <PrtSidebar />
      </div>
      <div class="w-full sm:w-5/8 lg:w-6/8" v-if="getUser()">
        <router-view />
      </div>
      <router-view v-else />
    </main>

    <PrtFooter class="py-6" />
  </div>
</template>
<script>
import PrtHeader from '@/components/organisms/layout/PrtHeader/PrtHeader.vue'
import PrtFooter from '@/components/organisms/layout/PrtFooter/PrtFooter.vue'
import PrtSidebar from '@/components/organisms/layout/PrtSidebar/PrtSidebar.vue'
import PrtModalForm from '@/components/organisms/PrtModalForm/PrtModalForm.vue'
import PrtModalConfirm from '@/components/organisms/PrtModalConfirm/PrtModalConfirm.vue'
import UserService from '@/services/user.service.js'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    PrtHeader,
    PrtFooter,
    PrtSidebar,
    PrtModalForm,
    PrtModalConfirm
  },
  methods: {
    setUserUuid() {
      UserService.setUserUuid(this.$store, this.$apollo)
    },

    syncUser() {
      UserService.syncUser(this.$store, this.$apollo, this.token)
    },

    getUser() {
      const userInfo = JSON.parse(localStorage.getItem('user_info'))
      return userInfo && new Date().getTime() < userInfo.expiresAt
        ? userInfo
        : null
    }
  },
  computed: {
    ...mapGetters(['getCurrentUserUuid', 'getCurrentUserId']),
    ...mapState('account', {
      user: 'user',
      token: 'token'
    })
  },
  watch: {
    token() {
      this.syncUser()
    }
  },
  mounted() {
    this.setUserUuid()
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

//--
.prt-modal__content {
  --modal-content-padding: 2.5em 2.5em;
}
</style>
