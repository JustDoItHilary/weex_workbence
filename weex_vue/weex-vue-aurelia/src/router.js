// import Vue from 'vue'
import Router from 'vue-router'

/*apply*/
// import ApplyType from './pages/apply/applyType.vue'
// import ApplyList from './pages/apply/applyList.vue'
// import Application from './pages/apply/application.vue'
// import ApplyReader from './pages/apply/applyReader.vue'
// import ApplyDetails from './pages/apply/application-details.vue'

/*rep*/
import WorkRep from './pages/rep/workRep.vue'
import NewRep from './pages/rep/newRep.vue'
import RepDetails from './pages/rep/repDetails.vue'
import RepAssessment from './pages/rep/repAssessment.vue'
import RepReader from './pages/rep/repReader.vue'
import RepTime from './pages/rep/repTime.vue'
import RepHistory from './pages/rep/repHistory.vue'
import RepStatistics from './pages/rep/repStatistics.vue'

/*slsj*/
// import SlsjNew from './pages/slsj/slsjNew.vue'
// import SlsjEdit from './pages/slsj/slsjEdit.vue'
// import SlsjNew from './pages/slsj/slsj-new.vue'
// import SlsjEdit from './pages/slsj/slsj-edit.vue'

// import ElmHome from './pages/ele/home.vue'
// import ElmCity from './pages/ele/city.vue'
//
// /*ww-msg*/
// import WWDetails from './pages/ww/ww-details.vue'
//
/*ww-yyzs*/
// import SyActivityDetails from './pages/ww/yyzs/sy-activity-details.vue'
// import SyActivity from './pages/ww/yyzs/sy-activity.vue'
// import SyMember from './pages/ww/yyzs/sy-member.vue'
// import SYMain from './pages/ww/yyzs/sy-main.vue'
// import GetToken from './pages/ww/yyzs/getToken.vue'
// import MemberOperator from './pages/ww/yyzs/memberOperator.vue'

/*nj*/
// import Main from './pages/nj/main.vue'
// import ToTask from './pages/nj/toTask.vue'
// import UserInfo from './pages/nj/userInfo.vue'
// //
// import Error from './pages/ww/error.vue'

import TestAurelia from './testAurelia.vue'
// import Test from './foo.vue'
import Test from './vue/components/input.vue'


Vue.use(Router)

export default new Router({
    // mode: 'abstract',
    routes: [
         /*apply*/
        // {
        //     path: '/applyType',
        //     component: ApplyType,
        //     name: 'home',
        //     meta: {
        //         keepAlive: false
        //     }
        // },
        // {
        //     path: '/applyList/:item',
        //     component: ApplyList,
        //     name: 'applyList',
        //     meta: {
        //         keepAlive: false
        //     }
        // },
        // {
        //     path: '/application/:params',
        //     component: Application,
        //     name: 'application',
        //     meta: {
        //         keepAlive: false,
        //         options: {start: '', end: '', content: ''}
        //     }
        // },
        // {
        //     path: '/applyReader/:reader',
        //     component: ApplyReader,
        //     name: 'applyReader',
        //     meta: {
        //         keepAlive: false
        //     }
        // },
        // {
        //     path: '/details',
        //     component: ApplyDetails,
        //     name: 'applyDetails',
        //     meta: {
        //         keepAlive: false
        //     }
        // },

        /*rep*/
        {
            path: '/workRep',
            component: WorkRep,
            name: 'home',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/newRep/:params',//params: 0-新建 1-新建已经保存过 2-补交
            component: NewRep,
            name: 'newRep',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/repDetails',
            component: RepDetails,
            name: 'repDetails',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/repAssessment/:params',
            component: RepAssessment,
            name: 'repAssessment',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/repReader',
            component: RepReader,
            name: 'repReader',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/repTime/:params',
            component: RepTime,
            name: 'repTime',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/repHistory',
            component: RepHistory,
            name: 'repHistory',
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/repStatistics',
            component: RepStatistics,
            name: 'RepStatistics',
            meta: {
                keepAlive: false
            }
        },
        /*slsj*/
        // {
        //     path: '/slsjNew', component: SlsjNew
        // },
        // {
        //     path: '/slsjEdit', component: SlsjEdit
        // },


         /*elm*/
        // {
        //     path: '/elmHome', component: ElmHome
        // },
        // {
        //     path: '/elm-city/:id', component: ElmCity
        // },
        //
        // /*ww-msg*/
        // {
        //     path:'/wwDetails',
        //     component:WWDetails,
        //     name: 'wwDetails',
        //     meta: {
        //         keepAlive: false
        //     }
        // },
        /*ww-yyzs*/
        // {
        //     path:'/syActivityDetails/:params',
        //     component:SyActivityDetails,
        //     name:'syActivityDetails'
        // },
        // {
        //     path:'/syActivity',
        //     component:SyActivity,
        //     name:'syActivity'
        // },
        // {
        //     path:'/syMember',
        //     component:SyMember,
        //     name:'syMember'
        // },
        // {
        //     path:'/syMain',
        //     component:SYMain,
        //     name:'syMain'
        // },
        // {
        //     path:'/getToken',
        //     component:GetToken,
        //     name:'getToken'
        // },
        // {
        //     path:'/memberOperator/:params',
        //     component:MemberOperator,
        //     name:'memberOperator'
        // },
        /*nj-totask*/
        // {
        //     path:'/main',
        //     component:Main,
        //     name:'main'
        // },{
        //     path:'/userInfo',
        //     component:UserInfo,
        //     name:'userInfo'
        // },
        // {
        //     path:'/toTask',
        //     component:ToTask,
        //     name:'toTask'
        // },
        //
        //
        // {
        //     path: '/error', component: Error,
        //     meta: {
        //         keepAlive: false
        //     }
        // },
        {
            path: '/aurelia', component: TestAurelia,
        },
        {
            path: '/test', component: Test,
            meta: {
                keepAlive: false
            }
        },

        {path: '/', redirect: '/test'}
        // {path: '/', redirect:`/applyList/${JSON.stringify({GUID: 'e35ac823-5a4e-11e7-af47-ec388f6f5b1d', NAME: '团建'})}`}
    ]
})
