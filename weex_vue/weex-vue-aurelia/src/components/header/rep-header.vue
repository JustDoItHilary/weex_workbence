<template>
    <div>
        <div class="div_titBar bg_android"
                :style="{ height: actionBarHeight }"
                data-role="none"
                v-if="!isiOS">
            <!--回退按钮，监听事件放于子组件内部-->
            <div class="div_close"
                    @click="clickClose">
                <image class="img_back"
                        :src="baseUrl+imgBackUrl"></image>
            </div>
            <text class="text_titBar">{{tit}}</text>
            <slot name="right"></slot>
            <!--完成按钮，需要同时设置 iOS 端，监听事件放于父组件-->
            <div @click="done"
                    v-if="done">
                <image class="img_back"
                        :src="baseUrl+imgDoneUrl"></image>
            </div>
        </div>

        <div class="div_titBar bg_ios"
                :style="{ height: actionBarHeight }"
                data-role="none"
                v-if="isiOS">
            <div class="div_tit_iOS"
                    :style="{ height: actionBarHeight}">
                <text class="text_tit_iOS">{{tit}}</text>
            </div>
            <!--回退按钮，监听事件放于子组件内部-->
            <div class="div_left_ios" @click="clickClose">
                <image class="img_back_iOS"
                        :src="baseUrl+imgBackUrl_iOS"></image>
                <!--<text class="text_titBar_def_iOS">工作台</text>-->
            </div>
            <slot name="right" class="right_ios"></slot>
            <!--完成按钮，需要同时设置 Android 端，监听事件放于父组件-->
            <text class="right_ios text_active"
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
//                imgBackUrl_iOS:'/drawable/arrow-left.png',
                imgBackUrl_iOS:'/drawable/arrow_left_green.png',
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
                var platform= weex.config.env.platform.toLowerCase();
                var model=weex.config.env.deviceModel.toLowerCase();
                self.isiOS =platform == 'ios';
//                if (self.isiOS&&model.indexOf('iphone')>-1||platform=='android') {
                    configModule.getActionBarHeight(function (params) {
                        var scale;
//                        modal.toast({message:  'getActionBarHeight： ' + JSON.stringify(params), duration: 3});
                        if(params.hasOwnProperty("isLandScape")&&params.isLandScape==1){
                            configModule.getContainerHeight(function (params) {
                                // let ratio = this.$getConfig().env.devHeight /(2*750);
                                //从本地获取按钮的高度占布局高度的比值
//                                modal.toast({message: "getContainerHeight: "+JSON.stringify(params), duration: 3});
                                let ratio = params.ratio;
                                if (ratio !== null) {
                                    //由于是横屏显示，所以高度为设备的宽度
                                    self.actionBarHeight = 750 * ratio;
                                }
                            }.bind(this));
                        }else {
                            if (self.isiOS) {
                                scale = params.width / 750;
                            } else {
                                scale = weex.config.env.deviceWidth / 750;
                            }
                            self.actionBarHeight = params.height / scale;
                        }
//                    require('@weex-module/myModule').printLog('getActionBarHeight: '+self.actionBarHeight);
                    }.bind(this));
//                }else{
//                    configModule.getContainerHeight(function (params) {
//                        // let ratio = this.$getConfig().env.devHeight /(2*750);
//                        //从本地获取按钮的高度占布局高度的比值
//                        modal.toast({message: params.ratio , duration: 3});
//                        let ratio = params.ratio;
//                        if (ratio !== null) {
//                            //由于是横屏显示，所以高度为设备的宽度
//                            self.actionBarHeight = 750 * ratio;
//                        }
//                    }.bind(this));
//                }
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
//            self.getMeasure();
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
    .div_close {
        justify-content: center;
        align-items: center;
    }
    .img_back {
        @include wh();
        @include marginRow($bl);
        @include marginColumn($cl);
    }
    .text_close {
        margin: $cl;
        @include fontCommon($cs,#fff);
    }
    .text_titBar {
        text-align: left;
        @include fontCommon($hs,#fff);
        @include marginRow();
        flex:1;
    }

    .bg_ios{
        background-color:$fc;
        @include sideBorder(bottom,$bc);
    }
    .img_back_iOS {
        @include wh($bh,$bh);
        /*border-width: 1;*/
    }
    .text_active{
        @include fontCommon($bs,$colorCommon);
    }
    .right_ios{
        margin-right: $cl;
    }
    .text_tit_iOS {
        text-align: center;
        @include fontCommon($bs);
        font-family: HelveticaNeue-CondensedBlack;
    }
    .div_left_ios{
        flex-direction: row;
        align-items: center;

        @include paddingColumn();
        padding:$cl;
    }
    .div_tit_iOS {
        position: absolute;
        left: 0;
        right: 0;
        justify-content: center;
        align-items: center;
    }
</style>