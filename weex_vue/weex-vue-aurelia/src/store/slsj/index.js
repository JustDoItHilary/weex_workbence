// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as mutations from './mutations'
import base from '../modules/base'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
    Vue.use(Vuex)
}

const store = new Vuex.Store({
    actions,
    mutations,
    modules:{
        base
    },

    state: {
        slsjList:[],
        slsjSpecial:{
            aIndex:'',
            qIndex:'',
            modelIndex:''
        },

    },

    getters: {
        /** -----------------slsj------------------*/
        slsjList(state){
            return state.slsjList
        },
        slsjSpecial(state){
            return state.slsjSpecial
        },
    }
})

export default store
