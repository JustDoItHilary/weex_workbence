<template>
    <div class="div_hide">
        <image class="img_search"
               v-if="errorImg"
                :src="baseUrl+errorImg"></image>
        <text v-if="errorMess"
               class="txt_hide">{{errorMess}}</text>
    </div>
</template>


<script>

    module.exports={
        props:{
            errorImg:{
                type:String,
                default:''
            },
            errorMess:{
                type:String,
                default:'',
            },
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div_hide{
        justify-content:center;
        align-items: center;
        @include marginColumn($bl);
    }
    .img_search{
        @include wh(280px,280px);
    }
    .txt_hide{
        color: $css-grey;
        @include fontCommon($bs,$css-grey);
        @include marginColumn($sl);
    }
</style>