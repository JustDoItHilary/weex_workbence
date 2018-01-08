<template>
    <div>
        <app-header tit="我的周报"></app-header>
        <cell-txt-center
                :txt="year+'年'+month+'月'"
                fontColor="#aaa"
                class="cell_txt_center">
            <text
                    slot="left"
                    class="div_add"
                    @click="clickLast()"> 上个月 </text>
            <text
                    slot="right"
                    class="div_add"
                    @click="clickNext()"> 下个月 </text>
        </cell-txt-center>
        <scroller>
            <div class="div_item cell_border"
                    v-for="(item,index) in repList"
                    @click="clickItem(item)">
                <text :class="[item.edited?'txt_active_true':'txt_active_false'] ">{{item.startDate+' ~ '+item.endDate}}</text>
                <text :class="['cell_txt_center','div_logo','select_bg_'+item.finished]">{{item.finished?'已提交':'未提交'}}</text>
            </div>
        </scroller>
    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');

    import {
        fetchByPost, fetch
    } from '../../store/fetch';
    import {
        URL_BASE,
        URL_REP_GET_LIST
    } from '../../store/rep/rep-api'

    export default {
        components: {
            appHeader: require('../../components/header/rep-header.vue'),
            CellTxtCenter: require('../../components/cell-txt-center.vue'),
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            repList(){
                let self = this;
                var rep = self.$store.getters.getRepList;
//                console.log("rep: ",rep)
                var list = [];
                var todayOfWeek = (new Date(self.firstDate.getTime() - 86400000)).getDay();
                var year = self.firstDate.getFullYear();
                var month = self.firstDate.getMonth();
                var startDate = new Date(year, month, self.firstDate.getDate() - todayOfWeek);
                for (var i = startDate; i.getTime() <= self.endDate.getTime()- 86400000 * 6; i = new Date(i.getTime() + 86400000 * 7)) {
                    var item={};
                    item.startDate=self.formatDate(i,'yyyy-MM-dd');
                    item.endDate=self.formatDate(new Date(i.getTime()+86400000 * 6),'yyyy-MM-dd');
                    item.finished = false;
                    item.edited = this.toDate(item.startDate).getTime() <= new Date().getTime();
                    for (var j = 0; j < rep.length; j++) {
                        if (rep[j].startTime == item.startDate) {
                            item.repDetail = rep[j];
                            if (rep[j].IsPost == 1) {
                                item.finished = true;
                            }
                        }
                    }
                    list.push(item);
                }
//                console.log("list: ",list)
                return list;
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
            },
        },
        data(){
            return {
                name: '',
                year: '',
                date: '',
                month: '',
                firstDate: '',
                endDate: '',
                imgUrl: '/drawable/no_data.png',
            }
        },
        methods: {
            clickItem(item){
                let self = this;
                if (item.edited) {
                    if (item.finished) {//已经提交，跳转详情界面，设置详情&审阅者
                        self.jumpDetail(item);
                    } else {//未提交，跳转新建界面
                        self.jumpNew(item);
                    }
                }
            },
            jumpDetail(item){
                let self = this;
                self.$store.commit('SET_REP_DETAILS', {item: item.repDetail});
                var details = item.repDetail;
                if (details.hasOwnProperty("Auditors")) {
                    self.$store.commit('GET_READER', {auditors: details.Auditors});
                } else {
                    self.$store.commit('GET_READER', {auditors: ''});
                }
                self.$router.push(`/repDetails`)
            },
            jumpNew(item){
                let self = this;
                self.$store.commit('SET_REP_DETAILS', {item: {}});
                self.$store.commit('GET_READER', {auditors: ''});
                if (item.hasOwnProperty('repDetail')) {//已保存，设置本周详情&审阅者
                    var details = item.repDetail;
                    self.$store.commit('SET_REP_DETAILS', {item: details});
                    if (details.hasOwnProperty("Auditors")) {
                        self.$store.commit('GET_READER', {auditors: details.Auditors});
                    }
                } else {//未保存，设置审阅者
                    var last = self.$store.getters.getRepList[0];
                    if (last.hasOwnProperty("Auditors")) {
                        self.$store.commit('GET_READER', {auditors: last.Auditors});
                    }
                }
                var params = {};
                params.index = 1;
                params.startTime = item.startDate;
                params.endTime = item.endDate;
                self.$router.push(`/newRep/${JSON.stringify(params)}`)
            },
            clickLast(){
                let self = this;
                self.date = new Date(self.firstDate - 86400000);
                self.getRepList();
            },
            clickNext(){
                let self = this;
                var day = new Date(self.year, self.month + 1, 1);
                self.date = new Date(day - 86400000);
                self.getRepList();
            },
            getRepList(){
                var self = this;
                self.getData();
                var startDate = self.formatDate(self.firstDate, 'yyyy-MM-dd');
                var endDate = self.formatDate(self.endDate, 'yyyy-MM-dd');
                var body = 'code=' + self.userPlatformCode +
                    '&startDate=' + startDate + '&endDate=' + endDate + '&type=1&cros=';
//                console.log(body)
                self.$store.dispatch('FETCH_REP_LIST', {
                    body: body, callback: function () {

                    }
                });
            },
            getData(){
                let self = this;
                self.year = self.date.getFullYear();
                self.month = self.date.getMonth() + 1;
                self.firstDate = new Date(self.year, self.month - 1, 1);
                var next = new Date(self.year, self.month, 1);
                self.endDate = new Date(next - 86400000);
            },
        },
        created: function (e) {
            let self = this;
            self.date = new Date();
            self.getRepList();
        },
        destroyed(e){
//            this.$store.commit('SET_REP_LIST', {
//                retdata: [], callback: function () {
//                }
//            });
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .cell_txt_center {
        @include fontCommon();
        text-align: center;
        margin-bottom: $cl;
        margin-top: $bl;
    }

    .cell_border {
        @include sideBorder(bottom, $bc);
    }

    .div_add {
        @include cornerBtn();
        @include marginRow();
    }

    .div_hide {
        justify-content: center;
        align-items: center;
        padding: $sl;
        margin-top: $cl;
    }

    .img_search {
        @include wh(140px, 140px);
    }

    .txt_hide {
        @include fontCommon($bs, $css-grey);
        @include marginColumn($sl);
    }

    .div_item {
        flex-direction: row;
        align-items: center;
        @include marginRow($bl);
    }

    .div_logo {
        padding: $sl;
        border-radius: $bRadius;
        text-align: center;
        @include fontCommon($ss, #fff);
    }

    .select_bg_true {
        background-color: $colorCommon;
    }

    .select_bg_false {
        background-color: red;
    }

    .txt_active_true {
        flex: 1;
        @include fontCommon();
        text-align: center;
        margin-bottom: $cl;
        margin-top: $bl;
    }

    .txt_active_false {
        flex: 1;
        @include fontCommon($cs, $css-grey);
        text-align: center;
        margin-bottom: $cl;
        margin-top: $bl;
    }

</style>