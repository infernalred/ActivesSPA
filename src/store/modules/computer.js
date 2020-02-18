import axios from 'axios';

const state = {
    computer: null,
    computers: []
};

const mutations = {
    'SET_COMPUTER' (state, payload) {
        state.computer = payload;
        state.computer.user = payload.user;
        state.computer.user.room = payload.user.room;
        state.computer = payload;
    },
    'SAVE_COMPUTER' (state, payload) {
        state.computers.push(payload);
    }
};

const actions = {
    getComputer2 ({commit}, id) {
        axios.get('/actives/GetComputer/' + id)
            .then(res => {
                let computer = res.data;
                console.log(computer.user.room)
                commit('SET_COMPUTER', computer);
            })

    },
    getComputer ({commit}, id) {
        return new Promise((resolve, reject) => {
        axios.get('/actives/GetComputer/' + id)
            .then(res => {
                let computer = res.data;
                console.log(computer.user.room)
                commit('SET_COMPUTER', computer);
                resolve(computer);
            }, error => {
            reject(error);
            })
        })

    },
    addComputer ({commit}, computer) {
        axios.post('/actives/addComputer', computer)
            .then(res => {
                console.log(res)
                commit('SAVE_COMPUTER', computer)
            })
            .catch(error => console.log(error))
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
