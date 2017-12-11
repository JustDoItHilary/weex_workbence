<template>
    <div style="background-color:#ebedef;" append="node">
        <app-header tit="工作汇报"></app-header>
        <scroller>
            <cell-peo 
                    class="div_item"
                    txtTit="周报日期"
                    bottomBorder="1"
                    :txtExplain="startDate+' - '+endDate"
            >
                <div 
                     slot="option"
                     style="flex-direction: row;flex:1;justify-content: flex-end;">
                    <div 
                         :class="['option_selected_'+!isEdited]"
                         @click="clickDate(false)">
                        <text 
                              class="txt_add">上周</text>
                    </div>
                    <div 
                         :class="['option_selected_'+isEdited]"
                         @click="clickDate(true)">
                        <text 
                              class="txt_add">本周</text>
                    </div>
                </div>
            </cell-peo>
            <cell-peo 
                    class="div_item border"
                    txtTit="审阅者"
                    :btnName="isEdited?'添加':''"
                    @clickBtn="clickCellBtn"
            >
                <scroller 
                          slot="option"
                          scroll-direction="horizontal"
                          class="cell-scroll">
                    <text 
                          v-for="item in readerList"
                          class="txt_tit">{{item.Name}}</text>
                </scroller>
                >
            </cell-peo>
            <cell-input 
                        v-if="isEdited"
                        class="div_item"
                        txtTit="本周工作总结"
                        txtHide="请输入工作总结"
                        txtLines="6"
                        :txtInput="repDetails.summary?repDetails.summary:''"
                        @clickCellInput="clickSum"
            ></cell-input>
            <cell-input 
                        v-else
                        class="div_item"
                        txtTit="本周工作总结"
                        :txtInput="lastDetails.summary?lastDetails.summary:'无数据'"
            ></cell-input>
            <cell-input 
                        v-if="isEdited"
                        class="div_item"
                        txtTit="下周工作计划"
                        txtHide="请输入工作计划"
                        txtLines="6"
                        :txtInput="repDetails.myPlan?repDetails.myPlan:''"
                        @clickCellInput="clickPlan"
            ></cell-input>
            <cell-input 
                        v-else
                        class="div_item"
                        txtTit="下周所定工作计划"
                        :txtInput="lastDetails.myPlan?lastDetails.myPlan:'无数据'"
            ></cell-input>
            <text 
                  class="txt_grey border">最近保存时间 {{saveTime}}</text>
        </scroller>
        <bottom-btn 
                    class="cell_bottom_btn"
                    :txtLeft="repDetails.IsPost?'提交':'保存'"
                    :txtRight="repDetails.IsPost?'':'提交'"
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

    export default {
        components: {
            appHeader: require('../../components/header/apply-header.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            Label: require('../../components/label.vue'),
            DateLogo: require('../../components/cell-date-logo.vue'),
            CellPeo: require('../../components/cell-txt-btn.vue'),
            CellInput: require('../../components/cell-input.vue')
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            lastDetails(){
                return this.$store.getters.getLastWeekDetails;
            },
            repDetails(){
                return this.$store.getters.getRepDetails;
            },
            readerList(){
                return this.isEdited ? this.$store.getters.getReaderList : this.getReaderList(this.lastDetails.Auditors);
            },
            saveTime(){
                let self = this;
                if (self.isEdited) {
                    return self.repDetails.UpdateTime ? self.repDetails.UpdateTime : self.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
                } else {
                    return self.lastDetails.UpdateTime;
                }
            }
        },
        data(){
            return {
                isEdited: true, /*上周：不可编辑；本周：可编辑*/
                startDate: '',
                endDate: ''
            }
        },
        methods: {
            clickCellBtn(){
                let self = this;
                self.$router.push('/repReader')
            },
            clickDate(bol){
                let self = this;
                self.isEdited = bol;
            },
            clickSum(par1, par2, par3){
                let self = this;
                self.repDetails.summary = par2;
            },
            clickPlan(par1, par2, par3){
                let self = this;
                self.repDetails.myPlan = par2;
            },
            clickLeft(){
                let self = this;
                if (self.repDetails.IsPost) {
                    self.subRep();
                } else {
                    self.sendRep(0);
                }
            },
            clickRight(){
                this.subRep();
            },
            subRep(){
                let self = this;
                if (!self.repDetails.summary) {
                    modal.toast({'message': '本周工作总结不能为空！', 'doation': 1});
                    return;
                }
                if (!self.repDetails.myPlan) {
                    modal.toast({'message': '下周工作计划不能为空！', 'doation': 1});
                    return;
                }
                self.sendRep(1);
            },
            sendRep(ispost){
                let self = this;
                var plan;
                var sum;
                plan = self.escapeHtml(self.repDetails.myPlan?self.repDetails.myPlan:'');
                sum = self.escapeHtml(self.repDetails.summary?self.repDetails.summary:'');
                var selected_autitors = '';
                if (self.readerList != null && self.readerList.length > 0) {
                    for (var i = 0; i < self.readerList.length; i++) {
                        var item = self.readerList[i];
                        selected_autitors = selected_autitors + item.Guid + '/§/' + item.Name + '/§/' + item.Code + ',,';
                    }
                }
                let params = {};
                params.code = self.userPlatformCode;
                params.startTime = self.startDate;
                params.endTime = self.endDate;
                params.isWeek = 1;
                params.date = self.endDate;
                params.ProGuid = '';
                params.leader = '';
                params.module = '';
                params.type = 10;
                params.summary = encodeURIComponent(sum);
                params.plan = encodeURIComponent(plan);
                params.ispost = ispost;
                params.annex = '';
                params.guid = self.repDetails.Guid ? self.repDetails.Guid : '';
                params.autitors = selected_autitors;
                let body = 'json=' + JSON.stringify(params) + '&version=1';
                console.log('REP: ', body);
                self.$store.dispatch('FETCH_REP_SAVE', {
                    body: body, callback: function (retdata) {
                        if (retdata != null) {
                            console.log(retdata)
                            if (retdata == true) {
                                self.$router.back()
                            } else {
                                modal.toast({'message': retdata, 'doation': 1});
                            }
                        } else {
                            modal.toast({'message': '请求失败', 'doation': 1});
                        }
                    }
                })
            },
            getReaderList(auditors){/*获取审核者列表*/
                let list = [];
                if (auditors) {
                    var arr = auditors.split(',,');
                    for (var str of arr) {
                        if (str !== null && str !== "") {
                            var headerArr = str.split('/*/');
                            var item = {};
                            item.Guid = headerArr[0];
                            item.Name = headerArr[1];
                            item.Code = headerArr[2];
                            list.push(item);
                        }
                    }
                }
                return list;
            },
            setDate: function () {/*设置周报的开始日期和结束日期*/
                var self = this;
                var date = new Date();
                //因为 getDay() 获取一周中的第几天，是从周日开始，所以我们获取当前是一周中的第几天时向前推一天
                var todayOfWeek = (new Date(date - 86400000)).getDay();
                //本周的开始日期
                self.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - todayOfWeek);
                //本周的结束日期
                self.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6 - todayOfWeek);
                self.startDate = self.formatDate(self.startDate, 'yyyy-MM-dd');
                self.endDate = self.formatDate(self.endDate, 'yyyy-MM-dd');
            }
        },
        created(){
            let self = this;
            if(self.repDetails.Guid){
                self.startDate=self.repDetails.startTime;
                self.endDate=self.repDetails.endTime;
            }else{
                self.setDate();
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .div_item {
        background-color: #fff;
        @include paddingRow;
        @include paddingColumn();
    }

    .option_selected_true {
        @include marginRow($sl);
        @include cornerBtn($cs, #fff, $colorCommon, 0px);
    }

    .option_selected_false {
        @include marginRow($sl);
        @include cornerBtn($cs, #fff, $css-grey, 0px);
    }

    .txt_add {
        @include fontCommon($cs,#fafafa);
        @include marginRow();
        text-align: center;
    }

    .txt_tit {
        @include fontCommon($cs,$colorCommon);
        margin-right: $cl;
    }

    .txt_grey {
        background-color: #fff;
        @include paddingRow;
        @include paddingColumn;
        @include fontCommon($ss);
    }

    .border {
        margin-bottom: $cl;
    }

    .cell_bottom_btn {
        @include paddingColumn();
        @include paddingRow($sl);
    }

    .cell-scroll {
        height: $ls;
        flex-direction: row;
        align-items: center;
        flex: 1;
        margin-left: $cl;
        margin-right: $sl;
    }
</style>