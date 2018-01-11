<template>
    <div class="border_bottom">
        <div class="flex_center div_border div_label"
             @click="labelOne">
            <!--<div class="div_label">-->
                <text :class="['text_center', 'select_' + (selected)]">{{labelOneTxt}}</text>
                <text v-if="oneInfo"
                      class="txt_info">{{oneInfo}}</text>
            <!--</div>-->
        </div>
        <div class="flex_center div_label"
             @click="labelTwo">
            <!--<div class="div_label">-->
                <text :class="['text_center', 'select_' + (!selected)]">{{labelTwoTxt}}</text>
                <text v-if="twoInfo"
                      class="txt_info">{{twoInfo}}</text>
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            selected: {
                tyep: Boolean,
                required: true,
                default: ''
            },
            labelOneTxt: {
                type: String,
                required: true,
                default: ''
            },
            labelTwoTxt: {
                type: String,
                required: true,
                default: ''
            },
            oneInfo:{
                type:String
            },
            twoInfo:{
                type:String
            },
            labelOne: {
                type: Function
            },
            labelTwo: {
                type: Function
            },
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .border_bottom {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }

    .flex_center {
        flex: 1;
        align-items: center;
        @include marginColumn($slw);
    }

    .text_center {
        text-align: center;
        @include fontCommon($bs);
//        @include paddingRow($sl);
    }

    .select_true {
        color: $colorCommon;
    }

    .select_false {
        color: $css-grey;
    }

    .txt_info {
        position: relative;
        left:0;
        top: -$clw;
        height: $blw;
        text-align: center;
        background-color: #f00;
        @include paddingRow($slw);
        @include borderRadius($bRadius);
        @include fontCommon($cs, #fff);
    }
    .div_border{
        @include sideBorder(right,$bc,$borderW);
    }
    .div_label{
        flex-direction: row;
        justify-content:center;
        align-items: center;
        @include paddingColumn($clw);
        @include paddingRow($clw);
    }

</style>