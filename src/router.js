import Vue from 'vue'
import Computers from './components/computer/Computers.vue';
import Monitors from './components/monitor/Monitors.vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Computers },
    { path: '/computers', component: Computers },
    { path: '/monitors', component: Monitors },
]

export default new VueRouter({mode: 'history', routes})
