<template>
    <div >
        <text class="txt_tit">消费记录</text>
        <scroller>
            <div v-for="(item,index) in list" class="div_item">
                <cell-multi txtBig="tit" txtSmall="content"></cell-multi>
            </div>
        </scroller>
    </div>
</template>

<script>
    export default{
        components:{
            CellMulti:require('../../components/cell-multiline.vue'),
        },
        data(){
            return {
                list:[1,2,3,4,5,6],
            }
        },
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_root{
        justify-content:center;
        align-items: center;
    }
    .txt_tit{
        @include fontCommon(32px,$colorCommon)
    }
    .div_item{
        border-bottom-width: 1px;
        border-color: $bc;
        @include marginRow;
        @include paddingRow;
        @include paddingColumn(10);
    }
</style>