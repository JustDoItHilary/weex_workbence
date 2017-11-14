<template>
    <div style="background-color: #fff;">
        <scroller>
            <div v-for="(item,index) in list">
                <!--<div class="div_multi margin_row">-->
                    <!--<text>桂枝茯苓胶囊</text>-->
                    <!--<div style="flex-direction:column;">-->
                        <!--<text>上次购药</text>-->
                        <!--<text>上次购药</text>-->
                    <!--</div>-->
                <!--</div>-->
                <cell-time class="padding_row padding_column bg_selected" txtLeft="桂枝茯苓胶囊" txtRight="上次购药" txtRightElse="预计用完"></cell-time>
                <div>
                    <cell-multi class="margin_row" txtBig="用药提示" txtSmall="桂枝茯苓胶囊：子宫肌瘤，妇科炎症
具有活血、化瘀的功效，活血化瘀力量大，促进淤血肿块消除疗效好。"></cell-multi>
                </div>
                <div>
                    <bottom-btn class="margin_column" btnHeight="64px" txtLeft="打电话" txtRight="转出" :left="clickLeft"
                                :right="clickRight"></bottom-btn>
                </div>
                <div class="div_tab">
                    <div v-for="(tab,tabIndex) in tabItems" :class="['div_tab_item',tab.selected?'border_selected':'border_selected_false']" @click="clickTab(tab)">
                        <text style="text-align: center;" :class="[tab.selected?'color_selected':'' ]">{{tab.tit}}</text>
                    </div>
                </div>
                <!--<cell-time class="margin_row margin_column" txtLeft="会员卡号" txtRight="001044599"></cell-time>-->
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
        computed:{
            tabs(){
                return this.$store.getters.getTab
            }
        },
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

            },
            clickTab(tab){
                let self=this;
                for(var i=0;i<self.tabItems.length;i++){
                    self.tabItems[i].selected=false;
                }
                tab.selected=true;
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

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
    }

    .div_tab_item {
        flex: 1;
        justify-content: center;
        align-items:center;
    }

    .bg_selected {
        background-color: $colorCommon;
    }
    .border_selected{
        border-bottom-width: 6px;
        border-color: $colorCommon;
        padding-bottom:10px;
    }
    .border_selected_false{
        border-bottom-width: 1px;
        border-color: $bc;
        padding-bottom:16px;
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
</style>