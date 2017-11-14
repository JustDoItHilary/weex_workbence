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
        baseUrl: '',
        // selfToken:'@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--',
        // selfToken:'@@OTk5OTk5fEAxNTYyMTg1NjUzM3xAMTFhOGY0MDZiYzc5OWMwOTRjNzFiMmEwYjg5OWU4YWZ8QHYzLjIuMWMxNzA4Mjl8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi',
        selfToken: '',

        tabs: [
            {
                index: 0,
                tit: "今日任务",
                titColor: "#000",
                activeTitColor: "#F00",
                imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                src: "/toTask",
                visiable: true
            },
            {
                index: 1,
                tit: "今日完成",
                titColor: "#000",
                activeTitColor: "#F00",
                imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                src: "/userInfo",
                visiable: false
            },
            {
                index: 2,
                tit: "我的顾客",
                titColor: "#000",
                activeTitColor: "#F00",
                imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                src: "/toTask",
                visiable: false
            },
            {
                index: 3,
                tit: "销量统计",
                titColor: "#000",
                activeTitColor: "#F00",
                imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                src: "/userInfo",
                visiable: false
            }
        ],
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
        getTab(state){
            return state.tabs
        }
    }
})

export default store
