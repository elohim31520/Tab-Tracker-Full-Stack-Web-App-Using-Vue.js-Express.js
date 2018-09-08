import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: '',
        isLoggedIn: false,
        nowViewingSong: {}
    },
    mutations: {
        setToken(state, token) {
            // console.log("來自action的請求")
            state.token = token
            state.isLoggedIn = true
            // console.log(state.token)
        },
        setTokentoNull(state) {
            state.isLoggedIn = false
            state.token = null
        },
        setTheViewingData(state,songData) {
            state.nowViewingSong = songData
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setTokentoNull({ commit }) {
            commit('setTokentoNull')
        },
        setTheViewingData({ commit }, songData) {
            commit('setTheViewingData',songData)
        }
    }

})