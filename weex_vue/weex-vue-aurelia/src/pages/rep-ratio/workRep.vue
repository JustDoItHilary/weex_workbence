<template>
    <div style="background-color:#ebedef;" append="node">
        <app-header tit="工作汇报"  :close="clickClose" >
            <div slot="right" class="div_calendar" @click="clickCalendar">
                <image class="img_calendar" :src="baseUrl+(isiOS?imgCalendarUrl_ios:imgCalendarUrl)"></image>
            </div>
        </app-header>
        <label labelOneTxt="我的汇报"
               labelTwoTxt="团队汇报"
               :twoInfo="lastWeekReviewNum==0?'':lastWeekReviewNum"
               :selected="isSelected"
               :labelOne="clickLabelOne"
               :labelTwo="clickLabelTwo"
        ></label>
        <div v-if="isSelected"></div>
        <div v-if="isSelected==false">
            <input  class="txt_center input" type="text" placeholder="搜索" @input="input" :value="searchMess"/>
        </div>
        <!--<cell-error v-if="repList.length<1" :errorImg="errorInfo.errorImg"-->
                    <!--:errorMess="errorInfo.errorMess"></cell-error>-->
        <list  class="list">
            <!--<refresh>-->
                <!--<text class="t">加载中...</text>-->
            <!--</refresh>-->
            <!--我的汇报-->
            <cell v-if="isSelected"  class="cell" v-for="(item,index) in repList" @click="clickItem(index)"
                  @longpress="longPressItem(item)">
                <div  class="div_item">
                    <div  class="div_item_top">
                        <date-logo :type="item.IsPost==0"
                                   :month="item.month"
                                   :year="item.year"></date-logo>
                        <div  class="flex_left">
                            <text  class="text_tit">{{item.startTime}} -- {{item.endTime}}</text>
                            <text  :class="['text_tit', 'select_'+item.IsPost ]">{{item.checked}}</text>
                        </div>
                    </div>
                    <text  class="text_mulit">下周工作计划:</text>
                    <text  class="text_tit txt_border">{{item.myPlan}}</text>
                    <image v-if="item.AuditFlag==1"  class="img_logo" :src="baseUrl+imgLogoUrl"></image>
                </div>
            </cell>
            <!--团队汇报-->
            <cell v-if="!isSelected"

                  class="cell_member"
                  v-for="(item,index) in reviewList"
                  @click="clickReview(item)">
                <div  class="div_member">
                    <text  class="text_member">{{item.Name}}</text>
                </div>
                <text  :class="['div_logo','select_bg_'+item.isAudited]">{{item.isAudited?'全部审核':'有未审核'}}</text>
            </cell>
        </list>
        <bottom-btn v-if="isSelected"
                    class="cell_bottom_btn"
                    txtLeft="新建"
                    txtRight="提交统计"
                    :left="clickLeft"
                    :right="clickRight"
        ></bottom-btn>
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
//            CellError: require('../../components/error.vue'),
        },
        data(){
            return {
                typeName: '',
                itemGuid: '',
                token: '',
                searchMess: '',
                selectedList: [],
                imgLogoUrl: '/drawable/review.png',
                imgCalendarUrl: '/drawable/calendar_white.png',
                imgCalendarUrl_ios: '/drawable/calendar_green.png',
                baseUrl: '',
                date: '',
                month: '',
                year: '',
                ratio:1,
                isiOS:false,
            }
        },
        computed: {
//            errorInfo(){
//                return this.$store.getters.errorInfo;
//            },
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
        },
        methods: {
            clickClose(){
                configModule.finish();
            },
            clickCalendar(){
                let self=this;
                self.$router.push('/repHistory');
            },
            clickLabelOne: function (e) {
                let self = this;
                if (!self.isSelected) {
                    self.$store.commit('SET_REP_FIRST_SELECTED', {selected: true});
                    self.getMyRep();
                }
            },
            clickLabelTwo: function (e) {
                let self = this;
                if (self.isSelected) {
                    self.$store.commit('SET_REP_FIRST_SELECTED', {selected: false});
                    self.getTeamRep();
                }
            },
            clickRight(){
                let self = this;
                self.$router.push('/repStatistics');
            },
            clickLeft(){
                let self = this;
                var date = new Date();
                //因为 getDay() 获取一周中的第几天，是从周日开始，所以我们获取当前是一周中的第几天时向前推一天
                var todayOfWeek = (new Date(date - 86400000)).getDay();
                //本周的开始日期
                var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - todayOfWeek);
                startDate = self.formatDate(startDate, 'yyyy-MM-dd');
                let lastDetails = self.repList[0];
                if (lastDetails.hasOwnProperty("Auditors")) {
                    self.$store.commit('GET_READER', {auditors: lastDetails.Auditors});
                }else{
                    self.$store.commit('GET_READER', {auditors: ''});
                }
                self.$store.commit('SET_REP_DETAILS', {item: {}});
                for (let i = 0; i < self.repList.length; i++) {
                    let details = self.repList[i];
                    if (details.startTime == startDate) {
                        self.$store.commit('SET_REP_DETAILS', {item: details});
                        break;
                    }
                }
                self.$router.push(`/newRep/${JSON.stringify({index:0})}`)
            },
            clickItem(index){
                let self = this;
                self.$store.commit('SET_REP_DETAILS', {item: self.$store.getters.getRepList[index]});
                var details = self.$store.getters.getRepDetails;
                if (details.hasOwnProperty("Auditors")) {
                    self.$store.commit('GET_READER', {auditors: details.Auditors});
                }
                self.$router.push(`/repDetails`)
            },
            longPressItem(item){
                let self = this;
                self.toConfirm('确定删除?',function () {
                    if (item.IsPost == 1) {
                        self.toToast('已经提交不可删除！')
                    } else {
                        self.deleteRep(item.Guid);
                    }
                })
            },
            //删除已经保存但未提交的周报
            deleteRep(guid){
                let self = this;
                var body = 'code=' + self.$store.getters.getUserPlatformCode + '&isWeek=1&guid=' + guid + '&cros=&version=1';
                self.$store.dispatch('FETCH_REP_DELETE', {
                    body: body, callback: function (retdata) {
                        if (retdata == true) {
                            self.getMyRep();
                        } else {
                            self.toToast('删除操作：' + retdata)
                        }
                    }
                });
            },
            clickReview(item){
                let self = this;
                let params = {};
                params.Name = item.Name;
                params.Guid = item.Guid;
                self.$router.push(`/repTime/${JSON.stringify(params)}`);
                self.$store.commit('SET_REP_LIST', {retdata:[], callback:function () {

                }});
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
            //获取上周未审核周报数目
            getLastWeekReviewNum(){
                let self = this;
                var todayOfWeek = (new Date(self.date - 86400000)).getDay();
                var nowdate = new Date(self.year, self.month, self.date.getDate() - todayOfWeek + 6);
                nowdate = self.formatDate(nowdate, 'yyyy-MM-dd');
                let body = 'code=' + self.userPlatformCode + '&nowdate=' + nowdate;
//                console.log(body)
                self.$store.dispatch('FETCH_REP_GET_LAST_NFNUM', {body: body});
            },
            //获取团队汇报（待审核信息）
            getTeamRep(){
                let self = this;
                //因为 getDay() 获取一周中的第几天，是从周日开始，所以我们获取当前是一周中的第几天时向前推一天
                var todayOfWeek = (new Date(self.date - 86400000)).getDay();
                var startDate = new Date(self.year, self.month, self.date.getDate() - todayOfWeek);
                //本周的结束日期
                var endDate = new Date(self.year, self.month, self.date.getDate() - todayOfWeek + 6);
                startDate = self.formatDate(startDate, 'yyyy-MM-dd');
                endDate = self.formatDate(endDate, 'yyyy-MM-dd');
                var body = 'code=' + self.userPlatformCode + '&startDate=' + startDate + '&endDate=' + endDate + '&type=1';
//                console.log('REPCALLBACK: ', body);
                self.$store.dispatch('FETCH_REP_GET_ALL_AUDITED', {body: body});
            },
            //获取周报信息
            getMyRep: function () {
                var self = this;
                var startDate = '2016-12-01';
                //因为 getDay() 获取一周中的第几天，是从周日开始，所以我们获取当前是一周中的第几天时向前推一天
                var todayOfWeek = (new Date(self.date - 86400000)).getDay();
                //本周的结束日期
                var endDate = new Date(self.year, self.month, self.date.getDate() + 6 - todayOfWeek);
                endDate = self.formatDate(endDate, 'yyyy-MM-dd');
                var body = 'code=' + self.userPlatformCode +
                    '&startDate=' + startDate + '&endDate=' + endDate + '&type=1&cros=';
//                console.log(body)
                self.$store.dispatch('FETCH_REP_LIST', {
                    body: body, callback: function () {

                    }
                });
            },
            getData(){
                let self = this;
//                self.token = '@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--';
                configModule.getUrl('', function (ret) {
                    self.token = ret.split('=')[1];
                    self.$store.commit('SET_TOKEN', {token: self.token});
                    //获取大平台账号
                    self.$store.dispatch('FETCH_USERPLATEFORMCODE',
                        {
                            params: {},
                            callback: function () {
                                self.getMyRep();
                                self.getLastWeekReviewNum();
                            }
                        });
                });
            },
            setDate(){
                let self = this;
                self.date = new Date();
                self.year = self.date.getFullYear();
                self.month = self.date.getMonth();
            },
            setRatio(){
                let self=this;
                var envConfig=self.$getConfig().env;
                var width=envConfig.hasOwnProperty('deviceWidth')?envConfig.deviceWidth:0;
                var scale=envConfig.hasOwnProperty('scale')?envConfig.scale:2;
                self.ratio=750 / ( width / scale );
                self.$store.commit('SET_RATIO',{ratio:self.ratio});
            },
        }
        ,
        created: function (e) {
            let self = this;
//            self.setRatio();
            self.isiOS=weex.config.env.platform.toLowerCase() == 'ios';
            var bundleUrl = self.$getConfig().bundleUrl || '';
//            var bundleUrl = 'http://weex.yy365.cn/sy-member.js?';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/applyType.js';
            self.baseUrl = bundleUrl.split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
            self.setDate();
            self.getData();
//            self.getMyRep();
//            self.getLastWeekReviewNum();
        }
        ,
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                if (from.name == null) {
                    global.addEventListener("interceptBackEvent", function (result) {
//                    modal.alert({message:'GLOBAL',duration:1});
                        if (vm.$route.name == "home") {
//                            modal.alert({message: "finish-applyType", duration: 1});
                            configModule.finish();
                        } else {
//                            modal.alert({message: "back-applyType", duration: 1});
                            vm.back();
                        }
                    });
                }
            });
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .div_calendar{
        padding:$cl;
    }
    .img_calendar{
        @include wh();
        @include marginRow($bl);
        @include marginColumn($cl);
    }
    .list {
        @include marginRow($bl);
    }

    .div_item {
        background-color: #ffffff;
        @include borderRadius;
    }

    .div_item_top {
        @include paddingColumn;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .select_true {
        color: $colorCommon;
    }

    .select_false {
        color: $css-grey;
    }

    .select_bg_true {
        background-color:$css-grey;
    }

    .select_bg_false {
        background-color: $colorCommon;
    }

    .img_logo {
        position: absolute;
        right: $ss;
        bottom: $ss;
        @include wh($hs,$hs);
    }

    .flex_left {
        margin-left: $ss;
        flex: 1;
        align-items: flex-start;
        justify-content: center;
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
        @include paddingColumn($cl);
        @include paddingRow($sl);
    }

    .div_search {
        flex-direction: row;
    }

    .input {
        height: 64px;
        background-color: #fff;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
        @include marginColumn();
        @include marginRow($bs);
    }

    .cell_member {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #bbbbbb;
    }

    .txt_center {
        height: $ls;
        text-align: center;
        font-weight: bold;;
        font-size: $cs;
    }

    .div_logo {
        padding: $sl;
        border-radius: 100px;
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
    .txt_border{
        margin-bottom: $cl;
    }
</style>
