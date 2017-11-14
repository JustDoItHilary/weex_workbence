// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/rep'
import {sync} from 'vuex-router-sync'
import * as filters from './filters'
import mixins from './mixins'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

Vue.directive('ratio', {
    bind: function (el, binding, vnode) {
        // console.log(el,binding);
        var list=['fontSize','height','width','borderWidth','margin','padding','marginLeft','marginRight','margingTop','marginBottom','paddingTop','paddingBottom','paddingLeft','paddingRight','borderBottomWidth','borderTopWidth','borderLeftWidth','borderRightWidth'];
        for(var obj in el.style){
            // console.log("style: ",obj);
            for(var i=0;i<list.length;i++){
                if(obj==list[i]){
                    el.style[obj]=Math.round(binding.value * el.style[obj]);
                    break;
                }
            }
        }
        // console.log(el.style)

    }
})

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue(Vue.util.extend({el: '#root', router, store}, App))

router.push('/')
