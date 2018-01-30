<template>
    <div style="position: relative;flex:1;">

        <input class="txt_center input" type="text" placeholder="搜索" @input="input"
               :value="searchMess"/>

        <cell-error v-if="errorInfo.errorMess" :errorMess="errorInfo.errorMess"></cell-error>

        <list class="list">
            <!--团队汇报-->
            <cell
                    class="cell_member"
                    v-for="(item,index) in reviewList"
                    @click="clickReview(item)">
                <div class="div_member">
                    <text class="text_member">{{item.Name}}</text>
                </div>
                <text :class="['div_logo','select_bg_'+item.isAudited]">{{item.isAudited?'全部审核':'有未审核'}}</text>
            </cell>
        </list>

        <div v-if="isShowTime"
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
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');
    const global = weex.requireModule('globalEvent');

    export default{
        components: {
            appHeader: require('../../components/header/rep-header.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            Label: require('../../components/label.vue'),
            DateLogo: require('../../components/cell-date-logo.vue'),
            CellError: require('../../components/error.vue'),
            CellTxtCenter: require('../../components/cell-txt-center.vue'),
            RepView: require('./views/repView.vue'),
        },
        props: {
            isShowTime: {}
        },
        data(){
            return {
                typeName: '',
                itemGuid: '',
                token: '',
                searchMess: '',
                selectedList: [],
                imgShowUp: '/drawable/arrow_up.png',
                imgShowDown: '/drawable/arrow_down.png',
                date: '',
                month: 0,
                year: 0,
                isiOS: false,
                mon: '',
                sun: '',
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
            lastWeekReviewNum(){/*上周未审核的周报数目*/
                return this.$store.getters.getLastNFNum
            },
            isSelected(){/*当前显示的是否为"我的汇报"页面*/
                return this.$store.getters.getSelected
            },
            timeList(){
                let self = this;
                var list = [];
                var firstDate = new Date(self.year, self.month, 1);
                var next = new Date(self.year, self.month + 1, 1);
                var endDate = new Date(next - 86400000);
                var todayOfWeek = (new Date(firstDate.getTime() - 86400000)).getDay();
                var year = firstDate.getFullYear();
                var month = firstDate.getMonth();
                var startDate = new Date(year, month, firstDate.getDate() - todayOfWeek);
                for (var i = startDate; i.getTime() <= endDate.getTime() + 86400000; i = new Date(i.getTime() + 86400000 * 7)) {
                    var item = {};
                    item.startDate = self.formatDate(i, 'yyyy-MM-dd');
                    var weekEnd = new Date(i.getTime() + 86400000 * 6)
                    item.endDate = self.formatDate(weekEnd, 'yyyy-MM-dd');
                    if (item.startDate == self.mon) {
                        item.actived = true;
                    } else {
                        item.actived = false;
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
                if (self.month > 0) {
                    self.month = self.month - 1;
                } else {
                    self.year = self.year - 1;
                    self.month = 11;
                }
            },
            clickNext(){
                let self = this;
                if (self.month < 11) {
                    self.month = self.month + 1;
                } else {
                    self.year = self.year + 1;
                    self.month = 0;
                }
            },
            clickTimeItem(item){
                let self = this;
                self.mon = item.startDate;
                self.sun = item.endDate;
                self.$emit('clickTeamTime',self.mon,self.sun);
            },
            clickReview(item){
                let self = this;
                let params = {};
                params.Name = item.Name;
                params.Guid = item.Guid;
                self.$router.push(`/repTime/${JSON.stringify(params)}`);
                self.$store.commit('SET_REP_LIST', {
                    retdata: [], callback: function () {

                    }
                });
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
                var todayOfWeek = (new Date(self.date.getTime() - 86400000)).getDay();
                var start = new Date(self.year, self.month, self.date.getDate() - todayOfWeek);
                var end = new Date(start.getTime()+86400000*6);
                self.mon=self.formatDate(start,'yyyy-MM-dd');
                self.sun=self.formatDate(end,'yyyy-MM-dd');
            },
        },
        created: function (e) {
            let self = this;
            self.setDate();
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .select_true {
        color: $colorCommon;
    }

    .select_false {
        color: $css-grey;
    }

    .select_bg_true {
        background-color: $css-grey;
    }

    .select_bg_false {
        background-color: $colorCommon;
    }

    .list {
        @include marginRow($bl);
        margin-bottom: $cl;
    }

    .cell {
        padding-top: $cl;
    }

    .text_tit {
        @include fontCommon;
        @include marginRow($ss);
        margin-top: $sl;
        @include fontLines;
    }

    .text_mulit {
        @include fontLines;
        @include marginRow($ss);
        @include fontCommon($ss);
    }

    .cell_bottom_btn {
        @include paddingColumn($clw);
        @include paddingRow($bl);
    }

    .input {
        @include searchBox();
        @include marginColumn();
        @include marginRow($bl);
    }

    .cell_member {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom-width: $borderW;
        border-color: #bbbbbb;
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

    .text_member {
        font-size: $bs;
        margin-left: $cl;
        margin-top: $bs;
        margin-bottom: $cl;
    }

    .div_member {
        flex: 1;
        flex-direction: row;
        margin-left: $ss;
        align-items: center;
    }

    .txt_border {
        margin-bottom: $cl;
    }

    .div_week {
        margin-top: 1px;
        padding-top: $cl;
        padding-bottom: $cl;
        flex-direction: row;
        background-color: $fc;
        justify-content: center;
        align-items: center;
    }

    .cornerBtn {
        @include cornerBtn();
        @include marginRow($bl);
    }

    .text_time {
        @include marginColumn($slw);
        @include fontCommon;
        @include marginRow($ss);
        @include fontLines;
    }

    .img_open {
        @include wh($blw, $blw);
    }

    .div_time {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        align-items: center;
        flex: 1;
        background-color: $fc;
    }

    .cell_border {
        @include sideBorder(bottom, $bc);
        align-items: center;
        background-color: $fc;
        @include paddingColumn($cl);
        @include paddingRow($bl);
    }

    .div_else {
        flex: 1;
        background-color: #000;
        opacity: .4;
    }

    .cell_txt_center {
        @include fontCommon();
        text-align: center;
        padding-bottom: $clw;
        padding-top: $blw;
        background-color: $fc;
    }

</style>
