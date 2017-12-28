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
        syMemberInfo: [],
        // tabs: [
        //     {
        //         index: 0,
        //         tit: "会员详细信息",
        //         titColor: "#000",
        //         activeTitColor: "#3190e8",
        //         // imgUrl: "http://192.168.100.120:8888/weex/drawable/ic_people_white_48dp.png",
        //         selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/ic_people_white_48dp.png",
        //         src: "/memberInfo",
        //         visiable: true
        //     },
        //     {
        //         index: 1,
        //         tit: "消费记录",
        //         titColor: "#000",
        //         activeTitColor: "#3190e8",
        //         // imgUrl: "http://192.168.100.120:8888/weex/drawable/ic_shopping_cart_white_48dp.png",
        //         selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/ic_shopping_cart_white_48dp.png",
        //         src: "/shopInfo",
        //         visiable: false
        //     },
        //     {
        //         index: 2,
        //         tit: "回访记录",
        //         titColor: "#000",
        //         activeTitColor: "#3190e8",
        //         // imgUrl: "http://192.168.100.120:8888/weex/drawable/ic_local_phone_white_48dp.png",
        //         selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/ic_local_phone_white_48dp.png",
        //         src: "/phoneInfo",
        //         visiable: false
        //     },
        // ],

        memberOperatorList: [],
        memberOperatorCode: '',

        memberInfo: [],

        actSelected:true,
        ongoingAct:[],
        historyAct:[],

        orderDetail:[],

        /*{".expires":"Wed, 29 Nov 2017 09:42:05 GMT",".issued":"Mon, 30 Oct 2017 09:42:05 GMT",
         "access_token":"wd158S_Kt7PVs7sqyqo6-eF-K0qmRhm4s5UPf2D8npqTmd46RIDzeJ0ScUTDbPQsSdKYN9TOFviYLKaRDwtoP_
         Vh7w-HVRq5lrekwPSpoy6Jvtlo2OPOs86F6tBRxotC4ELqyro16job_W7t0OWZa-MUkKBMERG1NEFY-xGFCXEU7f0Gubee4GZXJ7HCqVN8CZNH_
         x6kXGXcvYmhQtT9WKqp3E9vxrzbxsRbF3pSG1IDQMyIB9FlbIKcBjWaY3TZofrooEdWkfLmJBJaeE-SuBLJnYDUfn5CRywrOw6G_
         GvIWuo3TqT7rWRxNYKv0Iso3jkVreJK8U0Q6hT1iR0omA",
         "as:client_id":"[YY365]","expires_in":2591999,
         "refresh_token":"1b3fc4086e754fbe9ca6c3ccc3513ebc","token_type":"bearer"}*/
        // tokens:{
        //     accessToken:'',//
        //     refreshToken:'',//
        //     tokenType:'',//
        //     expiresIn:'',//令牌时效
        //     saveTime:'',//保存时的时间
        // },
    },

    getters: {
        getSyMemberInfo(state){
            return state.syMemberInfo
        },
        // getTab(state){
        //     return state.tabs
        // },
        // getTokens(state){
        //     return state.tokens
        // },
        getMemberOperatorList(state){
            return state.memberOperatorList
        },
        getMemberOperatorCode(state){
            return state.memberOperatorCode
        },
        getMemberInfo(state){
            return state.memberInfo
        },
        getActSelected(state){
            return state.actSelected;
        },
        getOngoingAct(state){
            return state.ongoingAct;
        },
        getHistoryAct(state){
            return state.historyAct;
        },
        getOrderDetail(state){
            return state.orderDetail;
        }
    }
})

export default store
