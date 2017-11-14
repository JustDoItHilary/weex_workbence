<template>
    <div class="div_item">
        <image class="img_logo" :src="imgUrl"></image>
        <text class="txt_tit">{{tit}}</text>
        <image class="img_logo" :src="imgUrl" @click="clickShow(item)"></image>
    </div>
</template>

<script>
    export default{
        props:[
            'tit','imgUrl','item'
        ],
        methods:{
            clickShow(item){
                this.$emit('clickShow',item)
//                item.showed=!item.showed;
            }
        }
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div_item {
        flex-direction: row;
    }
    .img_logo{
        height:48px;
        width:48px;
    }
    .txt_tit{
        flex:1;
    }
</style>