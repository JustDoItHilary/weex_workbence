<template>
    <div append="tree">
        <app-header :tit="year+'年'+parseInt(mon+1)+'月周报提交情况'"></app-header>
        <cell-txt-center 
                         :txt="year+'年'+parseInt(mon+1)+'月'"
                         fontColor="#58D68D"
                         class="cell_txt_center"
                         @clickTxtCenter="clickDate">
            <text slot="left"
                  class="div_add"
                  @click="clickLast()">上个月</text>
            <text slot="right"
                  class="div_add"
                  @click="clickNext()">下个月</text>
        </cell-txt-center>
        <text v-if="errorInfo.errorMess" class="txt_loading">{{errorInfo.errorMess}}</text>
        <div class="div_tit" >
            <div class="div_table">
                <text class="txt_name">姓名</text>
            </div>
            <div class="div_content">
            <!--<div class="div_table div_border">-->
                <text class="txt_state div_table div_border border_left">提交次数</text>
            <!--</div>-->
            <!--<div class="div_table div_border">-->
                <text class="txt_state div_table div_border">未交次数</text>
            <!--</div>-->
            <!--<div class="div_table">-->
                <text class="txt_state div_table">迟交次数</text>
            </div>
        </div>
        <scroller class="scroll">
            <div v-for="(item,index) in statistics"
                 class="div_item">
                <div class="div_table div_border" >
                    <text class="txt_name">{{item.name}}  {{item.code}}</text>
                </div>
                <div style="flex-direction: row;flex:1;">
                <!--<div class="div_table div_border">-->
                    <text class="txt_state div_table div_border"> {{item.PostCounts}} </text>
                <!--</div>-->
                <!--<div class="div_table div_border">-->
                    <text class="txt_state div_table div_border"> {{item.unPostCounts}} </text>
                <!--</div>-->
                <!--<div class="div_table">-->
                    <text class="txt_state div_table"> {{item.LaterCounts}} </text>
                <!--</div>-->
                </div>
            </div>
        </scroller>
    </div>
</template>


<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');
    const picker = weex.requireModule('picker');

    export default{
        components: {
            appHeader: require('../../components/header/rep-header.vue'),
            CellTxtCenter: require('../../components/cell-txt-center.vue'),
            CellError: require('../../components/error.vue'),
        },
        computed: {
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            statistics(){
//                console.log(this.$store.getters.getRepStatistics);
                return this.$store.getters.getRepStatistics;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
        },
        data(){
            return {
                year:0,
                mon:0,
            }
        },
        methods: {
            getMonthCounts(){
                let self=this;
                self.$store.commit('SET_ERROR', {showType:2 ,mess: "加载中..."});
                var start=new Date(self.year,self.mon-1,1);
                var end=new Date(self.year,self.mon,1);
                end=new Date(end.getTime()-86400000);
                start=self.formatDate(start, "yyyy-MM-dd");
                end=self.formatDate(end, "yyyy-MM-dd");
                var body ='code='+self.userPlatformCode+ '&startDate=' + start + '&endDate=' + end;
                console.log(body)
                self.$store.dispatcsh('FETCH_GET_WEEKLY_NUM',{body:body});
            },
            clickLast(){
                let self = this;
                self.mon--;
                if(self.mon<0){
                    self.mon=11;
                    self.year--;
                }
                self.getMonthCounts();
            },
            clickNext(){
                let self = this;
                self.mon++;
                if (self.mon>11){
                    self.year++;
                    self.mon=0;
                }
                self.getMonthCounts();
            },
        },

        created(e){
            let self = this;
            var date = new Date();
            self.year=date.getFullYear();
            self.mon=date.getMonth();
//            self.date=self.toDate("2017-12-9");
            self.getMonthCounts();
        }
    }

</script>


<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .div_calendar{
       // padding:$cl;
    }
    .img_calendar{
        @include wh();
        @include marginRow($bl);
        @include marginColumn($cl);
    }
    .div_tit{
        flex-direction: row;
        align-items:center;
        @include sideBorder(top);
        @include sideBorder(right);
        @include sideBorder(left);
        margin-top: $bl;
        @include marginRow();
    }
    .scroll {
        @include marginRow();
        margin-bottom: $bl;
        border-width: $borderW;
    }

    .div_item {
        flex-direction: row;
        justify-content:center;
        align-items:center;
        @include sideBorder(bottom);
    }

    .div_table {
        padding:$cl;
        flex: 1;
    }

    .txt_name {
        lines:1;
        @include fontCommon();
    }
    .div_content{
        flex:1;
        flex-direction: row;
        align-items:center;
        position: relative;
        right:$borderW;//因为
    }
    .txt_state {
        text-align: center;
        @include fontCommon();
    }
    .cell_txt_center {
        margin-top: $bl;
        @include marginRow();
    }

    .div_add {
        @include cornerBtn();
    }
    //针对 姓名 右侧的分割线
    .border_left{
        @include sideBorder(left);
    }
    .div_border{
        @include sideBorder(right);
        background-color: #fff
    }
    .div_right{
        width:$borderW;
        background-color: #000;
    }
    .txt_loading{
        @include fontCommon($cs,$css-grey);
        text-align: center;
        margin-top: $cl;
    }
</style>