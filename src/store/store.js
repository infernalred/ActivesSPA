import Vue from 'vue';
import Vuex from 'vuex';

import computers from './modules/computers';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        computers,
        users
    }
});
