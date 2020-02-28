const state = {
    networks: [],
};

const mutations = {
    'SET_NETWORK' (state, network) {
        state.networks.push(network);
    },
    'CHANGE_NETWORK' (state, {networkId, ipAddress, mac}) {
        const record = state.networks.find(element => element.id == networkId);
        if (record) {
            record.ipAddress = ipAddress;
            record.mac = mac;
        } else {
            state.networks.push({
                id: networkId,
                ipAddress: ipAddress,
                mac: mac
            });
        }
    },
    'DEL_NETWORK' (state, networkId) {
        const record = state.networks.find(element => element.id == networkId);
        state.networks.splice(state.networks.indexOf(record), 1);
    },
    'ADD_NETWORK' (state, payload) {
        state.networks = payload;
    },
    'CLEAN_NETWORK' (state, payload) {
        state.networks = payload;
    }
};

const actions = {
    initNetwork ({commit}) {
        let network = { id: 1, ip: '', mac: ''};
        network.id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        console.log(network);
        commit('CHANGE_NETWORK', network);
    },
    delNetwork ({commit}, network) {
        commit('DEL_NETWORK', network);
    },
    setNetwork ({commit}, network) {
        commit('CHANGE_NETWORK', network)
    },
    loadNetwork ({commit}, network) {
        commit('ADD_NETWORK', network)
    },
    cleanNetwork ({commit}) {
        let computer = [];
        commit('CLEAN_NETWORK', computer);
    }

};

const getters = {
    networks: state => {
        return state.networks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
