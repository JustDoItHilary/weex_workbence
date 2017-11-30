<template>
    <div>
        <div v-if="item.type==2"
             v-ratio="ratio">
            <div v-ratio="ratio"
                 class="item">
                <div v-ratio="ratio"
                     class="logo">
                    <div v-ratio="ratio"
                         class="div_time">
                        <text v-ratio="ratio"
                              class="txt_common"
                              style="color:#d9d9d9;">{{(new
                            Date(Date.parse(item.startTime))).getMonth()+1
                            }}月</text>
                    </div>
                    <div v-ratio="ratio"
                         class="div_time div_year">
                        <text v-ratio="ratio"
                              class="txt_common"
                              style="color: #fff;">{{item.sortTime.getFullYear()}}年</text>
                    </div>
                </div>
                <div v-ratio="ratio"
                     class="flex_left">
                    <text v-ratio="ratio"
                          class="text_tit">{{item.startTime +' - '+item.endTime}}</text>
                    <text v-ratio="ratio"
                          :class="['text_content', 'select_' + (item.IsPost)]">{{item.checked}}</text>
                </div>
            </div>
            <text v-ratio="ratio"
                  class="text_tit">下周工作计划：</text>
            <text v-ratio="ratio"
                  class="text_mulit">{{item.myPlan}}</text>
        </div>
        <div v-ratio="ratio"
             class="else"
             v-if="item.type==3">
            <text v-ratio="ratio"
                  class="text_else">{{item.tit}}</text>
        </div>
    </div>
</template>

<script scoped>
    module.exports = {
        props: {
            item: {
                type: Object,
                required: true,
                default: {},
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
        border-bottom-width: $ss;
        border-color: #eeeeee;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .flex_center {
        flex: 1;
        align-items: center;
        margin-top: $cs;
        margin-bottom: $cs;
    }

    .text_center {
        font-size: $bs;
        text-align: center;
    }

    .select_true {
        color: #58D68D;
    }

    .select_false {
        color: #aaaaaa;
    }

    .item {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: $ss;
        margin-bottom: $ss;
    }

    .logo {
        height: 100px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: $ss;
        border-width: 2px;
        border-color: #d9d9d9;
        /*background-color: #58D68D;*/
    }

    .div_time {
        flex: 1;
        width: 100px;
        justify-content: center;
        align-items: center;
        margin-left: 0;
        margin-right: 0;
    }

    .div_year {
        background-color: #d9d9d9;
    }

    .img_center {
        width: 96px;
        height: 96px;
    }

    .flex_left {
        margin: 10px;
        flex: 1;
        align-items: flex-start;
    }

    .rad_border {
        border-width: 2px;
        border-color: #ebedef;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 90px;
        margin-right: $ss;
    }

    .text_content {
        color: #bbbbbb;
        font-weight: normal;
        font-size: $ss;
        text-align: left;
        align-items: flex-start;
        margin-left: $ss;
    }

    .sec_cell {
        border-bottom-width: $ss;
        border-color: #ebedef;
        background-color: #ffffff;
    }

    .text_tit {
        height: 50px;
        margin-left: $ss;
        font-size: $bs;
    }

    .text_mulit {
        height: 120px;
        font-size: $cs;
        lines: 3;
        margin-left: $bs;
        margin-right: $bs;
    }

    .else {
        justify-content: center;
        align-items: center;
    }

    .text_else {
        text-align: center;
        font-size: $bs;
        color: #bbbbbb;
        margin-top: $ss;
        margin-bottom: $ss;
    }
    .txt_common{
        @include fontCommon();
    }
</style>