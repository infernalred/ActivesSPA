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
    'LOAD_COMPUTER' (state, computers) {
        state.computers = computers;
    }
};

const actions = {
    allComputers: ({commit}) => {
        commit('LOAD_COMPUTER');
    }
};

const getters = {
    computer: state => {
        return state.computer;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
