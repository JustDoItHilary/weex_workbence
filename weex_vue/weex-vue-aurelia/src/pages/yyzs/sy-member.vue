<template>
    <scroller class="scroll" append="tree">
        <div class="div_top">
            <text class="txt_common">会员详情信息有异常？</text>
            <text class="txt_common txt_actived" @click="clickRepair">点击修复会员信息</text>
        </div>
        <cell-error v-if="errorInfo.errorMess" :errorImg="errorInfo.errorImg"
                    :errorMess="errorInfo.errorMess"></cell-error>
        <div v-ratio="ratio" v-for="item in memberInfo">
            <cell-card :tit="item.Extra.DESC" :txtElse="item.showed?'折叠':'展开'" :item="item"></cell-card>
        </div>

    </scroller>
</template>

<script>
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');
    const navigator = weex.requireModule('navigator');

    module.exports = {
        components: {
            CellCard: require('../../components/card/sy-card.vue'),
            CellError: require('../../components/error.vue'),
        },
        computed: {
            memberInfo(){
//                console.log("member: ",this.$store.getters.getSyMemberInfo )
                return this.$store.getters.getSyMemberInfo;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
        },
        data(){
            return {
                baseUrl: '',
                imgCloseUrl: '/drawable/ic_keyboard_arrow_down_black_48dp.png',
                imgOpenUrl: '/drawable/ic_keyboard_arrow_right_black_48dp.png',
                ratio: 1,
                memberID:'',
            }
        },
        methods: {
            clickRepair(){
                let self=this;
                var params={};
                params.memberID=self.memberID;
                self.$router.push(`/syRepairMember/${JSON.stringify(params)}`);
            },
            clickShow(item, index){
                item.showed = !item.showed;
            },
        },
        created(e){
            let self = this;
//            var bundleUrl = self.$getConfig().bundleUrl || '';
//            memberid=1001502924
            var bundleUrl = 'http://weex.yy365.cn/sy-member.js?memberid=1000084096&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js?memberid=1000084096&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
            let urlArr = bundleUrl.split("?");
            self.baseUrl = urlArr[0].split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
//            self.setRatio();
            if (urlArr.length > 1) {
                let paramsArr = urlArr[1].split("&");
                let params = {};
                for (let i = 0; i < paramsArr.length; i++) {
                    if (paramsArr[i].split("=")[0] == "memberid") {
                       self.memberID= paramsArr[i].split("=")[1];
                        params.MEMBERID =self.memberID;
                    } else if (paramsArr[i].split("=")[0] == "token") {
                        self.$store.commit('SET_TOKEN', {token: paramsArr[i].split("=")[1]});
                    }
                }
//                console.log(JSON.stringify(params));
                self.$store.dispatch('FETCH_SY_MEMBERINFO', {params: JSON.stringify(params)});
            } else {
                self.$store.commit('SET_ERROR', {showType:2 ,mess: "ERROR: 参数缺失"});
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .scroll {
        background-color: $wg;
    }
    .div_top{
        flex-direction:row;
        justify-content: space-between;
        margin-top: $cl;
        @include marginRow($bl+$cl);
    }
    .txt_common{
        @include fontCommon($cs,$css-grey);
        @include paddingColumn($cl);
    }
    .txt_actived{
        color:$colorCommon;
    }
</style>