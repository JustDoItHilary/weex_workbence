<template>
    <div>
        <text   
              class="txt-big">{{txtBig}}</text>
        <text   
              class="txt-small">{{txtSmall}}</text>
    </div>
</template>

<script>
    module.exports={
        props:{
            txtBig:{
                type:String,
                required:false,
                default:''
            },
            txtSmall:{
                type:String,
                required:false,
                default:''
            },
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";

    .txt-big{
        @include fontCommon($bs);
    }
    .txt-small{
        @include fontCommon($ss,$css-grey);
    }
</style>