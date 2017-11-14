<template>
    <div>
        <div v-for="item in tabs">
            <user-info v-if="showItem('/toTask',item)"></user-info>
            <to-task v-if="showItem('/userInfo',item)"></to-task>
        </div>
        <cell-tab :tabs="tabs"></cell-tab>
    </div>
</template>

<script>
    import CellMulti from '../../components/cell-multiline.vue'
    import BottomBtn from '../../components/footer/bottom-btn.vue'
    import CellTime from '../../components/cell-justify.vue'
    import CellTab from '../../components/footer/cell-tab.vue'
    import UserInfo from './userInfo.vue'
    import ToTask from './toTask.vue'


    export default {
        components: {
            CellMulti, BottomBtn, CellTime, CellTab, UserInfo, ToTask,
        },
        computed: {
            tabs(){
                return this.$store.getters.getTab
            }
        },
        data(){
            return {}
        },
        methods: {
            showItem(name, item){
                if (item.src == name && item.visiable) {
                    return true;
                }
                return false;
            },
        },
    }
</script>