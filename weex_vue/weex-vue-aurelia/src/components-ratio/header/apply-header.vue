<template>
    <div>
        <div
             class="div_titBar bg_android"
             :style="{ height: actionBarHeight }"
             data-role="none"
             v-if="!isiOS">
            <!--回退按钮，监听事件放于子组件内部-->
            <div
                 class="div_close"
                 @click="clickClose">
                <image
                       class="img_back"
                       :src="baseUrl+imgBackUrl"></image>
            </div>
            <text
                  class="text_titBar">{{tit}}</text>
            <slot name="right"></slot>
            <!--完成按钮，需要同时设置 iOS 端，监听事件放于父组件-->
            <div
                 @click="done"
                 v-if="done">
                <image
                       class="img_back"
                       :src="baseUrl+imgDoneUrl"></image>
            </div>
        </div>

        <div class="div_titBar bg_ios"
             :style="{ height: actionBarHeight }"
             data-role="none"
             v-if="isiOS">
            <div class="div_titBar_iOS"
                 :style="{ height: actionBarHeight}">
                <text class="text_titBar_iOS">{{tit}}</text>
            </div>
            <!--回退按钮，监听事件放于子组件内部-->
            <div class="div_titBar_iOS_def"
                 @click="clickClose">
                <image class="img_back_iOS"
                        :src="baseUrl+imgBackUrl_iOS"></image>
                <!--<text class="text_titBar_def_iOS">工作台</text>-->
            </div>
            <slot name="right"></slot>
            <!--完成按钮，需要同时设置 Android 端，监听事件放于父组件-->
            <text 
                  class="text_titBar_def_iOS"
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
                actionBarHeight: 112,
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
                    if (self.isiOS) {
                        scale=params.width/750;
                    }else{
                        scale = weex.config.env.deviceWidth / 750;
                    }
                    self.actionBarHeight=params.height/scale;
//                    require('@weex-module/myModule').printLog('getActionBarHeight: '+self.actionBarHeight);
                }.bind(this));
//                configModule.getActionBarHeight(function(params){
//                    var scale;
//                    if (self.$getConfig().env.platform.toLowerCase()=='ios') {
//                        scale=params.width/750;
//                    }else{
//                        scale = self.$getConfig().env.deviceWidth / 750;
//                    }
//                    self.actionBarHeight=params.height/scale;
//                }.bind(this));
            },
        },
        created: function (e) {
            let self = this;
            self.isiOS = weex.config.env.platform.toLowerCase() == 'ios';
            self.getMeasure();
        }

    };</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_titBar {
        flex-direction: row;
        /*justify-content: space-between;*/
        align-items: center;
    }
    .bg_android{
        background-color: $colorCommon;
    }
    .bg_ios{
        background-color: $colorCommon;
       // @include sideBorder(bottom,$bc);
    }
    .div_close {
        justify-content: center;
        align-items: center;
    }
    .img_back {
        @include wh();
        @include marginRow($bl);
        @include marginColumn($cl);
    }
    .img_back_iOS {
        @include wh(80px,80px);
        /*border-width: 1;*/
    }
    .text_close {
        margin: $cl;
        @include fontCommon($cs,#fff);
    }
    .text_titBar {
        text-align: left;
        @include fontCommon(40px,#fff);
        @include marginRow();
        flex:1;
    }
    .text_titBar_def_iOS {
        @include fontCommon($bs,$colorCommon);
        margin-right: $cl;
    }
    .text_titBar_iOS {
        text-align: center;
        @include fontCommon(40px,#fff);
        font-family: HelveticaNeue-CondensedBlack;
    }
    .div_titBar_iOS_def {
        flex-direction: row;
        align-items: center;
    }
    .div_titBar_iOS {
        position: absolute;
        left: 0;
        right: 0;
        justify-content: center;
        align-items: center;
    }
</style>