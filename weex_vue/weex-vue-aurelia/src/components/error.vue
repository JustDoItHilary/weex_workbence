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
                default:''
            }
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div_hide{
        margin:$bl;
        justify-content:center;
        align-items: center;
        @include card();
    }
    .img_search{
        @include wh(280px,280px);
        @include marginColumn($bl);
    }
    .txt_hide{
        @include marginColumn($sl);
        @include fontCommon($bs,$css-grey);
    }
</style>