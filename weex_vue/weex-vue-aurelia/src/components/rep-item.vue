<template>
    <div>
        <div v-if="item.type==2">
            <div class="item">
                <div class="logo">
                    <div class="div_time">
                        <text style="font-size: 28px;color:#d9d9d9;">{{(new
                            Date(Date.parse(item.startTime))).getMonth()+1
                            }}月</text>
                    </div>
                    <div class="div_time div_year">
                        <text style="font-size: 28px;color:#ffffff;">{{item.sortTime.getFullYear()}}年</text>
                    </div>
                </div>
                <div class="flex_left">
                    <text class="text_tit">{{item.startTime +' - '+item.endTime}}</text>
                    <text :class="['text_content', 'select_' + (item.IsPost)]">{{item.checked}}</text>
                </div>
            </div>
            <text class="text_tit">下周工作计划：</text>
            <text class="text_mulit">{{item.myPlan}}</text>
        </div>
        <div class="else" v-if="item.type==3">
            <text class="text_else">{{item.tit}}</text>
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
        }
    }
</script>

<style>
    .border_bottom {
        border-bottom-width: 20px;
        border-color: #eeeeee;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .flex_center {
        flex: 1;
        align-items: center;
        margin-top: 28px;
        margin-bottom: 28px;
    }

    .text_center {
        font-size: 32px;
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
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .logo {
        height: 100px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
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
        margin-right: 20px;
    }

    .text_content {
        color: #bbbbbb;
        font-weight: normal;
        font-size: 24px;
        text-align: left;
        align-items: flex-start;
        margin-left: 20px;
    }

    .sec_cell {
        border-bottom-width: 20px;
        border-color: #ebedef;
        background-color: #ffffff;
    }

    .text_tit {
        height: 50px;
        margin-left: 20px;
        font-size: 32px;
    }

    .text_mulit {
        height: 120px;
        font-size: 28px;
        lines: 3;
        margin-left: 30px;
        margin-right: 30px;
    }

    .else {
        justify-content: center;
        align-items: center;
    }

    .text_else {
        text-align: center;
        font-size: 32px;
        color: #bbbbbb;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>