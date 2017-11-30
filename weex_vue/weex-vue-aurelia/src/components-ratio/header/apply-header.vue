<template>
    <div>
        <div v-ratio="ratio"
             class="div_titBar bg_android"
             :style="{ height: actionBarHeight }"
             data-role="none"
             v-if="!isiOS">
            <!--回退按钮，监听事件放于子组件内部-->
            <div v-ratio="ratio"
                 class="div_close"
                 @click="clickClose">
                <image v-ratio="ratio"
                       class="img_back"
                       style="width: 24;height:24;margin-left:16;margin-top: 8;margin-bottom: 8; "
                       :src="baseUrl+imgBackUrl"></image>
            </div>
            <text v-ratio="ratio"
                  style="flex:1;font-size: 20;margin-left: 8;"
                  class="text_titBar">{{tit}}</text>
            <!--完成按钮，需要同时设置 iOS 端，监听事件放于父组件-->
            <div v-ratio="ratio"
                 @click="done"
                 v-if="done">
                <image v-ratio="ratio"
                       class="img_back"
                       :src="baseUrl+imgDoneUrl"></image>
            </div>
        </div>

        <div v-ratio="ratio"
             class="div_titBar bg_ios"
             :style="{ height: actionBarHeight }"
             data-role="none"
             v-if="isiOS">
            <div v-ratio="ratio"
                 class="div_titBar_iOS"
                 :style="{ height: actionBarHeight,left:0,right:0}">
                <text v-ratio="ratio"
                      style="font-size: 16;color: #fff;"
                      class="text_titBar_iOS">{{tit}}</text>
            </div>
            <!--回退按钮，监听事件放于子组件内部-->
            <div v-ratio="ratio"
                 class="div_titBar_iOS_def"
                 @click="clickClose">
                <image  v-ratio="ratio"
                        class="img_back_iOS"
                        style="width:32;height: 32;"
                        :src="baseUrl+imgBackUrl_iOS"></image>
                <!--<text class="text_titBar_def_iOS">工作台</text>-->
            </div>
            <!--完成按钮，需要同时设置 Android 端，监听事件放于父组件-->
            <text v-ratio="ratio"
                  class="text_titBar_def_iOS"
                  style="font-size: 16;color:#fff;margin-right: 8;"
                  @click="done"
                  v-if="done">{{titRight}}</text>
        </div>
    </div>
</template>
<script>
    let navigator = weex.requireModule('navigator');
    let modal = weex.requireModule('modal');
    let configModule = weex.requireModule('configModule');
    let storage = weex.requireModule('storage');
    let stream = weex.requireModule('stream');

    module.exports = {
        props: {
            tit: {
                type: String,
                required: false,
                default: ''
            },
            titRight: {
                type: String,
                required: false,
                default: 'done'
            },
            imgUrl: {
                type: String,
                required: false,
                default: ''
            },
            done: {
                type: Function
            },
            close: {
                type: Function
            }
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
            },
            ratio(){
                return this.$store.getters.ratio;
            },
        },
        data(){
            return {
                actionBarHeight: 56,
                isiOS: false,
                imgBackUrl:'/drawable/ic_back_white_48dp.png',
                imgDoneUrl:'/drawable/ic_done_white_48dp.png',
                imgBackUrl_iOS:'/drawable/arrow-left.png',
//                imgBackUrl_iOS:'/drawable/arrowLeft.png',
            }
        },
        methods: {
            //退出事件：如果为入口界面需要在父组件中设置退出事件，其他的使用 router 的 go() 方法回退
            clickClose: function () {
                let self = this;
                if (self.close) {
                    self.close();
                    console.log('TRUE')
                } else {
                    self.back();
                    console.log('FALSE')
                }
//                var params = { 'animated': 'true' };
//                navigator.pop(params, function (ret) {});
            },
            getMeasure(){
                let self=this;
                configModule.getActionBarHeight(function(params){
                    var scale;
                    if (self.$getConfig().env.platform.toLowerCase()=='ios') {
                        scale=params.width/750;
                    }else{
                        scale = self.$getConfig().env.deviceWidth / 750;
                    }
                    self.actionBarHeight=params.height/scale;
                }.bind(this));
            },
        },
        created: function (e) {
            let self = this;
//            self.getMeasure();
            self.isiOS = self.$getConfig().env.platform.toLowerCase() == 'ios';
        }

    };</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_titBar {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .bg_android{
        background-color: $colorCommon;
    }
    .bg_ios{
        background-color: $colorCommon;
        border-color: $bc;
        border-bottom-width: 1px;
    }

    .div_close {
        justify-content: center;
        align-items: center;
    }

    .img_back {
//        @include wh();
//        @include marginRow($bl);
//        @include marginColumn($cl);
    }

    .img_back_iOS {
//        @include wh(32px,32px);
        /*border-width: 1;*/
    }

    .text_close {
        color: #fff;
//        margin: $cl;
//        @include fontCommon($cs,#fff);
    }
    .text_titBar {
        text-align: left;
        color:#fff;
//        @include fontCommon(20px,#fff);
//        @include marginRow();
    }
    .text_titBar_def_iOS {
//        @include fontCommon($bs,$colorCommon);
//        margin-right: $cl;
    }
    .text_titBar_iOS {
        text-align: center;
//        @include fontCommon($bs);
        font-family: HelveticaNeue-CondensedBlack;
    }
    .div_titBar_iOS_def {
        flex-direction: row;
        align-items: center;
    }
    .div_titBar_iOS {
        position: absolute;
        /*left: 0;*/
        /*right: 0;*/
        justify-content: center;
        align-items: center;
    }
</style>