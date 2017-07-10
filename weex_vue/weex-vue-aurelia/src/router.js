// import Vue from 'vue'
import Router from 'vue-router'

/*apply*/
import ApplyType from './pages/apply/applyType.vue'
import ApplyList from './pages/apply/applyList.vue'
import Application from './pages/apply/application.vue'
import ApplyReader from './pages/apply/applyReader.vue'
import ApplyDetails from './pages/apply/application-details.vue'

/*slsj*/
import SlsjNew from './pages/slsj/slsjNew.vue'
import SlsjEdit from './pages/slsj/slsjEdit.vue'

import Test from './components/member-details.vue'


Vue.use(Router)

export default new Router({
    // mode: 'abstract',
    routes: [
        /*apply*/
        {path: '/applyType', component: ApplyType},
        {path: '/applyList/:item', component: ApplyList},
        {path: '/application/:params', component: Application},
        {path: '/applyReader/:reader', component: ApplyReader},
        {path: '/details', component: ApplyDetails},
        /*slsj*/
        {path: '/slsjNew', component: SlsjNew},
        {path: '/slsjEdit', component: SlsjEdit},

        {path:'/test',component:Test},

        {path:'/',redirect:'/applyType'}
        // {path: '/', redirect:`/applyList/${JSON.stringify({GUID: 'e35ac823-5a4e-11e7-af47-ec388f6f5b1d', NAME: '团建'})}`}
    ]
})
