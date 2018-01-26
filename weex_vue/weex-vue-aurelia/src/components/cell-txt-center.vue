<template>
    <div class="div">
        <slot name="left"></slot>
        <text class="txt" :style="{color:fontColor}" @click="click">{{txt}}</text>
        <slot name="right"></slot>
    </div>
</template>

<script>
    module.exports={
        props:{
            txt:{
                type:String,
                required:false,
                default:''
            },
            fontColor:{
                type:String,
                default:'#000'
            },
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
        methods:{
            click(){
                this.$emit('clickTxtCenter',this.txt);
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div{
            flex-direction:row;
            justify-content:center;
            align-items:center;
    }
    .txt{
        flex:1;
        text-align: center;
        @include fontCommon($cs,$css-grey)
    }
</style>