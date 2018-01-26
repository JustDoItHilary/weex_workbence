<template>
    <div>
        <apply-header class="header" tit="会员转交" :close="clickClose"></apply-header>
        <scroller style="margin-top: 20px">
            <div v-for="(item,index) in memberOperatorList" class="div_list">
                <text class="name">{{item.Name}}</text>
                <text class="value">{{item.Value}}</text>
            </div>
        </scroller>
        <div class="btnGroup">
            <div class="div_btn_top"  @click="getChangMemberResult(channelGroup[0])">
                <text class="btn">{{btnLeftContent}}</text>
            </div>
            <div class="div_btn_bottom"  @click="getChangMemberResult(channelGroup[1])">
                <text class="btn">{{btnRightContent}}</text>
            </div>
        </div>
        <loading-circle v-if="true" class="cell_loading"></loading-circle>
    </div>
</template>


<script>
    var storage = weex.requireModule('storage');
    var configModule = weex.requireModule('configModule');
    var modal = weex.requireModule('modal')

    export default{
        components: {
           ApplyHeader : require('../../components/header/apply-header.vue'),
            LoadingCircle:require('../../components/loading/loading-circle.vue')
        },
        data(){
            return {
                btnLeftContent:"转交给我(慢性病专员)",
                btnRightContent:"转交他人(调店或离职)",
                channelGroup:['MBEMPLOYEE','EMPLOYEE'],
                isLoading:false,
            }
        },
        computed: {
            memberOperatorList(){
//                console.log("List :"+this.$store.getters.getMemberOperatorList);
                return this.$store.getters.getMemberOperatorList;
            },
            params(){
                let self=this;
                if (self.$route && self.$route.params) {
//                    console.log(self.$route.params)
                    return self.$route.params.guid
                }
                return ''
            },
        },
        methods: {
            queryMemberOperator(tokens){
                let self = this;
                var accessType = tokens.tokenType;
                var accessToken = tokens.accessToken;
//                var body="COMPANYCODE=999999";
                var body = {"COMPANYCODE": "999999"};
                var header = {
                    "content-type": "application/json",
//                    "authorization":"bearer XRa7kQsHW6xCNPGSnhFG39fmRg-dS2OYYN3pT3vLGg7olh495npbqjlj_tFMvf_PJDwV0el8S6s63EI4pdUijq9n8oesLzXMR4_oepPB7DgjwHxvhXjMgPJBWSMgfdWROQqFymgERu6QB_K8FM3duoqqLBm6sqe82bUJ-DXvbslJqlDkF-q1DlgZmniRMd4Dd6qiE2no_RyJhvuajlxchU_F8taB9slWNjuQ2" +
//                        "ACMynaYP55sPEtBsLEw3P7W977k4baMA47KpH77baC4WfhpTUtvU6vWbHM_d3wbtURB6i3vXKo3Dzlv6whq1gk2xIf4xHW1g_GXsJX-Z2OJTpDfQA"
                    "authorization": accessType + ' ' + accessToken
                };
                self.$store.dispatch('FETCH_QUERY_MEMBER_OPERATOR', {
                    body: body, header: header, callback: function (data) {
                        self.isLoading=false;
                        if (data==null){
                            modal.toast({message:"请求数据失败",duration :1})
                        }else {
                            modal.toast({message:"请求数据成功",duration :1})
                        }

                    }
                })
            },
            getStorage(){
                let self = this;
                var tokens;
                storage.getItem("sy_token", function (e) {
                    if (e.result == "success" && e.data != "undefind") {
                        tokens = JSON.parse(e.data);
                        console.log(tokens);
                        self.queryMemberOperator(tokens)
                    } else {
                        self.$router.back();
                    }
                })
            },

            onrefresh (event) {
                console.log('is refreshing')
                modal.toast({ message: 'refresh', duration: 1 })
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },

            getChangMemberResult(channel){
                let self = this;
                self.isLoading=true;
                console.log("123455"+ self.isLoading);
//                configModule.getToken(function (token) {
                    var token='@@ODg4ODg4fEAxODM1NDI4OTg1N3xAMDliNGIzNDdkNjU1ZTk2YjFmOGQxN2MxNDY5OWRkZTk-'
                    self.$store.commit('SET_TOKEN',{token:token})
                    var urlparams={"MEMBERCODE":self.params,"CHANNEL":channel}
                    self.$store.dispatch('FETCH_CHANGE_MEMBER_SERVER', {
                        params: JSON.stringify(urlparams),
                        callback: function (result,message) {
                            if (result == "1") {
//                                modal.toast({message:'请求成功',duration :1})
                                self.getStorage();
                            }else {
                                modal.toast({message:message,duration :1})
                            }
                        }
                    })
//                });
            },
            clickClose(){
                console.log("close")
                configModule.finish();
            },

        },
        created: function (e) {
            let self = this;
            self.getStorage();
        }
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";
    .header{
        width: 750px;
    }

    .div_list {
        width: 700px;
        height: 80px;
        flex-direction: row;
        margin-left: 25px;
        margin-right: 25px;
        border-bottom-width: 2px;
        /*<!--border-bottom-color: $linebg;-->*/
        border-bottom-style: solid;
        align-items: center;
    }
    .name{
        flex: 1;
        font-size: 30px;
    }
    .value{
        font-size: 32px;
    }

    .btnGroup{
        position: relative;
        bottom: 10px;
        align-items: center;
        margin-left: 25px;
        margin-right: 25px;
    }

    .div_btn_top,.div_btn_bottom{
        width: 700px;
        height:90px;
        flex: 1;
        border-radius: 8px;
        /*align-items: center;*/
        justify-content: center;
        margin-bottom: 20px;
    }
    .div_btn_top{
        background-color: #20B2AA;
    }
    .div_btn_bottom{
        background-color: #FFA500;
    }
    .btn{
        font-size: 36px;
        text-align: center;
        color: #fff;
    }
    .cell_loading{
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        align-items: center;
        justify-content: center;
    }

</style>