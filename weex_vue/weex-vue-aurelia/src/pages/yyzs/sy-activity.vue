<template>
    <div class="div_root">
        <cell-header tit="营销活动" :close="clickClose"></cell-header>
        <label class="label"
               labelOneTxt="进行中"
               labelTwoTxt="历史活动"
               :selected="isSelected"
               :labelOne="clickLabelOne"
               :labelTwo="clickLabelTwo"
        ></label>
        <cell-error v-if="errorInfo.errorMess" :errorImg="errorInfo.errorImg"
                    :errorMess="errorInfo.errorMess"></cell-error>
        <scroller class="scroll">
            <div v-if="isSelected" class="div_card" v-for="(item,index) in ongoingAct" @click="clickItem(item)">
                <text class="txt_tit">{{item.TITLE}}</text>
            </div>
            <div v-if="!isSelected" class="div_card" v-for="(his,index) in historyAct" @click="clickItem(his)">
                <text class="txt_tit">{{his.TITLE}}</text>
            </div>
        </scroller>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');

    export default{
        components: {
            cellHeader: require('../../components/header/yyzs-header.vue'),
            cellBtn: require('../../components/btn.vue'),
            label: require('../../components/label.vue'),
            cellError: require('../../components/error.vue'),
        },
        data(){
            return {
                baseUrl: '',
                id: '',
            }
        },
        computed: {
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
            isSelected(){/*当前显示的是否为"进行中"页面*/
                return this.$store.getters.getActSelected;
            },
            ongoingAct(){
                return this.$store.getters.getOngoingAct;
            },
            historyAct(){
                return this.$store.getters.getHistoryAct;
            },
        },
        methods: {
            //关闭界面，退出
            clickClose: function () {
                configModule.finish();
            },
            clickItem(item){
                let self = this;
                this.$store.commit('SET_ERROR', {showed: 4});
                this.$router.push(`/syActivityDetails/${item.GUID}`);
            },
            clickBtn(){
                this.$router.push(`/syActivityDetails/${this.id}`);
            },
            clickLabelOne: function (e) {
                let self = this;
                if (!self.isSelected) {
                    self.$store.commit('SET_REP_FIRST_SELECTED', {selected: true});
                    self.getOngoingAct();
                }
            },
            clickLabelTwo: function (e) {
                let self = this;
                if (self.isSelected) {
                    self.$store.commit('SET_REP_FIRST_SELECTED', {selected: false});
                    self.getHistoryAct();
                }
            },
            getOngoingAct(){
                let self = this;
                self.$store.dispatch('FETCH_GET_ONGOING_ACT', {params: {}})
            },
            getHistoryAct(){
                let self = this;
                self.$store.dispatch('FETCH_GET_HISTORY_ACT', {params: {}})
            },
            getData(){
                let self = this;
                var token='@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjMuM2MxNzEwMTZ8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJ';
//                configModule.getUrl('', function (ret) {
//                    var token = ret.split('=')[1];
                self.$store.dispatch('setToken', {token: token});
                    self.getOngoingAct();
//                });
            },
        },
        created: function (e) {
            let self = this;
//            var bundleUrl = self.$getConfig().bundleUrl;
            var bundleUrl = 'http://weex.yy365.cn/sy-activity.js?id=C-00000152';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js?id=C-00000152';
            self.baseUrl = self.getBaseUrl(bundleUrl);
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
//            var params = bundleUrl.split('?')[1].split('&')[0].split('=');
//            if (params[0].toUpperCase() == 'ID') {
//                self.id = params[1];
//            }
            self.getData();
        },
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_root {
        background-color: $wg;
    }

    .label{
        margin-top: $borderW;
    }
    .scroll {
        @include marginRow();
    }

    .div_card {
        background-color: #fff;
        padding: $cl;
        @include borderCommon($borderW, $bc, $radius);
        @include marginRow($bl);
        @include marginColumn($bl);
    }

    .txt_tit {
        @include fontCommon();
    }

    .style_btn {
        justify-content: center;
        align-items: center;
        flex: 1;
        @include marginRow(250px);
        background-color: $wg;
    }
    .refresh{
        @include inCenter;
        @include divRow;
        @include paddingColumn($sl);
        right:0;
        left:0;
    }
    .indicator{
        color: $css-black;
        border-width: 1px;
        margin-right: 20px;
    }
    .txt_refresh{
        @include paddingColumn($sl);
        @include paddingRow();
        @include fontCommon();
        text-align: center;
    }
</style>