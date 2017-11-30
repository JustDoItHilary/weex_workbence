<template>
    <div v-ratio="ratio"
         class="div_item">
        <image v-ratio="ratio"
               class="img_logo"
               :src="imgUrl"></image>
        <text v-ratio="ratio"
              class="txt_tit">{{tit}}</text>
        <image v-ratio="ratio"
               class="img_logo"
               :src="imgUrl"
               @click="clickShow(item)"></image>
    </div>
</template>

<script>
    export default{
        props:[
            'tit','imgUrl','item'
        ],
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
        methods:{
            clickShow(item){
                this.$emit('clickShow',item)
//                item.showType=!item.showType;
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
        @include wh();
    }
    .txt_tit{
        flex:1;
    }
</style>