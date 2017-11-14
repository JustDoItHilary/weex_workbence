<template>
    <div class="border_bottom">
        <div class="flex_center" style="border-right-width: 2px;border-color:#eeeeee;" @click="labelOne">
            <div style="flex-direction: row;padding:20px;">
                <text :class="['text_center', 'select_' + (selected)]">{{labelOneTxt}}</text>
                <text v-if="oneInfo" class="txt_info">{{oneInfo}}</text>
            </div>
        </div>
        <div class="flex_center" @click="labelTwo">
            <div style="flex-direction: row;padding:20px;">
                <text :class="['text_center', 'select_' + (!selected)]">{{labelTwoTxt}}</text>
                <text v-if="twoInfo" class="txt_info">{{twoInfo}}</text>
            </div>
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
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .border_bottom {
        /*border-bottom-width: 20px;*/
        /*border-color: #eeeeee;*/
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .flex_center {
        flex: 1;
        align-items: center;
        @include marginColumn(10px);
    }

    .text_center {
        font-size: 32px;
        text-align: center;
        @include paddingRow(16px);
    }

    .select_true {
        color: $colorCommon;
    }

    .select_false {
        color: #aaaaaa;
    }

    .txt_info {
        position: absolute;
        right: 0px;
        top: 10px;
        height: 28px;
        text-align: center;
        background-color: #f00;
        @include paddingRow(7px);
        @include borderRadius(50px);
        @include fontCommon(24px, #fff);
    }

</style>