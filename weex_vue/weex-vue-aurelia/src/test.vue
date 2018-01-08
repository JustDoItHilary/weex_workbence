<template>
    <scroller>
        <div>
            <text class="txt">我来自偶然，像一颗尘土，有谁看出我的脆弱，我来自何方，我情归何处。。。</text>
            <text class="txt_px">我来自偶然，像一颗尘土，有谁看出我的脆弱，我来自何方，我情归何处。。。</text>
            <text class="txt_wx">我来自偶然，像一颗尘土，有谁看出我的脆弱，我来自何方，我情归何处。。。</text>

            <div style="flex-direction: row;width:750px;">
            <div style="flex-direction: row;flex:1;" class="root">
                <div style="border-width: 1px;flex:1;">
                    <text>j我来自偶然，像一颗尘土，有谁看出我的脆弱，我来自何方，我情归何处。。。sldfkjsl</text>
                </div>
                <text  style="border-width: 1px;flex:1;">lsjdflskjfl</text>

                <div  style="border-width: 1px;flex:1;" class="item">
                    <text style="flex:1;">j我来自偶然lsjdflskjfl</text>
                </div>
            </div>
            <div style="border-width: 1px;top:0;bottom:0;"></div>
            </div>
            <!--<div  style="border-width: 1px;flex:1;position:fixed;">-->
                <!--<text style="flex:1;">j我来自偶然lsjdflskjfl</text>-->
            <!--</div>-->

            <!--<div style="margin-top: 20px;">-->
                <!--<div style="border-width: 1px;margin-top: 20;flex-direction: row;">-->
                    <!--<div v-for="dic in list" style="flex:1;border-width: 1px;" class="root">-->
                        <!--<div style="flex:1;border-width: 0px;" class="txt_item">-->
                            <!--<text style="flex:1;font-size: 30;">{{dic}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div style="background-color: rgb(235,235,235);height:1;"></div>-->
            <!--</div>-->
        </div>
    </scroller>
</template>

<script>
    export default  {
        data(){
            return {
                list:["冷冷清清 凄凄惨惨戚戚 三杯两盏淡酒 怎及她晚来风急",2,3]
            }
        },
    }
</script>

<style>
    .root{
        position: relative;
    }
    .item{
        top:0;
        bottom:0;
    }
    .txt_item{
        position: fixed;
        right:0px;
        bottom:0;
        top:0;

    }
    .txt{
        padding:20px;
        font-size: 24;
    }
    .txt_px{
        padding:20px;
        font-size: 24px;
    }
    .txt_wx{
        padding:20px;
        font-size: 24wx;
    }
    .txt_rem{
        padding:20px;
        font-size: 24rem;
    }
    .input{
        border-bottom-width:2px;
        border-color: red;
    }
</style>