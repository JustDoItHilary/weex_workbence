<template>
    <div append="tree">
        <app-header tit="周报提交情况">
            <!--<div slot="right" class="div_calendar" @click="clickTable">-->
                <!--<image class="img_calendar" :src="baseUrl+(isiOS?imgCalendarUrl_ios:imgCalendarUrl)"></image>-->
            <!--</div>-->
        </app-header>
        <cell-txt-center 
                         :txt="startDate+' -- '+endDate"
                         fontColor="#58D68D"
                         class="cell_txt_center"
                         @clickTxtCenter="clickDate">
            <text slot="left"
                  class="div_add"
                  @click="clickLast()">上个周</text>
            <text slot="right"
                  class="div_add"
                  @click="clickNext()">下个周</text>
        </cell-txt-center>
        <text v-if="errorInfo.errorMess" class="txt_loading">{{errorInfo.errorMess}}</text>
        <!--<input class="txt_center input" type="text" placeholder="搜索" @input="input" :value="searchMess"/>-->
        <div class="div_tit" >
            <div class="div_table div_border">
                <text class="txt_name">姓名</text>
            </div>
            <div class="div_table">
                <text class="txt_state">提交情况</text>
            </div>
        </div>
        <scroller class="scroll">
            <div v-for="(item,index) in statistics"
                 class="div_item"
                 :style="{ backgroundColor: bgColor(item) }">
                <div class="div_table div_border" >
                    <text class="txt_name">{{item.name}} {{item.code}}</text>
                </div>
                <div class="div_table">
                    <text class="txt_state">{{getState(item)}}</text>
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
            ratio(){
                return this.$store.getters.ratio;
            },
            statistics(){
//                console.log(this.$store.getters.getRepStatistics);
                return this.$store.getters.getRepStatistics;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
            },
        },
        data(){
            return {
                startDate: '',
                endDate: '',
                date: '',
                imgCalendarUrl: '/drawable/mon_white.png',
                imgCalendarUrl_ios: '/drawable/mon_green.png',
                isiOS:false,
            }
        },
        methods: {
            getState(item){
                if (item.IsPost == 1) {
                    if (item.days > 0) {
                        return "已迟交" + item.days + "天"
                    } else {
                        return '已提交 '
                    }
                } else {
                    return "未提交"
                }
            },
            bgColor(item){
                if (item.IsPost == 1 || item.type == 0) {
                    if (item.days > 0) {
                        return '#F59905';
                    } else {
                        return '#FFF'
                    }
                } else {
                    return '#f00'
                }
            },
            clickTable(){
                let self=this;
                self.$router.push(`/repMonStatistics`);
            },
            clickLast(){
                let self = this;
//                self.date = new Date(self.date - 86400000 * 7);
                self.getWeekDate(-7);
                self.getList();
            },
            clickNext(){
                let self = this;
//                self.date = new Date(self.date.getTime() + 86400000 * 7);
                self.getWeekDate(7);
                self.getList();
            },
            clickDate(date){
                let self = this;
                var max = new Date();
                var min = new Date((new Date()).getTime() - 100000 * 86400000);
                max = self.formatDate(max, "yyyy-MM-dd");
                min = self.formatDate(min, "yyyy-MM-dd");
                picker.pickDate({
                    value: self.startDate, max: max, min: min
                }, function (ret) {
                    if (ret.result == 'success') {
                        self.date = new Date(Date.parse(ret.data.replace(/-/g, '/')));
                        self.getWeekDate(0);
                        self.getList();
                    }
                });
            },
            getWeekDate(days){
                let self = this;
                self.date = new Date(self.date.getTime() + 86400000 * days);
                var todayOfWeek = (new Date(self.date.getTime() - 86400000)).getDay();
//                console.log(todayOfWeek)
                var year = self.date.getFullYear();
                var month = self.date.getMonth();
                self.startDate = new Date(year, month, self.date.getDate() - todayOfWeek);
                self.endDate = new Date(year, month, self.date.getDate() - todayOfWeek + 6);
                self.startDate = self.formatDate(self.startDate, 'yyyy-MM-dd');
                self.endDate = self.formatDate(self.endDate, 'yyyy-MM-dd');
            },
            getList(){
                let self = this;
                self.$store.commit('SET_ERROR', {showType:2 ,mess: "加载中..."});
                var body = 'startDate=' + self.startDate + '&endDate=' + self.endDate;
//                console.log(body)
                self.$store.dispatch('FETCH_REP_GET_STATISTICS', {body: body});
            },
        },

        created(e){
            let self = this;
            self.isiOS=weex.config.env.platform.toLowerCase() == 'ios';
            self.date = new Date();
//            self.date=self.toDate("2017-12-9");
            var todayOfWeek = (new Date(self.date.getTime() - 86400000)).getDay();
            if(todayOfWeek>4){
                self.getWeekDate(0);
            }else{
                self.getWeekDate(-7);
            }
//            console.log(todayOfWeek)
            self.getList();
        }
    }

</script>


<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .div_calendar{
        padding:$cl;
    }
    .img_calendar{
        @include wh();
        @include marginRow($bl);
        @include marginColumn($cl);
    }
    .div_tit{
        flex-direction: row;
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
        @include sideBorder(bottom);
    }

    .div_table {
        @include marginColumn(0);
        padding:$cl;
        flex: 1;
    }

    .txt_name {
        @include fontCommon();
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
    .div_border{
        @include sideBorder(right);
        background-color: #fff
    }
    .txt_loading{
        @include fontCommon($cs,$css-grey);
        text-align: center;
        margin-top: $cl;
    }
</style>