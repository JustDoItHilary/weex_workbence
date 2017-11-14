<template>
    <div class="div-border" :style="{'borderBottomWidth':bottomBorder+'px'}">
        <div class="div-peo">
            <text class="txt-tit">{{txtTit}}</text>
            <div class="div-scroll">
                <div style="flex:1;"></div>
                <scroller class="scroll" scroll-direction="horizontal">
                    <text v-for="item in peoList" class="txt-tit">{{item.USERNAME}}</text>
                </scroller>
            </div>
            <slot name="option"></slot>
            <text v-if="added" class="txt-add" @click="clickAdd">添加</text>
        </div>
        <text class="txt-explain">{{txtExplain}}</text>
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
            added: {
                type: Boolean,
                required: false,
                default: false
            },
            txtExplain: {
                type: String,
                required: false,
                default: ''
            },
            peoList: {
                type: Array,
                required: false,
                default: function () {
                    return []
                }
            },
            bottomBorder: {
                type: String,
                required: false
            }
        },
        methods: {
            clickAdd: function () {
                this.$emit('clickAddPeo', this.type)
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

    .div-scroll {
        @include divRow;
        flex: 1;
        justify-content: flex-end;
    }

    .txt-add {
        @include cornerBtn(28px, #fff, $colorCommon)
    }

    .txt-explain {
        @include fontTip;
        margin-top: 10px;
    }

    .scroll {
        border-width: 1px;
        height: 48px;
        flex-direction: row;
        align-items: center;
        flex: 0;
        margin-left: 8px;
        margin-right: 8px;
    }

    .txt-tit {
        @include fontCommon;
        margin-right: 16px;
    }
</style>