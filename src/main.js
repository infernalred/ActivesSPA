import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import { routes} from "@/routes";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
