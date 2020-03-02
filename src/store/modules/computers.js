import axios from "axios";

const state = {
    computers: []
};

const mutations = {
    'LOAD_COMPUTERS' (state, computers2) {
        state.computers = computers2;
        //for (let i in computers2) {
        //    state.computers.push(computers2[i]);
        //}
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
    },
    allComputersPage ({commit}, page) {
        return new Promise((resolve, reject) => {
        axios.get('/Actives/GetComputers?pageNumber=' + page)
            .then(res => {
                    const computers2 = res.data
                    commit('LOAD_COMPUTERS', computers2);
                    resolve(res);
            }, error => {
                reject(error);
            })
            })

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
