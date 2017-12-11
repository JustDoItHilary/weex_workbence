<template>
    <refresh class="refresh">
        <text class="txt_refresh">{{refreshTxt}}</text>
    </refresh>
</template>

<script>
    export default{
        props:{
           refreshTxt:{
               type:String,
               default:'加载中...'
           },
        },
        data(){
            return {

            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .refresh{
        @include inCenter;
        @include paddingColumn($sl);
    }
</style>