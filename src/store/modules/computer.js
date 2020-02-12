const state = {
    computer: {
        id: 0,
        inventory: '',
        name: '',
        comment: '',
        lastUpdate: '',
        outOffOffice: false,
        broken: false,
        user: {
            id: 0,
            name: '',
            room: {

            }
        },
        network: {
            id: 0,
            ipAddress: '',
            mac: ''
        }
    }
};

const mutations = {
    'LOAD_COMPUTERS' (state, computers) {
        state.computers = computers;
    }
};

const actions = {
    allComputers: ({commit}) => {
        commit('LOAD_COMPUTERS');
    }
};

const getters = {
    computers: state => {
        return state.computers;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
