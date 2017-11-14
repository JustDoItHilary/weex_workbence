<template>
    <div>
        <text class="txt_test">会员卡号</text>
        <text class="txt_test">会员姓名</text>
        <text class="txt_test">会员编号</text>
        <text style="padding:20px;border-width: 2px;border-radius: 10px;text-align: center;margin-left: 100px;margin-right: 100px;" @click="clickBack">back</text>
        <!--<div class="div_tab">-->
            <!--<div v-for="(tab,tabIndex) in tabs"-->
                 <!--:class="['div_tab_item',tab.visiable?'border_selected':'border_selected_false']"-->
                 <!--@click="clickTab(tab)">-->
                <!--<text :class="[tab.visiable?'color_selected':'','txt_tit']">{{tab.tit}}</text>-->
            <!--</div>-->
        <!--</div>-->
        <cell-tab class="cell_tab" :tabs="tabs" fontSize="36" showBorderBottom="1>0"></cell-tab>
        <div class="div_par">
            <member-info v-if="showItem('/memberInfo')"></member-info>
            <phone-info v-if="showItem('/phoneInfo')"></phone-info>
            <shop-info v-if="showItem('/shopInfo')"></shop-info>
        </div>
    </div>
</template>

<script>
    import CellTab from '../../../components/footer/cell-tab.vue'
    import MemberInfo from './sy-member.vue'
    import PhoneInfo from './sy-phone-info.vue'
    import ShopInfo from './sy-shop-info.vue'


    export default {
        components: {
             CellTab,MemberInfo,PhoneInfo,ShopInfo
        },
        computed: {
            tabs(){
                return this.$store.getters.getTab
            }
        },
        data(){
            return {
                tabItems: [
                    {
                        tit: "会员详细信息",
                        selected: true
                    },
                    {
                        tit: "消费记录",
                        selected: false
                    },
                    {
                        tit: "回访记录",
                        selected: false
                    },
                ],
            }
        },
        methods: {
            showItem(name){
                for(let i=0;i<this.tabs.length;i++){
                    let item=this.tabs[i];
                    if (item.src == name && item.visiable) {
//                        console.log(name)
                        return true;
                    }
                }
                return false;
            },
            clickTab(tab){
                let self=this;
                for(var i=0;i<self.tabs.length;i++){
                    self.tabs[i].visiable=false;
                }
                tab.visiable=true;
            },
            clickBack(){
                this.$router.back();
            },
        },
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../../style/mixin";

    .div_par{
        flex:1;
    }
    .cell_tab{
        @include paddingColumn(8px);
        margin-top: 20px;
    }
    .div_tab {
        flex-direction: row;
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
    .txt_tit{
        font-size: 36px;
        text-align: center;
        padding-top: 10px;
        @include marginColumn(10px);
    }
    .txt_test{
        @include fontCommon(32px,#000);
        padding:16px;
        border-bottom-width: 1px;
        border-color: $bc;
    }

</style>