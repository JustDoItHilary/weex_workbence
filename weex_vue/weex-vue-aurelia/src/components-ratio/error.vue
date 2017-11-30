<template>
    <div v-ratio="ratio"
         style="margin-top: 16;margin-bottom: 16;"
         class="div_hide">
        <image v-ratio="ratio"
                style="width: 140;height:140;"
                :src="baseUrl+errorImg"></image>
        <text  v-ratio="ratio"
               v-if="errorMess"
               style="font-size: 16;margin-top: 4;margin-bottom: 4;"
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
        flex:1;
//        /*<!--padding:$sl;-->*/
//        @include marginColumn($cl);
    }
    .img_search{
        @include wh(140px,140px);
    }
    .txt_hide{
        color: $css-grey;
//        @include fontCommon($bs,$css-grey);
//        @include marginColumn($sl);
    }
</style>