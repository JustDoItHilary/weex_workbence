<template>
    <div>
        <scroller >
            <div v-for="(item,index) in memberInfo" class="div_bottom" @click="clickShow(item,index)">
                <logo-text class="border_bottom"  :tit="item.NAME" :imgLogoUrl="item.ICON">
                    <image slot="endImg" class="img_end" :src="baseUrl+(item.showed?imgCloseUrl:imgOpenUrl)"></image>
                </logo-text>
                <div v-for="info in item.INFO" v-if="item.showed" class="div_padding">
                    <cell-time style="padding: 10px;" :txtLeft="info.TIT" :txtRight="info.CONTENT"></cell-time>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');

    module.exports={
        components: {
            LogoText:require('../../../components/cell-logo-text.vue'),
            CellTime:require('../../../components/cell-justify.vue'),
        },
        computed:{
            memberInfo(){
//                console.log("member: ",this.$store.getters.syMemberInfo )
                return this.$store.getters.syMemberInfo
            }
        },
        data(){
            return {
                baseUrl:'',
                imgCloseUrl:'/drawable/ic_keyboard_arrow_down_black_48dp.png',
                imgOpenUrl:'/drawable/ic_keyboard_arrow_right_black_48dp.png'
            }
        },
        methods:{
            clickShow(item,index){
                item.showType=!item.showType;
            },
        },
        created(e){
            let self=this;
            var bundleUrl = self.$getConfig().bundleUrl || '';
//            var bundleUrl = 'http://weex.yy365.cn/sy-member.js?memberid=1000084096&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js?memberid=1000084096&token=@@OTk5OTk5fEAxODU2MTYwNjkyMHxAYzRjMTA5Mjk1OTNjYmVhM2UwN2FhOTEzMWMxYzdlNTJ8QHYzLjIuMmMxNzA4MzB8QDU4ZTMxMjdkZmI4NmUzNDM1ODgyZGRkNWU0MDQ5YWJi';
            let urlArr=bundleUrl.split("?");
            self.baseUrl = urlArr[0].split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
            if(urlArr.length>1){
                let paramsArr=urlArr[1].split("&");
                let params = {};
                for(let i=0;i<paramsArr.length;i++){
                    if(paramsArr[i].split("=")[0]=="memberid"){
                        params.MEMBERID=paramsArr[i].split("=")[1];
                    }else if(paramsArr[i].split("=")[0]=="token"){
                        self.$store.commit('SET_TOKEN', {token: paramsArr[i].split("=")[1]});
                    }
                }
//                console.log(JSON.stringify(params))
                self.$store.dispatch('FETCH_SY_MEMBERINFO', {params:JSON.stringify(params)});
            }else{
                modal.toast({message:"error: 参数缺失！",doation:1})
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../../style/mixin";

    .div_bottom{
        /*border-bottom-width: 10px;*/
        @include paddingRow(16px);
        @include paddingColumn(10px)

    }
    .img_end{
        height:48px;
        width:48px;
    }
    .border_bottom{
        border-bottom-width: 4px;
        border-color: $colorCommon;
        padding:6px;
    }
    .div_padding{
        padding-left: 72px;
        border-bottom-width: 2px;
        border-color: $bg;
        @include paddingColumn(6px);
    }
</style>