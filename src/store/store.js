import Vue from 'vue';
import Vuex from 'vuex';

import computers from "./modules/computers";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        computers
    }
});
