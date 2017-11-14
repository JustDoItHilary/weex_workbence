import Router from 'vue-router';

Vue.use(Router);

import Index from './vue/index.vue'

export default new Router({
    routes:[
        {
            path:'/index',
            component:Index
        },

        {
            path:'/',
            redirect:'/index'
        }
    ]
})