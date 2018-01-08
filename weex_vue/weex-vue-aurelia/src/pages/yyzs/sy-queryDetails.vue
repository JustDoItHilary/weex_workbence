<template>
    <div>
        <cell-header tit="近期消费明细" :close="clickClose"></cell-header>
        <scroller class="scroll" append="tree">
            <cell-error v-if="errorInfo.errorMess" :errorImg="errorInfo.errorImg"
                        :errorMess="errorInfo.errorMess"></cell-error>
            <div v-ratio="ratio" v-for="item in orderDetail">
                <cell-card :tit="item.Extra.DESC" :txtElse="item.showed?'折叠':'展开'" :item="item"></cell-card>
            </div>
        </scroller>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');
    const navigator = weex.requireModule('navigator');
    var storage = weex.requireModule('storage');

    module.exports = {
        components: {
            cellHeader: require('../../components/header/apply-header.vue'),
            CellCard: require('../../components/card/sy-card.vue'),
            CellError: require('../../components/error.vue'),
        },
        computed: {
            orderDetail(){
//                console.log("member: ",this.$store.getters.getOrderDetail )
                return this.$store.getters.getOrderDetail;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
        },
        data(){
            return {
                baseUrl: '',
                ratio: 1,
                memberID: '',
            }
        },
        methods: {
            //关闭界面，退出
            clickClose: function () {
                configModule.finish();
            },
            clickShow(item, index){
                item.showed = !item.showed;
            },
//            getData(tokens){
//                let self=this;
//                var accessType = tokens.tokenType;
//                var accessToken = tokens.accessToken;
////                var body = {"COMPANYCODE": "999999"};
//                var body = {"COMPANYCODE": "999999"};
//                var header = {
//                    "content-type": "application/json",
//                    "authorization": accessType + ' ' + accessToken
//                };
//                self.$store.dispatch('FETCH_QUERY_ORDER_DETAIL', {
//                    id:self.memberID,body: body, header: header})
////                self.$store.dispatch('FETCH_SY_QUERY_DETAILS', {id:self.memberID,body:body,header:header});
//            },
//            isHaveToken(tokens){
//                let self = this;
//                var time = tokens.saveTime + (tokens.expiresIn-10*60)*1000;//令牌提前十分钟失效所以 -10*60；令牌是以分钟为单位的，所以 *1000
//                if (tokens.hasOwnProperty("accessToken") && tokens.accessToken && self.compareTime(time)) {
//                    self.getData(tokens)
//                } else {
//                    self.$router.push(`/getToken`)
//                }
//            },
//            getStorage(){
//                let self = this;
//                var tokens;
//                storage.getItem("sy_token", function (e) {
//                    if (e.result == "success" && e.data != "undefind") {
//                        tokens = JSON.parse(e.data);
//                    } else {
//                        tokens = {};
//                    }
//                    console.log(tokens);
//                    self.isHaveToken(tokens)
//                })
//            },
            getParams(url){
                let self = this;
                let paramsArr = url.split("&");
                let params = {};
                for (let i = 0; i < paramsArr.length; i++) {
                    if (paramsArr[i].split("=")[0] == "memberid") {
                        self.memberID = paramsArr[i].split("=")[1];
                        params.MEMBERID = self.memberID;
                    } else if (paramsArr[i].split("=")[0] == "token") {
                        self.$store.commit('SET_TOKEN', {token: paramsArr[i].split("=")[1]});
                    }
                }
                self.$store.dispatch('FETCH_QUERY_ORDER_DETAIL', {params: JSON.stringify(params)});
//                self.$store.commit('GET_SY_ORDER_DETAIL', {data: ''});
            },
        },
        created(e){
            let self = this;
            var bundleUrl = self.$getConfig().bundleUrl || '';
//            memberid=1001502924
//            var bundleUrl = 'http://weex.yy365.cn/sy-member.js?memberid=1000084096&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js?memberid=1000084096&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
            let urlArr = bundleUrl.split("?");
            self.baseUrl = urlArr[0].split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
//            self.setRatio();
            if (urlArr.length > 1) {
                self.getParams(urlArr[1]);
            } else {
                self.$store.commit('SET_ERROR', {showType: 2, mess: "ERROR: 参数缺失"});
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .scroll {
        background-color: $wg;
    }
</style>