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
        // userPlatformCode:'cd47e31df52647a0bdb5fffc6c8d6718',//大波
        userPlatformCode:'',
        repList:[], //我的汇报列表
        lastWeekRepDetails:{}, //上周 rep 详情
        repDetails:{},//rep 详情
        readerList:[],//添加的审核人员
        empList:[],//所有审核人员
        reviewList:[],//待审核人员
        lastNFNum:'',//上周待审核的 rep 的数量
        repStatistics:[],//周报提交统计请况
        assessment:[],//审核评价
        isSelected:true,//workRep 首页当前显示的是否为"我的汇报"
    },

    getters: {
        /** -----------------REP------------------*/
        getUserPlatformCode(state){
            return state.userPlatformCode;
        },
        getRepList(state){
            return state.repList
        },
        getRepDetails(state){
            return state.repDetails
        },
        getLastWeekDetails(state){
            return state.lastWeekRepDetails
        },
        getReaderList(state){
            return state.readerList
        },
        getEmpList(state){
            return state.empList
        },
        getReviewList(state){
            return state.reviewList
        },
        getLastNFNum(state){
            return state.lastNFNum
        },
        getRepStatistics(state){
            return state.repStatistics
        },
        getAssessment(state){
            return state.assessment
        },
        getSelected(state){
            return state.isSelected
        },

    }
})

export default store
