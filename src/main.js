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

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
