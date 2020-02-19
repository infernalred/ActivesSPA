import Vue from 'vue'
import Computers from './components/computer/Computers.vue';
import Computer from './components/computer/Computer.vue';
import ComputerEdit from './components/computer/ComputerEdit.vue';
import Monitors from './components/monitor/Monitors.vue';
import Monitor from './components/monitor/Monitor.vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Computers },
    { path: '/computers', component: Computers },
    { path: '/computer', component: Computer, },
    { path: '/computer/:id/edit', component: ComputerEdit, name: 'computerEdit' },
    { path: '/monitors', component: Monitors },
    { path: '/monitor', component: Monitor },
    { path: '/monitor/:id', component: Monitor },
    {path: '*', redirect: '/'}
]

export default new VueRouter({mode: 'history', routes})
