import axios from 'axios';

const state = {
    vendors: []
};

const mutations = {
    'LOAD_VENDORS' (state, vendors) {
        state.vendors = vendors;
    }
};

const actions = {
    allVendors: ({commit}) => {
        axios.get('/actives/GetVendors')
            .then(res => {
                const vendors = res.data;
                commit('LOAD_VENDORS', vendors);
            })
    }
};

const getters = {
    vendors: state => {
        return state.vendors;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
