<template>
    <div>
        <div class="div_header">
            <text class="txt_header">姓名</text>
            <text class="txt_header">任务类型</text>
            <text class="txt_header">重要程度</text>
        </div>
        <scroller>
            <div v-for="(item,index) in list" style="align-items: center;">
                <div class="div_root">
                    <text class="txt_one">王晓霞</text>
                    <div class="div_two">
                        <text class="color_selected">王晓霞</text>
                    </div>
                    <image class="img_one" src="http://192.168.100.120:8888/weex/drawable/apply.png"></image>
                    <image class="img_two" src="http://192.168.100.120:8888/weex/drawable/ic_keyboard_arrow_right_black_48dp.png"></image>
                </div>
                <div  class="div_warn padding_row margin_column">
                    <text>没有更多数据</text>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import CellMulti from '../../components/cell-multiline.vue'
    import BottomBtn from '../../components/footer/bottom-btn.vue'
    import CellTime from '../../components/cell-justify.vue'
    import CellTab from '../../components/footer/cell-tab.vue'


    export default {
        components: {
            CellMulti, BottomBtn,CellTime,CellTab,
        },
//        computed:{
//            tabs(){
//                return this.$store.getters.getTab
//            }
//        },
        data(){
            return {
                list: [1],
                tabItems: [
                    {
                        tit: "顾客信息",
                        selected: true
                    },
                    {
                        tit: "关联用药",
                        selected: false
                    },
                    {
                        tit: "消费记录",
                        selected: false
                    },
                ],
            }
        },
        methods: {
            clickLeft: function () {

            },
            clickRight: function () {

            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_header{
        flex-direction:row;
        justify-content:center;
        width:750px;
        background-color: $colorCommon;
        @include paddingColumn(20px);
        padding-right: 80px;
        padding-left: 10px;
    }
    .txt_header{
        color:#fff;
        flex:1;
    }
    .div_multi {
        flex-direction: row;
        background-color: $bgColor;
        justify-content: space-between;
        align-items: center;
        @include marginRow(10px);
    }

    .div_tab {
        flex-direction: row;
        width:750px;
        border-bottom-width: 1px;
        border-color: $bc;
    }

    .div_tab_item {
        flex: 1;
        justify-content: center;
        align-items:center;
        padding-bottom:10px;
    }

    .bg_selected {
        background-color: $colorCommon;
    }
    .border_selected{
        border-color: $colorCommon;
        border-bottom-width: 6px;
    }
    .color_selected {
        color: $colorCommon;
    }
    .margin_row{
        @include marginRow
    }
    .margin_column{
        @include marginColumn
    }
    .padding_row{
        @include paddingRow
    }
    .padding_column{
        @include paddingColumn
    }
    .div_root{
        width:750px;
        flex-direction:row;
        justify-content:space-between;
        align-items: center;
        border-bottom-width: 2px;
        border-color: $bc;
        @include paddingColumn(10px);
        @include paddingRow(10px)
    }
    .div_two{
        background-color: $bg;
        border-radius: 50px;
        justify-content:center;
        align-items: center;
        @include paddingRow;
        @include paddingColumn(8px)
    }
    .img_one{
       width:64px;
        height:64px;
        background-color: $colorCommon;
    }
    .img_two{
        width:64px;
        height:64px;
    }
    .div_warn{
        border-radius: 50px;
        border-width: 2px;
        border-color: $css-grey;
        @include paddingColumn(8px);
    }
</style>