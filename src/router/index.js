import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Collection from '../views/Collection.vue'

import store from '@/store'
import { authService } from '@/services/auth/AuthService'
import Callback from '@/components/auth/Callback.vue'
import SplashScreen from '@/views/SplashScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen
  },

  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },

  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login
  const publicPages = ['/', '/callback']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.getters['account/getUser']

  if (authRequired && !loggedIn) {
    authService.setReturnUrl(to.fullPath)
    store.dispatch('account/login')
  }

  next()
})

export default router
