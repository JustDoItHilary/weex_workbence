<template>
    <div class="div-border"
         :style="{'borderBottomWidth':bottomBorder}">
        <div class="div-peo">
            <text class="txt-tit">{{txtTit}}</text>
            <slot name="option"></slot>
            <text v-if="btnName"
                  class="txt_btn"
                  @click="click">{{btnName}}</text>
        </div>
        <text v-if="txtExplain"
              class="txt-explain">{{txtExplain}}</text>
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
        computed:{
            ratio(){
                return this.$store.getters.ratio;
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
    @import "../style/mixin";

    .div-border {
        border-color: $bc;
    }

    .div-peo {
        @include divRow;
    }
    .txt_btn {
        @include cornerBtn($cs, #fff, $colorCommon)
    }
    .txt-explain {
        @include fontTip;
        margin-top: $sl;
    }
    .txt-tit {
        @include fontCommon;
        margin-right: $cl;
    }
</style>