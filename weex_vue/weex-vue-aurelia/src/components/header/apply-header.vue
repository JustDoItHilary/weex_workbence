<template>
    <div>
        <div class="div_titBar bg_android" :style="{ height: actionBarHeight }" data-role="none"
             v-if="!isiOS">
            <!--回退按钮，监听事件放于子组件内部-->
            <div class="div_close" @click="clickClose">
                <image class="img_back" :src="baseUrl+imgBackUrl"></image>
            </div>
            <text class="text_titBar" style="flex:1;">{{tit}}</text>
            <!--完成按钮，需要同时设置 iOS 端，监听事件放于父组件-->
            <div @click="done" v-if="done">
                <image class="img_back" :src="baseUrl+imgDoneUrl"></image>
            </div>
        </div>

        <div class="div_titBar bg_ios" :style="{ height: actionBarHeight }" data-role="none" v-if="isiOS">
            <div class="div_titBar_iOS" :style="{ height: actionBarHeight }">
                <text class="text_titBar_iOS">{{tit}}</text>
            </div>
            <!--回退按钮，监听事件放于子组件内部-->
            <div class="div_titBar_iOS_def" @click="clickClose">
                <image class="img_back_iOS" :src="baseUrl+imgBackUrl_iOS"></image>
                <!--<text class="text_titBar_def_iOS">工作台</text>-->
            </div>
            <!--完成按钮，需要同时设置 Android 端，监听事件放于父组件-->
            <text class="text_titBar_def_iOS" @click="done" v-if="done">{{titRight}}</text>
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
        computed: {
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
                imgBackUrl_iOS:'/drawable/arrowLeft.png',
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
        },
        created: function (e) {
            let self = this;
            self.isiOS = self.$getConfig().env.platform == 'iOS';
//            console.log('isiOS', self.isiOS);
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
        background-color: #fff;
        border-color: $bc;
        border-bottom-width: 1px;
    }

    .div_close {
        justify-content: center;
        align-items: center;
        /*border-width: 1;*/
    }

    .img_back {
        height: 48px;
        width: 48px;
        margin-right: 36px;
        margin-left: 36px;
        margin-top: 16px;
        margin-bottom: 16px;
    }

    .img_back_iOS {
        height: 40px;
        width: 40px;
        margin-left: 10px;
        /*border-width: 1;*/
    }

    .text_close {
        margin: 20px;
        font-size: 28px;
        color: #ffffff;
    }

    .text_titBar {
        text-align: left;
        font-size: 40px;
        color: #ffffff;
        /*border-width: 1;*/
        margin-left: 28px;
        margin-right: 28px;
    }

    .text_titBar_def_iOS {
        /*font-size: 40;*/
        font-size: 32px;
        color: $colorCommon;
        margin-right: 28px;
        /*border-width: 1;*/
    }

    .text_titBar_iOS {
        text-align: center;
        /*font-size: 42;*/
        font-size: 36px;
        color: black;
        font-family: HelveticaNeue-CondensedBlack;
    }

    .div_titBar_iOS_def {
        flex-direction: row;
        align-items: center;
        /*border-width: 1;*/
    }

    .div_titBar_iOS {
        position: absolute;
        left: 0;
        right: 0;
        justify-content: center;
        align-items: center;
    }
</style>