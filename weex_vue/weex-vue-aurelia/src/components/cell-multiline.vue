<template>
    <div>
        <text class="txt_content" :style="{color:txtColor}">{{tit}}</text>
        <text v-if="content"
              class="txt_content txt_div" :style="{color:contentColor}">{{content}}</text>
    </div>
</template>

<script>
    module.exports={
        props:{
            tit:{
                type:String,
                required:false,
                default:''
            },
            content:{
                type:String,
                required:false,
                default:''
            },
            titColor:{},
            contentColor:{},
        },
        computed:{
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";

    .txt_content {
        @include fontCommon();
    }
    .txt_div{
        margin-top: $cl;
    }
   /* .txt-big{
        @include fontCommon($bs);
    }
    .txt-small{
        @include fontCommon($ss,$css-grey);
    }*/
</style>