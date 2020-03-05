import axios from 'axios';

const state = {
    monitor: null
};

const mutations = {
    'SET_MONITOR' (state, payload) {
        state.monitor = payload;
    },
    'SAVE_MONITOR' (state, payload) {
        state.monitor = payload;
    }
};

const actions = {
    getMonitor2 ({commit}, id) {
        axios.get('/actives/GetMonitor/' + id)
            .then(res => {
                let monitor = res.data;
                commit('SET_MONITOR', monitor);
            })

    },
    getMonitor ({commit}, id) {
        return new Promise((resolve, reject) => {
            axios.get('/actives/GetMonitor/' + id)
                .then(res => {
                    let monitor = res.data;
                    commit('SET_MONITOR', monitor);
                    resolve(monitor);
                }, error => {
                    reject(error);
                })
        })

    },
    addMonitor ({commit}, monitor) {
        return new Promise((resolve, reject) => {
            axios.post('/actives/addMonitor', monitor)
                .then(res => {
                    commit('SAVE_MONITOR', monitor);
                    resolve(res);
                }, error => {
                    reject(error);
                })
        })
    },
    updateMonitor ({commit}, monitor) {
        return new Promise((resolve, reject) => {
            const id = monitor.id;
            axios.put('/actives/UpdateMonitor/' + id, monitor)
                .then(res => {
                    commit('SAVE_MONITOR', monitor);
                    resolve(res);
                }, error => {
                    reject(error);
                })
        })
    }

};

const getters = {
    getMonitor: state => {
        return state.monitor;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
