<template>
    <div class="border_bottom">
        <div :class="['flex_center', 'div_tab_left', 'div_select_' + (selectLeft)] "
             @click="tabOne">
            <text :class="['text_center', 'txt_select_' + (selectLeft)]">{{tabOneTxt}}</text>
            <text v-if="oneInfo"
                  class="txt_info">{{oneInfo}}</text>
        </div>
        <!--<text :class="[isA?'active':'']">ksljflskjdflks</text>-->
        <div :class="['flex_center', 'div_tab_right', 'div_select_' + (!selectLeft)]"
             @click="tabTwo">
            <text :class="['text_center', 'txt_select_' + (!selectLeft)]">{{tabTwoTxt}}</text>
            <text v-if="twoInfo"
                  class="txt_info">{{twoInfo}}</text>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            selectLeft: {
                tyep: Boolean,
                required: true,
                default: ''
            },
            tabOneTxt: {
                type: String,
                required: true,
                default: ''
            },
            tabTwoTxt: {
                type: String,
                required: true,
                default: ''
            },
            oneInfo: {
                type: String
            },
            twoInfo: {
                type: String
            },
            tabOne: {
                type: Function
            },
            tabTwo: {
                type: Function
            },
        },
        computed: {
        },
        data(){
            return {
                isA:true
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .border_bottom {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        @include paddingRow($cl)
        //@include borderCommon($mlw,$colorCommon);
    }

    .flex_center {
        flex: 1;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        @include paddingColumn($slw);
        @include paddingRow($clw);
    }

    .text_center {
        text-align: center;
        @include fontCommon($bs);
    }

    .txt_select_false {
        color: $colorCommon;
    }

    .txt_select_true {
        color: $fc;
    }
    .div_select_true {
        background-color: $colorCommon;
    }
    .div_select_false {
        background-color: $fc;
        //@include borderRadius();
    }
    .active:active{
        background-color: yellow;
    }
    /*.div_select_false:active {*/
        /*background-color: yellow;*/
    /*}*/
    .txt_info {
        position: relative;
        left: 0;
        top: -$clw;
        height: $blw;
        text-align: center;
        background-color: #f00;
        @include paddingRow($slw);
        @include borderRadius($bRadius);
        @include fontCommon($cs, #fff);
    }

    .div_tab_left {
         border-top-left-radius: $radius;
         border-bottom-left-radius: $radius;
         border-color: $colorCommon;
         border-width:2;
     }

    .div_tab_right {
        border-top-right-radius: $radius;
        border-bottom-right-radius: $radius;
        border-color: $colorCommon;
        border-width:2;
    }
</style>