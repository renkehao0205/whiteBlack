// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/common.css'
import router from './router'
import Element from 'element-ui'
import Vant from 'vant'
import store from '@/store'
import 'vant/lib/index.css'
import './api/index'
Vue.use(Element)
Vue.use(Vant)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
