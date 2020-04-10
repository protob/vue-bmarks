<template>
  <div id="app" class="flex flex flex-col min-h-screen bg-gray-400">
    <!-- <PrtOverlay :visible="false" /> -->
    <PrtModalForm />
    <PrtHeader />

    <main class="app__content flex flex-wrap flex-grow " v-if="getUser()">
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
export default {
  components: {
    PrtHeader,
    PrtFooter,
    PrtSidebar,
    PrtModalForm
  },
  methods: {
    getUser() {
      const userInfo = JSON.parse(localStorage.getItem('user_info'))
      return userInfo && new Date().getTime() < userInfo.expiresAt
        ? userInfo
        : null
    }
  },
  computed: {}
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
