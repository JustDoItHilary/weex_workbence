// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as mutations from './mutations'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
    Vue.use(Vuex)
}

const store = new Vuex.Store({
    actions,
    mutations,

    state: {
        baseUrl:'',
        // selfToken:'@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--',
        // selfToken:'@@OTk5OTk5fEAxNTYyMTg1NjUzM3xAMTFhOGY0MDZiYzc5OWMwOTRjNzFiMmEwYjg5OWU4YWZ8QHYzLjIuMWMxNzA4Mjl8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi',
        selfToken:'',

        slsjList:[],
        slsjSpecial:{
            aIndex:'',
            qIndex:'',
            modelIndex:''
        },

    },

    getters: {
        /*------ base ------*/
        baseUrl(state){
            return state.baseUrl
        },
        //本人token
        selfToken(state){
            return state.selfToken
        },

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
