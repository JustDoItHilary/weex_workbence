<template>
    <div class="div_bottom">
        <div class="div_item_bottom"
             :style="{height:btnHeight,backgroundColor:bgColor,borderColor:btnColor}"
             @click="left">
            <text class="text_bottom" :style="{color:btnColor}">{{txtLeft}}</text>
        </div>
        <div class="div_item_bottom"
             :style="{height:btnHeight,backgroundColor:bgColor,borderColor:btnColor,marginTop:btnMargin,marginBottom:btnMargin}"
             @click="right" v-if="txtRight">
            <text class="text_bottom" :style="{color:btnColor,fontSize:txtSize}">{{txtRight}}</text>
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
            txtSize: {
                type: String,
                required: false,
                default: ''
            },
            btnHeight: {
                type: String,
                required: false,
                default: ''
            },
            btnColor: {
                type: String,
                required: false,
                default: ''
            },
            bgColor: {
                type: String,
                required: false,
                default: '#FFF'
            },
            btnMargin: {
                type: String,
                required: false,
                default: '',
            },
            btnRadius: {},
            left: {
                type: Function
            },
            right: {
                type: Function
            },
        },
    }
</script>

<style scoped>
    .div_bottom {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .div_item_bottom {
        justify-content: center;
        align-items: center;
        flex: 1;
        border-radius: 12px;
        border-width: 2px;
        /*border-color: #58D68D;*/
        margin-left: 36px;
        margin-right: 36px;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .text_bottom {
        text-align: center;
        font-size: 32px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 8px;
        margin-bottom: 8px;
        /*color:#58D68D;*/
    }
</style>