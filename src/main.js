import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql'
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

window.imagesLoaded = require('imagesloaded');
import '@/assets/css/tailwind.css'
import "@/assets/scss/index.scss";
new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')