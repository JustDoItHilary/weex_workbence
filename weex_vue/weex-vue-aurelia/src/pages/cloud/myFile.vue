<template>
    <div>
        <cell-header tit="我的文件">
            <text slot="right" class="txt_tit_active" @click="clickMore">更多</text>
        </cell-header>
        <div class="div_search">
            <div class="div_order" @click="clickOrder">
                <image class="img_order" :src="baseUrl+imgOrderUrl"></image>
            </div>
            <input  class="txt_center input" type="text" placeholder="搜索" @input="input" :value="searchMess"/>
        </div>
        <scroller class="scroll">
            <div v-for="(item,i) in list" class="div_item" @click="clickItem">
                <cell-logo :imgLogoUrl="baseUrl+imgUrl" tit="我上传的" content="test test">
                    <image slot="endImg" class="img_logo" :src="baseUrl+imgArrowRightUrl"></image>
                </cell-logo>
            </div>
        </scroller>
        <div class="div_pop" v-if="isShow">
        <!--<image class="img_pop" :src="baseUrl+imgBgUrl"></image>-->
            <text class="txt_pop" @click="clickOpen()">上传文件</text>
            <text class="txt_pop" @click="clickOpen()">批量操作</text>
            <text class="txt_pop" @click="clickOpen()">新建文件夹</text>
            <text class="txt_pop" @click="clickOpen()">登录网页版</text>
        </div>
    </div>
</template>

<script>
    export default{
        components: {
            cellHeader: require('../../components/header/rep-header.vue'),
            cellJustify: require('../../components/cell-justify.vue'),
            cellLogo: require('../../components/cell-logo-text.vue'),
        },
        computed: {
            folderList(){
//                return
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
        },
        data(){
            return {
                baseUrl: '',
                list:[1,2],
                imgUrl:'/drawable/review.png',
                imgBgUrl:'/drawable/mess_bg.png',
                imgOrderUrl:'/drawable/calendar_green.png',
                imgArrowRightUrl:'/drawable/ic_keyboard_arrow_right_black_48dp.png',
                isShow:false,

            }
        },
        methods: {
            clickMore(){//更多选项
                let self=this;
                self.isShow=!self.isShow;
            },
            clickOpen(){
                let self=this;
            },
            clickOrder(){//列表顺序
                let self=this;
            },
            clickItem(){
                let self=this;
            },
            getFolder(){
                let self=this;
                var body = 'code=' + self.userPlatformCode +
                    '&fileclass=' + startDate + '&parent=' + endDate + '&order_key=1&order_val=';
//                console.log(body)
                self.$store.dispatch('FETCH_CLOUD_GET_FOLDER',{body:body})
            },
            getData(){
                let self = this;
//                self.token = '@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--';
                configModule.getUrl('', function (ret) {
                    self.token = ret.split('=')[1];
                    self.$store.commit('SET_TOKEN', {token: self.token});
                    //获取大平台账号
                    self.$store.dispatch('FETCH_USERPLATEFORMCODE',
                        {
                            params: {},
                            callback: function () {
                                self.getFolder();
                            }
                        });
                });
            },
        },
        created(){
            let self = this;
//            var bundleUrl = 'http://weex.yy365.cn/sy-member.js';
            var bundleUrl = 'http://192.168.100.120:8888/weex/sy-member.js';
            self.baseUrl = self.getBaseUrl(bundleUrl);
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
//            self.getData();
            self.getFolder();
        }
    }
</script>


<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .txt_tit_active {
        @include fontCommon($bs,$fc);
        padding:$cl;
    }
    .scroll{
        background-color: $wg;
    }
    .div_item{
        justify-content: center;
        background-color: $fc;
        @include paddingColumn();
        @include sideBorder(top,$bc);
        padding-left: $cl;
    }
    .img_logo{
        @include wh();
        @include marginColumn($sl);
        @include marginRow($bl);
    }
    .txt_content{
        flex:1;
        @include fontCommon();
        @include paddingRow($cl);
    }
    .div_pop{
        position:absolute;
        right:$sl;
        top:120px;
        @include paddingColumn($sl);
        @include paddingRow();
        align-items: center;
        background-color: $css-grey;
    }
    .img_pop{
        top:0;
        left:0;
        right:0;
        bottom:0;
        //@include wh(200px,400px);
    }
    .txt_pop{
        @include fontCommon($cs,$fc);
        @include paddingColumn($sl);
        @include sideBorder(bottom,$wg);
    }
    .div_search{
        flex-direction:row;
        align-items: center;
        @include marginRow($sl);
    }
    .div_order{
        padding:$sl;
    }
    .img_order{
        @include wh();
    }
    .input {
        flex:1;
        height: 64px;
        background-color: $bc;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
        @include marginColumn();
        @include marginRow();
    }
    .txt_center {
        height: $ls;
        text-align: center;
        font-weight: bold;;
        font-size: $cs;
    }
</style>