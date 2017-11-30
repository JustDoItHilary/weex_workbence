<template>
    <div class="div_root" v-if="showed">
        <cell-header tit="营销活动" :close="clickClose"></cell-header>
        <label labelOneTxt="进行中"
               labelTwoTxt="历史活动"
               :selected="isSelected"
               :labelOne="clickLabelOne"
               :labelTwo="clickLabelTwo"
        ></label>
        <cell-error v-if="errorInfo.errorImg&&errorInfo.errorMess" :errorImg="errorInfo.errorImg" :errorMess="errorInfo.errorMess"></cell-error>
        <scroller class="scroll">
            <div v-if="isSelected" class="div_card" v-for="(item,index) in ongoingAct" @click="clickItem(item)">
                <text class="txt_tit">{{item.TITLE}}</text>
            </div>
            <div v-if="!isSelected" class="div_card" v-for="(his,index) in historyAct" @click="clickItem(his)">
                <text class="txt_tit">{{his.TITLE}}</text>
            </div>
        </scroller>
        <!--<cell-btn v-if="false" class="style_btn" name="详情" @clickBtn="clickBtn"></cell-btn>-->
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');

    export default{
        components: {
            cellHeader: require('../../../components/header/apply-header.vue'),
            cellBtn: require('../../../components/btn.vue'),
            label: require('../../../components/label.vue'),
            cellError: require('../../../components/error.vue')
        },
        data(){
            return {
                ratio: 1,
                baseUrl: 'http://192.168.100.120:8888/weex',
                token: '',
                id: '',
                showed: true,
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
                let self=this;
                this.$store.commit('SET_ERROR',{showType:1});
                this.$router.push(`/syActivityDetails/${item.GUID}`);
            },
            clickBtn(){
                this.showed = false;
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
                configModule.getToken('', function (ret) {
                    self.token = ret;
                    self.$store.commit('SET_TOKEN', {token: self.token});
                    self.getOngoingAct();
                });
            },
            setRatio(){
                let self = this;
                var envConfig = self.$getConfig().env;
                var width = envConfig.hasOwnProperty('deviceWidth') ? envConfig.deviceWidth : 0;
                var scale = envConfig.hasOwnProperty('scale') ? envConfig.scale : 2;
                self.ratio = 750 / ( width / scale );
                self.$store.commit('SET_RATIO', {ratio: self.ratio});
            },
        },
        created: function (e) {
            let self = this;
            self.setRatio();
//            var bundleUrl=self.$getConfig().bundleUrl;
            var bundleUrl = 'http://weex.yy365.cn/sy-activity.js?id=C-00000152';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js?id=C-00000152';
            self.baseUrl = self.getBaseUrl(bundleUrl);
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
//            var params = bundleUrl.split('?')[1].split('&')[0].split('=');
//            if (params[0].toUpperCase() == 'ID') {
//                self.id = params[1];
//            }
//            self.getData();
            self.getOngoingAct();
        },
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../../style/mixin";

    .div_root {
        background-color: $wg;
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
</style>