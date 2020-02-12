import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './store/store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

axios.defaults.baseURL = 'http://localhost:63001/api'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
