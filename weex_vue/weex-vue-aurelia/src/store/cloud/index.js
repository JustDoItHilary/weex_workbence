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
        //大平台账号
        // userPlatformCode:'58ba8990f0e2467ab167b5a002fb13cd',
        // userPlatformCode:'0b746d1651c04b569471db9bc18117cc',
        // userPlatformCode:'1691439ac13a4e53a69ba7c1cc508ad0',//
        // userPlatformCode:'8b107c27c2b84630b5d12cad65d6e13b',//me
        // userPlatformCode:'133a751178924c7f936fb70b4b306e46',//ZHOULISI
        // userPlatformCode:'545e1ced3b364bbabf44bb2b72903862',//废弃：测试-大波
        // userPlatformCode:'fd6d8670cc9946a19b1fc92605a77347',
        userPlatformCode:'cd47e31df52647a0bdb5fffc6c8d6718',//大波
        // userPlatformCode:'',

        cloudFolder:[],
        cloudFile:[],
    },

    getters: {
        getUserPlatformCode(state){
            return state.userPlatformCode;
        },

        getCloudFolder(state){
            return state.cloudFolder;
        },
        getCloudFile(state){
            return state.cloudFile;
        },
    }
})

export default store
