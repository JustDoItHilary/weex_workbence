<template>
    <div style="position: relative;flex:1;">

        <div v-if="isSelected" style="height: 1px;"></div>
        <input v-if="!isSelected"  class="txt_center input" type="text" placeholder="搜索" @input="input" :value="searchMess"/>

        <cell-error v-if="errorInfo.errorMess" :errorMess="errorInfo.errorMess"></cell-error>

        <list  class="list">
            <cell v-if="isSelected" v-for="(item,index) in repList">
                <!--我的汇报-->
                <my-rep :item="item" :index="index"></my-rep>
            </cell>
            <cell v-if="!isSelected" v-for="(item,index) in reviewList">
                <!--团队汇报-->
                <team-rep :item=item :index="index"></team-rep>
            </cell>
        </list>

        <div v-if="(!isSelected)&&isShowTime"
             class="div_time">
            <cell-txt-center
                    :txt="year+'年'+(month+1)+'月'"
                    fontColor="#aaa"
                    class="cell_txt_center">
                <text slot="left"
                      class="cornerBtn"
                      @click="clickLast()"> 上个月 </text>
                <text slot="right"
                      class="cornerBtn"
                      @click="clickNext()"> 下个月 </text>
            </cell-txt-center>
            <div class="cell_border"
                 v-for="(item,index) in timeList"
                 @click="clickTimeItem(item)">
                <text :class="['text_tit',item.actived?'select_true':'']">{{item.startDate+' ~ '+item.endDate}}</text>
            </div>
        </div>

    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');

    export default{
        components: {
            DateLogo: require('../../../components/cell-date-logo.vue'),
            CellError: require('../../../components/error.vue'),
            CellTxtCenter: require('../../../components/cell-txt-center.vue'),
            RepView: require('../views/repMy.vue'),
            MyRep: require('../views/myRep.vue'),
            TeamRep: require('../views/teamRep.vue'),
        },
        props:{
            isShowTime:{},
        },
        data(){
            return {
                searchMess: '',
                selectedList: [],
                imgLogoUrl: '/drawable/review.png',
                imgAddUrl: '/drawable/ic_add_white_48dp.png',
                imgShowUp: '/drawable/arrow_up.png',
                imgShowDown: '/drawable/arrow_down.png',
                baseUrl: '',
                date: '',
                month: 0,
                year: 0,
            }
        },
        computed: {
            baseUrl(){
//                console.log(this.$store.getters.baseUrl);
                return this.$store.getters.baseUrl;
            },
            errorInfo(){
//                console.log(this.$store.getters.errorInfo)
                return this.$store.getters.errorInfo;
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            repList(){/*我的周报*/
//                console.log("repList",this.$store.getters.getRepList[0])
                return this.$store.getters.getRepList
            },
            reviewList(){/*所有可审核的人员名单*/
//                console.log("reviewList",this.$store.getters.getReviewList)
                if (this.searchMess) {
                    return this.searchMemberList(this.$store.getters.getReviewList)
                }
                return this.$store.getters.getReviewList
            },
            isSelected(){/*当前显示的是否为"我的汇报"页面*/
                return this.$store.getters.getSelected
            },
            timeList(){
                let self = this;
                var list = [];
                var today = (new Date(self.date.getTime() - 86400000)).getDay();
                var start = new Date(self.year, self.month, self.date.getDate() - today);
                var mon=self.formatDate(start,'yyyy-MM-dd');
                var firstDate = new Date(self.year, self.month, 1);
                var next = new Date(self.year, self.month+1, 1);
                var endDate = new Date(next - 86400000);
                var todayOfWeek = (new Date(firstDate.getTime() - 86400000)).getDay();
                var year = firstDate.getFullYear();
                var month =firstDate.getMonth();
                var startDate = new Date(year, month, firstDate.getDate() - todayOfWeek);
                for (var i = startDate; i.getTime() <= endDate.getTime()+ 86400000; i = new Date(i.getTime() + 86400000 * 7)) {
                    var item={};
                    item.startDate=self.formatDate(i,'yyyy-MM-dd');
                    var weekEnd=new Date(i.getTime()+86400000 * 6);
                    item.endDate=self.formatDate(weekEnd,'yyyy-MM-dd');
                    if(item.startDate==mon){
                        item.actived=true;
                    }else {
                        item.actived=false;
                    }
                    list.push(item);
                }
//                console.log("list: ",list)
                return list;
            },
        },
        methods: {
            clickLast(){
                let self = this;
                if(self.month>0){
                    self.month=self.month-1;
                }else{
                    self.year=self.year-1;
                    self.month=11;
                }
            },
            clickNext(){
                let self = this;
                if(self.month<11){
                    self.month=self.month+1;
                }else{
                    self.year=self.year+1;
                    self.month=0;
                }
            },
            clickTimeItem(item){
                let self=this;
                console.log("click")
                self.mon=item.startDate;
                self.sun=item.endDate;
                self.$emit('clickTeamTime',self.mon,self.sun);
            },
            /*tui*/
            input: function (e) {
                let self = this;
                self.searchMess = e.value;
            },
            searchMemberList(list){
                let self = this;
//                console.log(self.searchMess)
                let readerList = [];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].Name.indexOf(self.searchMess) > -1) {
                        readerList.push(list[i])
                    }
                }
                return readerList;
            },
            setDate(){
                let self = this;
                self.date = new Date();
                self.year = self.date.getFullYear();
                self.month = self.date.getMonth();
            },
        },
        created: function (e) {
            let self = this;
            self.setDate();
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../../style/mixin";

    .list {
        @include marginRow($bl);
    }

    .select_true {
        color: $colorCommon;
    }

    .select_false {
        color: $css-grey;
    }
    .text_tit {
        @include fontCommon;
        @include marginRow($ss);
        margin-top: $sl;
        @include fontLines;
    }

    .input {
        @include searchBox();
        @include marginColumn();
        @include marginRow($bl);
    }

    .txt_center {
        height: $lh;
        text-align: center;
        font-weight: bold;;
        font-size: $cs;
    }

    .div_logo {
        padding: $sl;
        border-radius: $bRadius;
        text-align: center;
        @include fontCommon($ss, #fff);
    }
    .div_add{
        position: absolute;
        bottom:4*$bl;
        right:2*$bl;
        border-radius: 100px;
        background-color: $colorCommon;
        //padding:$slw;
        //box-shadow: 6px 6px 4px $css-grey;
    }
    .img_add{
        position: absolute;
        bottom:4*$bl;
        right:2*$bl;
        border-radius: 100px;
        background-color: $colorCommon;
        @include wh($bh,$bh);
    }
    .cornerBtn {
        @include cornerBtn();
        @include marginRow($bl);
    }
    .div_time{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        align-items: center;
        flex:1;
        background-color: $fc;
        margin-top: $borderW;
    }
    .cell_border {
        @include sideBorder(bottom, $bc);
        align-items: center;
        background-color: $fc;
        @include paddingColumn($sl);
    }
    .div_label{
        @include paddingColumn($sl);
    }
    .cell_txt_center {
        @include fontCommon();
        text-align: center;
        padding-bottom: $clw;
        padding-top: $blw;
        background-color: $fc;
    }
</style>
