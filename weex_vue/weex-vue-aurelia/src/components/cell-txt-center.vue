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
        methods:{
            click(){
                this.$emit('clickTxtCenter',this.txt);
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin.scss";

    .div{
            flex-direction:row;
            justify-content:center;
            align-items:center;
    }
    .txt{
        flex:1;
        font-size: 32px;
        text-align: center;
        @include fontCommon(34px,$css-grey)
    }
</style>