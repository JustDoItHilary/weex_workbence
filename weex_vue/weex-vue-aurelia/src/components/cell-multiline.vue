<template>
    <div>
        <text class="txt-big">{{txtBig}}</text>
        <text class="txt-small">{{txtSmall}}</text>
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
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";
    .txt-big{
        font-size: 32px;
        color: #000;
    }
    .txt-small{
        font-size: 20px;
        color: $css-grey;
    }
</style>