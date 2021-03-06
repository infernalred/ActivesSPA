import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './store/store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

axios.defaults.baseURL = 'http://localhost:63001/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'pagination';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
