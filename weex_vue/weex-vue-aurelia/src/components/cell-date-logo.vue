<template>
    <!--
     7月
    2017年
    -->
    <div :class="['logo',type?'logo_true':'logo_false']">
        <div class="div_time">
            <text :class="['text_logo',type?'mon_true':'mon_false']">{{month}}月</text>
        </div>
        <div :class="['div_time',type?'year_true':'year_false']">
            <text :class="['text_logo',type?'year_true':'year_false']">{{year}}年</text>
        </div>
    </div>
</template>

<script>
    module.exports={
        props:{
            month:{
                type:String,
                required:false,
                default:''
            },
            year:{
                type:String,
                required:false,
                default:''
            },
            //是否完成：未完成 - 绿色； 完成/被驳回 - 灰色
            type:{
                type:Boolean,
                required:false,
            },
        },
        data:function () {
            return {
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";
    .logo {
        height: 100px;
        width:100px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        border-width: 2px;
    }
    .logo_true{
        border-color: #d9d9d9;
    }
    .logo_false{
        border-color: $colorCommon;
    }
    .mon_true{
        color: #d9d9d9;
    }
    .mon_false{
        color: $colorCommon;
    }
    .year_true{
        background-color: #d9d9d9;
        color: #fff;
    }
    .year_false{
        background-color: $colorCommon;
        color: #fff;
    }
    .div_time {
        flex: 1;
        width: 100px;
        justify-content: center;
        align-items: center;
    }
    .text_logo {
        font-size: 28px;
    }
</style>