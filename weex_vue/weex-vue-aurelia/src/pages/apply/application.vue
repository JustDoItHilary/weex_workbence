<template>
    <div append="node">
        <apply-header :tit="applyTypeName+'申请'"></apply-header>
        <scroller>
            <div v-if="type==2" style="flex-direction: column;">
                <text class="txt-tit">审批</text>
                <cell-input
                        class="div-cell-input"
                        txtTit="审批意见"
                        :txtList="isEmptyObject(apply)?'':apply.OPTION"
                        txtHide="审批备注"
                        :txtInput="exceptOption.note"
                        :index="apply.OPTIONIDNEX?apply.OPTIONIDNEX:0"
                        type="0"
                        @clickCellInput="clickCellApply"
                >
                    <image slot="arrow-right" style="width: 48px;height: 48px;" :src="baseUrl+imgArrowRightUrl"></image>
                </cell-input>
                <div class="border"></div>
                <text class="txt-tit">待审批申请</text>
                <cell-time
                        class="div-padding"
                        txtLeft="申请人"
                        :txtRight="isEmptyObject(apply)?'':apply.USERNAME"
                        :active="type==0"
                        bottomBorder="1"
                ></cell-time>
            </div>
            <cell-time
                    class="div-padding"
                    txtLeft="开始日期"
                    :txtRight="startDate"
                    :active="type==0"
                    bottomBorder="1"
                    type="1"
                    @clickCellTime="clickCellTime"
            ></cell-time>
            <cell-time
                    class="div-padding"
                    :txtLeft="(type==0||type==2||(!isEmptyObject(apply)&&apply.ISFINISH==0)?'预计':'')+'结束日期'"
                    :txtRight="endDate"
                    :active="type==0"
                    bottomBorder="1"
                    type="2"
                    @clickCellTime="clickCellTime"
            ></cell-time>
            <cell-peo
                    v-if="type==0||type==1"
                    class="div-padding"
                    txtTit="审批者"
                    txtExplain="审批该申请的人，只可选择一个人。"
                    :peoList="approveList"
                    :added="type==0"
                    bottomBorder="1"
                    type="0"
                    @clickAddPeo="clickAddPeo"
            ></cell-peo>
            <cell-peo
                    v-if="type==0||type==1"
                    class="div-padding"
                    txtTit="知会者"
                    txtExplain="当审批通过该申请后所通知的人，可选择多个人。"
                    :peoList="noticeList"
                    :added="type==0"
                    bottomBorder="1"
                    type="1"
                    @clickAddPeo="clickAddPeo"
            ></cell-peo>
            <cell-time
                v-if="apply.ISAPPLED!=0&&type!=2"
                class="div-padding"
                bottomBorder="1"
                txtLeft="审批意见"
                :txtRight="isEmptyObject(apply)||apply.OPTIONNAME==''?'无意见':apply.OPTIONNAME"></cell-time>
            <cell-time
                    v-if="apply.ISAPPLED!=0&&type!=2"
                    class="div-padding"
                    bottomBorder="1"
                    txtLeft="审批备注"
                    :txtRight="isEmptyObject(apply)?'':apply.AUDITNOTE"></cell-time>
            <div v-if="type==0">
                <cell-input
                        class="div-cell-input"
                        txtHide="申请内容"
                        txtLines="6"
                        :txtInput="applyContent"
                        type="1"
                        @clickCellInput="clickCellApply"
                ></cell-input>
                <!--<textarea class="textarea" rows="8" @input="inputContent($event)" :value="applyContent"-->
                <!--placeholder="申请内容"></textarea>-->
            </div>
            <cell-time
                    v-else
                    class="div-padding"
                    txtLeft="申请内容"
                    :txtRight="isEmptyObject(apply)?'':apply.APPLOYCONTENT"></cell-time>
        </scroller>
        <bottom-btn v-if="showBottom" class="cell_bottom_btn" :txtLeft="getBottomLeft()"
                    :txtRight="type==2&&(!isEmptyObject(apply)&&apply.ISAPPLED==0)?'审批驳回':''"
                    :left="clickLeft" :right="clickRight"></bottom-btn>
    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');
    const picker = weex.requireModule('picker');

    module.exports = {
        components: {
            ApplyHeader: require('../../components/header/apply-header.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            CellTime: require('../../components/cell-justify.vue'),
            CellPeo: require('../../components/cell-peo.vue'),
            CellInput: require('../../components/cell-input.vue'),
        },
        computed: {
            params () {
                if (this.$route && this.$route.params) {
//                    console.log(this.$route.params.params)
                    return this.$route.params.params
                }
                return ''
            },
            approveList(){
//                modal.alert({message:JSON.stringify(this.$store.getters.applyReader.approveList),duration:1})
                return this.$store.getters.applyReader.approveList;
            },
            noticeList(){
                return this.$store.getters.applyReader.noticeList;
            },
            apply(){
                let self = this;
                if ((self.type==1||self.type==2)&&!self.isEmptyObject(self.$store.getters.applyDetail)) {
                    self.startDate = self.$store.getters.applyDetail.STARTTIME;
                    self.endDate = self.$store.getters.applyDetail.ISFINISH == 0 ? self.$store.getters.applyDetail.EXCEPTTIME : self.$store.getters.applyDetail.ENDTIME;
                    self.exceptOption.guid=self.$store.getters.applyDetail.OPTIONGUID;
                    self.exceptOption.note=self.$store.getters.applyDetail.AUDITNOTE;
                }
//                console.log(self.$store.getters.applyDetail)
//                modal.alert({message:JSON.stringify(this.$store.getters.applyDetail),duration:1})
                return self.$store.getters.applyDetail;

            },
            baseUrl(){
                return this.$store.getters.baseUrl
            },
            token(){
                return this.$store.getters.selfToken
            }
        },
        props: {},
        data(){
            return {
                endDateType: '预计结束',
                date: '',
                startDate: '',
                endDate: '',
                isSelected: false,
                applyTit: '',
                type: '',//type:0-新建 1-完成 2-审批
                itemGuid: '',
                applyTypeName: '',
                bottomTxt: ['申请', '完成', '审批通过'],
                applyContent: '',
                txtList: ['无意见', '上班延迟', '调休'],
                exceptOption: {guid:'',note:''},
                imgArrowRightUrl:'/drawable/ic_keyboard_arrow_right_black_48dp.png'
            }
        },
        methods: {
            getBottomLeft: function () {
                let self = this;
                if (self.type == 1 && self.apply.ISFINISH == 1) {
                    return '已完成'
                } else if (self.type == 2 && self.apply.ISAPPLED == 1) {
                    return '已审批'
                } else if (self.apply.ISAPPLED == 5) {
                    return '已驳回'
                } else {
                    return self.bottomTxt[self.type];
                }
            },
            clickCellTime: function (data, timeType) {
                let self = this;
                if (self.type == 0) {
                    if (timeType == 1) {
                        self.startDate = data;
                    } else if (timeType == 2) {
                        self.endDate = data;
                    }
                }
            },
            clickCellApply: function (guid, note, type) {
                let self = this;
                if (type == 0) {
                    self.exceptOption.guid = guid;
                    self.exceptOption.note = note;
                } else if (type == 1) {
                    self.applyContent = note;
                }
            },
            showBottom: function () {
                let self = this;
                if (self.type == 0) {
                    return true
                } else if (self.type == 1 && !self.isEmptyObject(self.apply) && self.apply.ISFINISH == 0) {
                    return true
                } else return self.type == 2 && !self.isEmptyObject(self.apply) && self.apply.ISAPPLED == 0;
            },
            isEmptyObject: function (obj) {
                for (let key in obj) {
                    return false
                }
                return true
            },
            clickAddPeo: function (type) {
                let self = this;
                let params = {};
                params.type = type;
                self.jump(`/applyReader/${JSON.stringify(params)}`);
            },
            inputContent: function (e) {
                let self = this;
                self.applyContent = e.value;
            },
            clickLeft: function () {
                let self = this;
                if (self.type == 0) {
                    if(self.$store.getters.applyReader.approveList.length>0){
                        self.newApply();
                    }else {
                        self.toastMsg("审批者不可为空！")
                    }
                } else if (self.type == 1) {
                    if (self.apply.ISFINISH == 0){
                        if(self.apply.ISAPPLED== 5||self.apply.ISAPPLED==0) {
                            self.toastMsg(self.apply.ISAPPLEDNAME);
                        }else {
                            self.completeApply();
                        }
                    }else{
                        self.toastMsg(self.apply.FINISHNAME);
                    }
                } else if (self.type == 2) {
                    if(self.apply.ISAPPLED==0){
                        self.exceptApply(1);
                    }else {
                        self.toastMsg(self.apply.ISAPPLEDNAME);
                    }
                }
            },
            clickRight: function () {
                let self = this;
                self.exceptApply(5);
            },
            newApply: function () {
                let self = this;
                let type = self.itemGuid;
                let params = {};
                params.STARTTIME = self.startDate;
                params.EXCEPTTIME = self.endDate;
                params.TYPE = type;
                params.CONTENT = self.applyContent;
                params.APPROVER = self.listToString(self.$store.getters.applyReader.approveList);
                params.NOTICE_LIST = self.listToString(self.$store.getters.applyReader.noticeList);
                self.fetchData('FETCH_APPLY_NEW',JSON.stringify(params));
            },
            completeApply: function () {
                let self = this;
                let params = {};
                params.GUID = self.itemGuid;
                self.fetchData('FETCH_APPLY_COMPLETE', JSON.stringify(params));
            },
            exceptApply: function (state) {
                let self = this;
                // excepted: 0-审批通过 1-审批驳回
                let params = {};
                params.GUID = self.itemGuid;
                params.STATE = state;
                params.OPTIONGUID = self.exceptOption.guid;
                params.NOTE = self.exceptOption.note;
//                console.log(JSON.stringify(params))
                self.fetchData('FETCH_APPLY_APPROVE',  JSON.stringify(params));
            },
            fetchData: function (fetchName, params) {
                let self = this;
                let applyListParams = {};
                applyListParams.TYPE = self.itemGuid;
                self.$store.dispatch(fetchName,
                    {
                        params: params,
                        applyListParams: applyListParams,
                        callback: function (data) {
                            if (data.CODE == 0) {
                                self.back();
                            } else {
                                self.toastMsg(data.ERROR);
                            }
                        }
                    });

            },
            toastMsg(msg){
                modal.toast({message: msg, duration: 1});
            },
            listToString: function (list) {
                let str = '';
                for (let i = 0; i < list.length; i++) {
                    str = str + ',' + list[i].ID;
                }
                return str.substring(1);
            },
            getDate: function () {
                let self = this;
                self.date = new Date();
                self.startDate = self.formatDate(self.date, 'yyyy-MM-dd');
                self.endDate = self.formatDate(self.date, 'yyyy-MM-dd');
            },
            getDetails: function () {
                let self = this;
                let params = {};
                params.GUID = self.itemGuid;
                self.$store.dispatch('FETCH_APPLY_DETAIL', {params: JSON.stringify(params)});
            },
            getParams: function (params) {
                let self = this;
                self.itemGuid = params.GUID;
                self.type = params.TYPE;
                self.applyTypeName = params.NAME;
            }
        },
        created: function (e) {
            let self = this;
            self.getParams(JSON.parse(self.params));
            if (self.type == 1 || self.type == 2) {
                self.getDetails()
            } else if (self.type == 0) {
                self.getDate()
            }

        },
        beforeRouteEnter: function (to, from, next) {
//            console.log("beforeRouteEnter------------",to)
            next(vm => {
                if (from.name == 'applyReader') {
                    vm.startDate = to.meta.options.start;
                    vm.endDate = to.meta.options.end;
                    vm.applyContent = to.meta.options.content;
                }
            });
        },
        beforeRouteLeave: function (to, from, next) {
            from.meta.options.start = this.startDate;
            from.meta.options.end = this.endDate;
            from.meta.options.content = this.applyContent;
//            console.log("beforeRouteLeave------------",from)
            next();
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .txt-tit {
    @include marginRow;
    @include fontCommon;
        margin-top: 28px;
        color: $colorCommon;
    }

    .div-padding {
    @include marginRow;
    @include paddingColumn;
        margin-top: 10px;

    }

    .div-cell-input {
    @include marginRow;
    @include marginColumn;
    }

    .border {
        height: 20px;
        background-color: $wg;
    }
    .cell_bottom_btn{
    @include paddingColumn(16px);
    @include paddingRow;
    }
</style>