<template>
    <div v-ratio="ratio"
         class="div-border"
         :style="{'borderBottomWidth':bottomBorde}">
        <div v-ratio="ratio"
             class="div-peo">
            <text v-ratio="ratio"
                  class="txt-tit">{{txtTit}}</text>
            <div v-ratio="ratio"
                 class="div-scroll">
                <div v-ratio="ratio"
                     style="flex:1;"></div>
                <scroller v-ratio="ratio"
                          class="scroll"
                          scroll-direction="horizontal">
                    <text v-ratio="ratio"
                          v-for="item in peoList"
                          class="txt-tit">{{item.USERNAME}}</text>
                </scroller>
            </div>
            <slot v-ratio="ratio"
                  name="option"></slot>
            <text v-if="added"
                  v-ratio="ratio"
                  class="txt-add"
                  @click="clickAdd">添加</text>
        </div>
        <text v-ratio="ratio"
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
        computed:{
            ratio(){
                return this.$store.getters.ratio;
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
        @include cornerBtn($cs, #fff, $colorCommon)
    }

    .txt-explain {
        @include fontTip;
        margin-top: $sl;
    }

    .scroll {
        border-width: 1px;
        height: $bl;
        flex-direction: row;
        align-items: center;
        flex: 0;
        margin-left: $sl;
        margin-right: $sl;
    }

    .txt-tit {
        @include fontCommon;
        margin-right: $cl;
    }
</style>