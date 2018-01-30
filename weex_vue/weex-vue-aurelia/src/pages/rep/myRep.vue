<template>
    <div style="position:relative;flex:1;">
        <cell-error v-if="errorInfo.errorMess" :errorMess="errorInfo.errorMess"></cell-error>
        <list class="list">
            <!--我的汇报-->
            <cell class="cell" v-for="(item,index) in repList" @click="clickItem(index)"
                  @longpress="longPressItem(item)">
                <div class="div_item">
                    <div class="div_item_top">
                        <date-logo :type="item.IsPost==0"
                                   :month="item.month"
                                   :year="item.year"></date-logo>
                        <div class="flex_left">
                            <text class="text_tit">{{item.startTime}} -- {{item.endTime}}</text>
                            <text :class="['text_tit', 'select_'+item.IsPost ]">{{item.checked}}</text>
                        </div>
                    </div>
                    <text class="text_mulit">下周工作计划:</text>
                    <text class="text_tit txt_border">{{item.myPlan}}</text>
                    <image v-if="item.AuditFlag==1" class="img_logo" :src="baseUrl+imgLogoUrl"></image>
                </div>
            </cell>
        </list>
        <div class="div_add">
            <image class="img_add" :src="baseUrl+imgAddUrl" @click="clickLeft"></image>
        </div>
    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');

    export default{
        components: {
            DateLogo: require('../../components/cell-date-logo.vue'),
            CellError: require('../../components/error.vue'),
            CellTxtCenter: require('../../components/cell-txt-center.vue'),
        },
        data(){
            return {
                typeName: '',
                itemGuid: '',
                token: '',
                searchMess: '',
                selectedList: [],
                imgLogoUrl: '/drawable/review.png',
                imgAddUrl: '/drawable/ic_add_white_48dp.png',
                imgShowUp: '/drawable/arrow_up.png',
                imgShowDown: '/drawable/arrow_down.png',
                imgCalendarUrl: '/drawable/calendar_white.png',
                imgCalendarUrl_ios: '/drawable/calendar_green.png',
                date: '',
                month: 0,
                year: 0,
                isShowTime: false,
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
        },
        methods: {
            clickLeft(){
                let self = this;
                var date = new Date();
                //因为 getDay() 获取一周中的第几天，是从周日开始，所以我们获取当前是一周中的第几天时向前推一天
                var todayOfWeek = (new Date(date - 86400000)).getDay();
                //本周的开始日期
                var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - todayOfWeek);
                startDate = self.formatDate(startDate, 'yyyy-MM-dd');
                let lastDetails = self.repList[0];
                if (lastDetails && lastDetails.hasOwnProperty("Auditors")) {
                    self.$store.commit('GET_READER', {auditors: lastDetails.Auditors});
                } else {
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
                self.$router.push(`/newRep/${JSON.stringify({index: 0})}`)
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
                self.toConfirm('确定删除?', function () {
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
            setDate(){
                let self = this;
                self.date = new Date();
                self.year = self.date.getFullYear();
                self.month = self.date.getMonth();
                var todayOfWeek = (new Date(self.date.getTime() - 86400000)).getDay();
                var start = new Date(self.year, self.month, self.date.getDate() - todayOfWeek);
                var end = new Date(start.getTime() + 86400000 * 6);
                self.mon = self.formatDate(start, 'yyyy-MM-dd');
                self.sun = self.formatDate(end, 'yyyy-MM-dd');
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

    .list {
        @include marginRow($bl);
        margin-bottom: $cl;
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
        background-color: $css-grey;
    }

    .select_bg_false {
        background-color: $colorCommon;
    }

    .img_logo {
        position: absolute;
        right: $ss;
        bottom: $ss;
        @include wh($hh, $hh);
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

    .txt_border {
        margin-bottom: $cl;
    }

    .div_add {
        position: absolute;
        bottom: 4*$bl;
        right: 2*$bl;
        border-radius: 100px;
        background-color: $colorCommon;
        padding:$sl;
    }

    .img_add {
        @include wh($bh, $bh);
    }

</style>
