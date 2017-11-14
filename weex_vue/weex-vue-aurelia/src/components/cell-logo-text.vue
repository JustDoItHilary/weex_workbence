<template>
    <div class="div_row">
        <div class="div_logo">
            <text class="text_logo" v-if="firName">{{firName}}</text>
            <image class="img_logo" v-if="imgLogoUrl" :src="imgLogoUrl"></image>
        </div>
        <div class="div_member">
            <text class="text_member" v-if="tit">{{tit}}</text>
            <text class="text_code" v-if="content">{{content}}</text>
        </div>
        <slot class="div_member" name="endImg"></slot>
    </div>
</template>

<script>
    module.exports={
        props:{
            firName:{
                type:String
            },
            imgLogoUrl:{
                type:String
            },
            tit:{
                type:String
            },
            content:{
                type:String
            },
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin";

    .div_row{
        flex-direction:row;
        justify-content:center;
        align-items: center;
    }

    .div_logo {
        height: 64px;
        width: 64px;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
    }

    .text_logo {
        font-size: 36px;
        color: #ffffff;
    }
    .img_logo{
        height: 48px;
        width: 48px;
    }

    .text_member {
        font-size: 36px;
        flex:1;
    }

    .text_code {
        font-size: 28px;
        flex:1;
        color: #898989;
        margin-top: 10px;
    }

    .div_member {
        flex: 1;
        margin-left: 10px;
    }
</style>
