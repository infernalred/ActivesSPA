const state = {
    computers: []
};

const mutations = {
    'LOAD_COMPUTERS' (state, computers) {
        state.computers = computers;
    }
};

const actions = {
    allComputers: ({commit}) => {
        commit('LOAD_COMPUTERS', computers);
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
