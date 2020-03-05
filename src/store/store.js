import Vue from 'vue';
import Vuex from 'vuex';

import computers from './modules/computers';
import computer from './modules/computer';
import users from './modules/users';
import networks from './modules/networks';
import monitors from './modules/monitors';
import monitor from './modules/monitor';
import vendors from './modules/vendors';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        computers,
        users,
        computer,
        networks,
        monitors,
        vendors,
        monitor
    }
});
