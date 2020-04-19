import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

window.imagesLoaded = require('imagesloaded')
import '@/assets/css/tailwind.css'
import '@/assets/scss/index.scss'
import vuescroll from 'vuescroll'
// You can set global config here.

const scrollOpts = {
  vuescroll: {},
  scrollPanel: {},
  rail: {},
  bar: {
    showDelay: 500,
    onlyShowBarOnScroll: true,
    keepShow: false,
    background: '#c1c1c1',
    opacity: 1,
    hoverStyle: false,
    specifyBorderRadius: false,
    minSize: 0,
    size: '6px',
    disable: false
  }
}
Vue.use(vuescroll, {
  ops: scrollOpts
})

// apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
Vue.config.productionTip = false

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = JSON.parse(localStorage.user_info)

  const token = user.idToken

  const tokenString = token ? `Bearer ${token}` : ''

  // return the headers to the context so httpLink can read them #
  return {
    headers: {
      ...headers,
      Authorization: tokenString
    }
  }
})

const httpLink = new HttpLink({
  uri: 'https://vue-bm-items.herokuapp.com/v1/graphql'
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // defaultOptions: defaultOptions,
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
