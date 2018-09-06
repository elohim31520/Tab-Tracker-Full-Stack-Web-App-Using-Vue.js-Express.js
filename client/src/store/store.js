import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: '',
        isLoggedIn: false
    },
    mutations:{
        setToken(state,token){
            // console.log("來自action的請求")
            state.token = token
            state.isLoggedIn = true
            // console.log(state.token)
        },
        setTokentoNull(state){
            state.isLoggedIn = false
            state.token = null
        }
    },
    actions:{
        setToken({ commit },token){
            // console.log('有呼叫vuex',token)
            commit('setToken',token)
        },
        setTokentoNull({ commit }){
            commit('setTokentoNull')
        }
    }

})