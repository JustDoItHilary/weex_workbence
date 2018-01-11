
<template>
    <div>
        <div  class="row2" :style="getStyle(20)">
            <div v-for="(text, k) in list" class="item2">
                <div>
                    <text>{{text}}</text>
                </div>
            </div>
        </div>


        <cell-tab :style="getStyle(0)" :list="list" ></cell-tab>
        <cell-tab :style="getStyle(10)" :list="list" ></cell-tab>
        <cell-tab :style="getStyle(20)" :list="list" ></cell-tab>
        <cell-tab :style="getStyle(30)" :list="list" ></cell-tab>
        <cell-tab :style="getStyle(40)" :list="list" ></cell-tab>


        <!--<div style="" :style="{marginLeft:getMargin(0),marginRight:getMargin(0)}">-->
        <!--<text class="txt" v-for="item in list">{{item}}</text>-->
        <!--</div>-->

        <div v-for="item in list2" class="row"  :style="getStyle(item)">
            <div v-for="(text, k) in list" class="item">
                <!--<div>-->
                <text>{{text}}</text>
                <!--</div>-->
            </div>
        </div>

        <!--<cell-tab class="cell_tab" :style="getMargins(0)" :list="list"  @clickTabPar="clickTabPar"></cell-tab>-->
        <!--<cell-tab class="cell_tab" :style="getMargins(10)" :list="list" @clickTabPar="clickTabPar"></cell-tab>-->
        <!--<cell-tab class="cell_tab" :style="getMargins(20)" :list="list" @clickTabPar="clickTabPar"></cell-tab>-->
        <!--<cell-tab class="cell_tab" :style="getMargins(30)" :list="list" @clickTabPar="clickTabPar"></cell-tab>-->

        <!--<cell-tab class="cell_tab"  :list="list" :tabWidth="getWidth(0)" @clickTabPar="clickTabPar"></cell-tab>-->
        <!--<cell-tab class="cell_tab" style="margin-left: 10;margin-right: 10;" :list="list" :tabWidth="getWidth(10)" @clickTabPar="clickTabPar"></cell-tab>-->
        <!--<cell-tab class="cell_tab" style="margin-left: 20;margin-right: 20;" :list="list" :tabWidth="getWidth(20)" @clickTabPar="clickTabPar"></cell-tab>-->
        <!--<cell-tab class="cell_tab" style="margin-left: 30;margin-right: 30;"  :list="list" :tabWidth="getWidth(30)" @clickTabPar="clickTabPar"></cell-tab>-->
    </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "./style/mixin";

    .item {
        flex: 1;
        justify-content: center;
        align-items: center;
        border-width: 1;
    }

    .row {
        flex-direction: row;
    }
    .item2{
        flex:1;
        justify-content: center;
        align-items:center;
        border-width:1;
    }
    .row2{
        flex-direction: row;
        height:80px;
    }
</style>
<script>
    module.exports = {
        components: {
            CellTab: require('./components/tab/sy-tab2.vue')
        },
        data: function () {
            return {
                list: ["全部", "重点商品", "重点孕婴", "重点糖sdfsdfs尿病", "重点商品", "重点孕婴", "重点糖sdfsdfs尿病"],
                selected: 1,
                list2:[0,10,20,30,40,50],
                list3: ["全部", "重点商品"],
                listq:[
                    ['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']
                ]
            }
        },
        methods:{
            getStyle(len){
                var style = {};
                var lenElse = 750 - parseInt((750 - 2 * len) / this.list.length) * this.list.length;
                style.marginLeft = parseInt(lenElse / 2);
                style.marginRight = lenElse - style.marginLeft;
                console.log(style);
                return style;
            },
        },
    }
</script>