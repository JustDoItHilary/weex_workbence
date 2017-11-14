<template>
    <div>
        <div class="div_titBar bgColor" :style="{height:actionBarHeight+'px'}" data-role="none"
             v-if="!isiOS">
            <div class="div_titBar" @click="clickClose">
                <img class="img_back" src="../../../assets/img/ic_back_white_48dp.png"/>
                <!--<image class="image" src="https://news.ycombinator.com/favicon.ico"></image>-->
            </div>
            <text class="text_titBar" style="flex:1;">{{tit}}</text>
        </div>
        <div class="div_titBar" :style="{ height : actionBarHeight+'px'}" data-role="none" v-if="isiOS">
            <div class="div_tit_iOS" :style="{ height : actionBarHeight+'px'}">
                <text class="text_tit_iOS">{{tit}}</text>
            </div>
            <div class="div_titBar" @click="clickClose">
                <img class="img_back_iOS" src="../../../assets/img/arrowleft.png"/>
                <text class="text_def_iOS">工作台</text>
            </div>
            <text class="text_def_iOS" @click="clickRight">{{titRight}}</text>
        </div>
    </div>
</template>
<script>
    const configModule = weex.requireModule('configModule')
    const navigator = weex.requireModule('navigator')

    export default{
        data(){
            return {
                isiOS: false,
                actionBarHeight: 112,
                bgColor: 'rgb(64, 146, 242)',
            }
        },
        props: ['tit', 'titRight'],
        methods: {
            setTit(params){
                var self = this;
                self.tit = params;
            },
            setTitElse(params){
                var self = this;
                self.titRight = params;
            },
            clickClose(e){
                var self = this;
                console.log('CLICK', 'close');
                var params = {'animated': 'true'};
                navigator.pop(params, function (ret) {
                });
            },
            clickRight(e){
                var self = this;
                console.log('CLICK', 'right');
            },
            setMeasure(){
                var self = this;
                //获取 actionbar height
                configModule.getActionBarHeight(function (params) {
                    var ratio;
                    if (self.isiOS) {
                        ratio = params.width / 750;
                    } else {
                        ratio = weex.config.env.deviceWidth / 750;
                    }
                    self.actionBarHeight = params.height / ratio;
                });
            },
        },
        created(){
            var self = this;
//            self.isiOS = weex.config.env.platform == 'iOS';
//            console.log('isiOS', weex.config);
//            self.setMeasure();
        },
    }

</script>
<style scoped>
    /*@import '../../../style/mixin';*/

    /*.logo {*/
    /*position: relative;*/
    /*width: 50px;*/
    /*height: 50px;*/
    /*top: 35px;*/
    /*left: 35px;*/
    /*border-width: 3px;*/
    /*border-style: solid;*/
    /*border-color: #FFFFFF;*/
    /*}*/
    /*.image {*/
    /*width: 44px;*/
    /*height: 44px;*/
    /*}*/
    .div_titBar {
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        flex-direction: row;
        /*display: flex;*/
        justify-content: space-between;
        align-items: center;
        /*border: 1px #ff00ff solid;*/
    }

    .bgColor {
        background-color: rgb(64, 146, 242)
    }

    .div_tit_iOS {
        position: absolute;
        left: 0;
        right: 0;
        /*display: flex;*/
        justify-content: center;
        align-items: center;
        /*border-width: 1px;*/
        /*border: 1px #00ffff solid;*/
    }

    .img_back {
        margin: 0 auto;
        height: 48px;
        width: 48px;
        /*margin-right: 36px;*/
        /*margin-left: 36px;*/
        /*margin-top: 16px;*/
        /*margin-bottom: 16px;*/
    }

    .img_back_iOS {
        display: flex;
        height: 48px;
        width: 40px;
        margin-left: 10px;
        /*border: 1px #ff0000 solid;*/
    }

    .text_titBar {
        text-align: left;
        font-size: 40px;
        color: white;
        margin-left: 28px;
    }

    .text_tit_iOS {
        font-size: 34px;
        color: #000;
        text-align: center;
        font-family: HelveticaNeue-CondensedBlack;
        /*border-width: 1px;*/
        /*border: 1px #00ffff solid;*/
    }

    .text_def_iOS {
        /*flex: 1;*/
        font-size: 32px;
        color: rgb(22, 149, 252);
        margin-right: 28px;
        /*border-width: 1px;*/
        /*border: 1px #ff0000 solid;*/
    }
</style>
