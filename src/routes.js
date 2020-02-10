import Computers from './components/computer/Computers.vue';
import Monitors from './components/monitor/Monitors.vue';

export const routes = [
    { path: '/', component: Computers },
    { path: '/computers', component: Computers },
    { path: '/monitors', component: Monitors },
];
