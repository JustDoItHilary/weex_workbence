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
        applyTypes:[
            // {GUID: 'e35ac823-5a4e-11e7-af47-ec388f6f5b1d', NAME: '加班'},
            // {GUID: 'e35ac823-5a4e-11e7-af47-ec388f6f5b1d', NAME: '团建'}
        ],
        applyLists:[
            // {"APPLOYCONTENT":"hfhfhfhfhffhhf","APPROVER":"18653206277","ENDTIME":"","EXCEPTTIME":"2017-07-14","GUID":"f8f9692c2df849887c00d7b1619c749c","ISAPPLED":"0","ISAPPLEDNAME":"未审批","ISFINISH":"0","STARTTIME":"2017-06-30","TYPE":"e35ac823-5a4e-11e7-af47-ec388f6f5b1d","TYPENAME":"团建","UPDATED":"1498814099","USERID":"579ef2e0ee5f6"}
            ],
        applyReaderList:{
            type:'',
            approveList:[],
            noticeList:[],
        },
        applyDetails:{
            // "APPLOYCONTENT":"了了了了了了了了","APPNAME":"张海月","APPROVER":"579ef2e0ee5f6","DATA":[{"GUID":"2a3cd03f9412a50e3dabdb91429e63c3","USERNAME":"张海月"}],"ENDTIME":"","EXCEPTTIME":"2017-07-05","FINISHNAME":"未完成","GUID":"12dbecfaacd1a4609af8991ab853b283","ISAPPLED":"0","ISAPPLEDNAME":"未审批","ISFINISH":"0","STARTTIME":"2017-07-05","TYPE":"e35ac823-5a4e-11e7-af47-ec388f6f5b1d","TYPENAME":"团建","UPDATED":"1499205955","USERID":"579ef2e0ee5f6"
        },
        applyMemberLists:[],

    },

    getters: {
        /** -----------------apply------------------*/
        //申请类型列表
        applyType(state){
            return state.applyTypes
        },
        //申请列表
        applyList(state){
            return state.applyLists
        },
        //选中的审批者、知会者
        applyReader(state){
            return state.applyReaderList
        },
        //申请详情
        applyDetail(state){
            return state.applyDetails
        },
        //员工列表
        applyMember(state){
            return state.applyMemberLists
        },
        //新增申请的内容（解决跳转到添加人员页后所输入的内容消失问题）
        applyGetInput(state){
            return state.applyInput
        },
    }
})

export default store
