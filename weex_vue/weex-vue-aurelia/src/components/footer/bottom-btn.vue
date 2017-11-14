<template>
    <div class="div_bottom">
        <div v-if="btnHeight" class="div_item_bottom"
             :style="{height: btnHeight}"
             @click="left">
            <text class="text_bottom">{{txtLeft}}</text>
        </div>
        <div v-else class="div_item_bottom"
             @click="left">
            <text class="text_bottom">{{txtLeft}}</text>
        </div>
        <div class="div_item_bottom"
             :style="{height:btnHeight}"
             @click="right" v-if="txtRight&&btnHeight">
            <text class="text_bottom">{{txtRight}}</text>
        </div>
        <div class="div_item_bottom"
             @click="right" v-if="txtRight&&!btnHeight">
            <text class="text_bottom">{{txtRight}}</text>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            txtLeft: {
                type: String,
                required: true,
                default: 'LEFT'
            },
            txtRight: {
                type: String,
                required: false,
                default: ''
            },
            btnHeight: {
                type: String,
                required: false,
                default: ''
            },
            left: {
                type: Function
            },
            right: {
                type: Function
            },
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .div_bottom {
        /*position:absolute;*/
        /*bottom:0;*/
        /*right:0;*/
        /*left:0;*/
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: $bgColor;
    }

    .div_item_bottom {
        @include marginRow(16px);
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: $colorCommon;
        flex: 0.8;
        flex-direction: row;
    }

    .text_bottom {
        @include fontCommon(32px);
//        @include marginRow;
        @include marginColumn(12px);
        text-align: center;
        color: #fff;
    }
</style>