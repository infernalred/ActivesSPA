import axios from "axios";

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
        axios.get('/Actives/GetComputers')
            .then(res => {
                const computers = res.data
                commit('LOAD_COMPUTERS', computers);
            })
            .catch(error => console.log(error))
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
