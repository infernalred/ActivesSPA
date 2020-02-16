import axios from 'axios';

const state = {
    users: []
};

const mutations = {
    'LOAD_USERS' (state, users) {
        state.users = users;
    }
};

const actions = {
    allUsers: ({commit}) => {
        axios.get('/actives/GetUsers')
            .then(res => {
                const users = res.data;
                commit('LOAD_USERS', users);
                })
    }
};

const getters = {
    users: state => {
        return state.users;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
