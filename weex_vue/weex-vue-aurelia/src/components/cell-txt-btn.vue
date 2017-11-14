<template>
    <div class="div-border" :style="{'borderBottomWidth':bottomBorder+'px'}">
        <div class="div-peo">
            <text class="txt-tit">{{txtTit}}</text>
            <slot name="option"></slot>
            <text v-if="btnName" class="txt_btn" @click="click">{{btnName}}</text>
        </div>
        <text v-if="txtExplain" class="txt-explain">{{txtExplain}}</text>
    </div>
</template>

<script>
    module.exports = {
        props: {
            type: {
                type: String,
                required: false,
                default: ''
            },
            txtTit: {
                type: String,
                required: true,
                default: ''
            },
            btnName:{
                type:String,
                required:false,
            },
            txtExplain: {
                type: String,
                required: false,
                default: ''
            },
            bottomBorder: {
                type: String,
                required: false
            }
        },
        methods: {
            click: function () {
                this.$emit('clickBtn', this.type)
            }
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";

    .div-border {
        border-color: $bc;
    }

    .div-peo {
        @include divRow;
    }
    .txt_btn {
        @include cornerBtn(28px, #fff, $colorCommon)
    }
    .txt-explain {
        @include fontTip;
        margin-top: 10px;
    }
    .txt-tit {
        @include fontCommon;
        margin-right: 16px;
    }
</style>