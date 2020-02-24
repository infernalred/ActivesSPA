import axios from 'axios';

const state = {
    computer: null,
    computers: [],
};

const mutations = {
    'SET_COMPUTER' (state, payload) {
        state.computer = payload;
    },
    'SAVE_COMPUTER' (state, payload) {
        state.computer = payload;
    }
};

const actions = {
    getComputer2 ({commit}, id) {
        axios.get('/actives/GetComputer/' + id)
            .then(res => {
                let computer = res.data;
                commit('SET_COMPUTER', computer);
            })

    },
    getComputer ({commit}, id) {
        return new Promise((resolve, reject) => {
        axios.get('/actives/GetComputer/' + id)
            .then(res => {
                let computer = res.data;
                commit('SET_COMPUTER', computer);
                resolve(computer);
            }, error => {
            reject(error);
            })
        })

    },
    addComputer ({commit}, computer) {
        return new Promise((resolve, reject) => {
            axios.post('/actives/addComputer', computer)
                .then(res => {
                    commit('SAVE_COMPUTER', computer);
                    resolve(res);
                }, error => {
                    reject(error);
                })
        })
    },
    updateComputer ({commit}, computer) {
        return new Promise((resolve, reject) => {
            const id = computer.id;
            console.log(computer)
            axios.put('/actives/UpdateComputer/' + id, computer)
                .then(res => {
                    console.log('update ', computer.id)
                    commit('SAVE_COMPUTER', computer);
                    resolve(res);
                }, error => {
                    reject(error);
                })
        })
    }

};

const getters = {
    getComputer: state => {
        return state.computer;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
