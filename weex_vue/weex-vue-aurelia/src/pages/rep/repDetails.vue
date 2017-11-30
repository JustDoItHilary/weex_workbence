<template>
    <div style="background-color:#ebedef;" append="node">
        <app-header tit="工作汇报"></app-header>
        <scroller>
            <cell-justify v-ratio="ratio"
                    class="div_item"
                    txtLeft="汇报类型"
                    :txtRight="repDetails.ProName"
                    bottomBorder="1"
            ></cell-justify>
            <cell-justify v-ratio="ratio"
                    class="div_item"
                    txtLeft="周报日期"
                    :txtRight="repDetails.startTime+' - '+repDetails.endTime"
                    bottomBorder="1"
            ></cell-justify>
            <cell-justify v-ratio="ratio"
                    class="div_item"
                    txtLeft="周报状态"
                    :txtRight="repDetails.IsPost==1?'已提交':'未提交'"
                    bottomBorder="1"
            ></cell-justify>
            <cell-peo v-ratio="ratio"
                    class="div_item border"
                    txtTit="审阅者"
                    btnName="添加"
                    @clickBtn="clickCellBtn"
            >
                <scroller v-ratio="ratio"
                          slot="option"
                          scroll-direction="horizontal"
                          class="cell-scroll">
                    <text v-ratio="ratio"
                          v-for="item in readerList"
                          class="txt_tit">{{item.Name}}</text>
                </scroller>
            </cell-peo>
            <cell-input v-ratio="ratio"
                        v-if="isEdited"
                        class="div_item"
                        txtTit="本周工作总结"
                        txtHide="请输入工作总结"
                        txtLines="6"
                        :txtInput="repDetails.repSum"
                        @clickCellInput="clickSum"
            ></cell-input>
            <cell-input v-ratio="ratio"
                        v-else
                        class="div_item"
                        txtTit="本周工作总结"
                        :txtInput="repDetails.summary?repDetails.summary:' '"
            ></cell-input>
            <cell-input v-ratio="ratio"
                        v-if="isEdited"
                        class="div_item"
                        txtTit="下周工作计划"
                        txtHide="请输入工作计划"
                        txtLines="6"
                        :txtInput="repDetails.repPlan"
                        @clickCellInput="clickPlan"
            ></cell-input>
            <cell-input v-ratio="ratio"
                        v-else
                        :class="['div_item',repDetails.hasComment==1?'border':'']"
                        txtTit="下周工作计划"
                        :txtInput="repDetails.myPlan?repDetails.myPlan:' '"
            ></cell-input>
            <cell-input v-ratio="ratio"
                        v-if="repDetails.hasComment==1&&assessment.length>0"
                        class="div_item"
                        txtTit="审核评价"
            >
                <div v-ratio="ratio"
                     slot="content"
                     v-for="item in assessment"
                     class="div_content">
                    <text v-ratio="ratio"
                          class="content">{{item.AutName}}:</text>
                    <text v-ratio="ratio"
                          class="content"
                          style="flex:1;">{{item.Content}}</text>
                </div>
            </cell-input>
            <text v-ratio="ratio"
                  class="txt_grey border">最近保存时间 {{repDetails.UpdateTime}}</text>
        </scroller>
        <bottom-btn v-ratio="ratio"
                    class="cell_bottom_btn"
                    :txtLeft="isEdited?(repDetails.IsPost?'提交':'保存'):'修改'"
                    :txtRight="isEdited&&!repDetails.IsPost?'提交':''"
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
            CellPeo: require('../../components/cell-txt-btn.vue'),
            CellInput: require('../../components/cell-input.vue'),
            CellJustify: require('../../components/cell-justify.vue')
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            repDetails(){
                let self = this;
                let repDetails = self.$store.getters.getRepDetails;
//                console.log(repDetails);
                if (repDetails.hasComment == 1) {
                    var body = 'code=' + self.userPlatformCode + '&CommentDate=' + repDetails.endTime + '&Isweek=1';
//                    console.log(body)
                    self.$store.dispatch('FETCH_REP_GET_COMMENTS', {body: body});
                }
                return repDetails;
            },
            readerList(){
                return this.$store.getters.getReaderList
            },
            assessment(){
                return this.$store.getters.getAssessment
            },
        },
        data(){
            return {
                isEdited: false,
            }
        },
        methods: {
            clickCellBtn(){
//                console.log('REPDETAILS: ', this.$store.getters.getReaderList)
                this.$router.push('/repReader')
            },
            clickSum(par, mess, type){
                let self = this;
                self.repDetails.repSum = mess;
            },
            clickPlan(par, mess, type){
                this.repDetails.repPlan = mess;
            },
            clickLeft(){
                let self = this;
                if (!self.isEdited) {
                    self.isEdited = true;
                } else if (self.repDetails.IsPost) {
                    if (!self.repDetails.repSum) {
                        self.toToast('本周工作总结不能为空！');
                        return;
                    }
                    if (!self.repDetails.repPlan) {
                        self.toToast('下周工作计划不能为空！');
                        return;
                    }
                    self.sendRep(1)
                } else {
                    self.sendRep(0)
                }
            },
            clickRight(){
                let self = this;
                if (!self.repDetails.repSum) {
                    self.toToast('本周工作总结不能为空！');
                    return;
                }
                if (!self.repDetails.repPlan) {
                    self.toToast('下周工作计划不能为空！');
                    return;
                }
                self.sendRep(1);
            },
            // 因为该界面修改周报所以 ispost 字段值为所修改的周报的提交信息
            sendRep(ispost){
                var self = this;
                self.repDetails.repPlan = self.escapeHtml(self.repDetails.repPlan);
                self.repDetails.repSum = self.escapeHtml(self.repDetails.repSum);
                var selected_autitors = '';
                for (var i = 0; i < self.readerList.length; i++) {
                    var item = self.readerList[i];
                    selected_autitors = selected_autitors + item.Guid + '/§/' + item.Name + '/§/' + item.Code + ',,';
                }
                let params = {};
                params.code = self.userPlatformCode;
                params.startTime = self.repDetails.startTime;
                params.endTime = self.repDetails.endTime;
                params.isWeek = 1;
                params.date = self.repDetails.endTime;
                params.ProGuid = '';
                params.leader = '';
                params.module = '';
                params.type = 10;
                params.summary = encodeURIComponent(self.repDetails.repSum);
                params.plan = encodeURIComponent(self.repDetails.repPlan);
                params.ispost = ispost;
                params.annex = '';
                params.guid = self.repDetails.Guid;
                params.autitors = selected_autitors;
                let body = 'json=' + JSON.stringify(params) + '&version=1';
                self.$store.dispatch('FETCH_REP_SAVE', {
                    body: body, callback: function (retdata) {
                        if (retdata != null) {
                            console.log(retdata)
                            if (retdata == true) {
                                self.$router.back()
                            } else {
                                self.toToast(retdata);
                            }
                        } else {
                            self.toToast('请求失败');
                        }
                    }
                })
            }
        },
        destroyed(e){
            let self = this;
            self.$store.commit('SET_REP_ASSESSMENT', {retdata: []});
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .div_item {
        background-color: #fff;
        @include paddingRow;
        @include paddingColumn();
    }

    .txt_tit {
        @include fontCommon($cs, $colorCommon);
        margin-right: $cl;
    }

    .txt_grey {
        background-color: #fff;
        @include paddingRow;
        @include paddingColumn($sl);
        @include fontCommon($ss, $css-grey);
    }

    .border {
        margin-bottom: $ss;
    }

    .cell_bottom_btn {
        @include paddingColumn();
        @include paddingRow($sl);
    }

    .txt-corner-btn {
        @include cornerBtn($cs, #fff, $colorCommon)
    }

    .cell-scroll {
        height: $ls;
        flex-direction: row;
        align-items: center;
        flex: 1;
        margin-left: $cl;
        margin-right: $sl;
    }

    .content {
        @include fontCommon;
        padding: $ss;
    }

    .div_content {
        flex-direction: row;
        background-color: $wg;
        @include marginColumn($sl);
    }
</style>