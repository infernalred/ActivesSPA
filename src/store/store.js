import Vue from 'vue';
import Vuex from 'vuex';

import computers from './modules/computers';
import computer from './modules/computer';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        computers,
        users,
        computer
    }
});
