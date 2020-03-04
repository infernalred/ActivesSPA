import axios from "axios";

const state = {
    monitors: []
};

const mutations = {
    'LOAD_MONITORS' (state, monitors2) {
        state.monitors = monitors2;
        //for (let i in monitors2) {
        //    state.monitors.push(monitors2[i]);
        //}
    }
};

const actions = {
    allMonitors: ({commit}) => {
        axios.get('/Actives/GetMonitors')
            .then(res => {
                const monitors = res.data
                commit('LOAD_monitors', monitors);
            })
            .catch(error => console.log(error))
    },
    allMonitorsPage ({commit}, params) {
        return new Promise((resolve, reject) => {
            axios.get('/Actives/GetMonitors?search=' + params.search + '&pageNumber=' + params.page)
                .then(res => {
                    const monitors2 = res.data;
                    console.log(monitors2);
                    commit('LOAD_MONITORS', monitors2);
                    resolve(res);
                }, error => {
                    reject(error);
                })
        })

    }
};

const getters = {
    monitors: state => {
        return state.monitors;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
