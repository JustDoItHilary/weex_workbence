<template>
    <scroller class="scroll" append="tree">
        <cell-error v-if="errorInfo.errorMess" :errorImg="errorInfo.errorImg"
                    :errorMess="errorInfo.errorMess"></cell-error>
        <div v-ratio="ratio" v-for="item in syHealthList">
            <cell-card :tit="item.Extra.DESC" :txtElse="item.hasOwnProperty('NEEDFOLD')?(item.showed?'折叠':'展开'):''"
                       :item="item"></cell-card>
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
            syHealthList(){
//                console.log("member: ",this.$store.getters.getSyMemberInfo )
                return this.$store.getters.getSyHealth;
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
                memberID:'',
            }
        },
        methods: {
            clickShow(item, index){
                item.showed = !item.showed;
            },
            getData(){
                let self=this;
                let params = {};
                params.MEMBERID =self.memberID;
//                console.log(JSON.stringify(params));
                self.$store.dispatch('FETCH_SY_GET_HEALTH_HISTORY', {params: JSON.stringify(params)});
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
            if (urlArr.length > 1) {
                let paramsArr = urlArr[1].split("&");
                for (let i = 0; i < paramsArr.length; i++) {
                    if (paramsArr[i].split("=")[0] == "memberid") {
                       self.memberID= paramsArr[i].split("=")[1];
                    } else if (paramsArr[i].split("=")[0] == "token") {
                        self.$store.commit('SET_TOKEN', {token: paramsArr[i].split("=")[1]});
                    }
                }
                self.getData();
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
</style>