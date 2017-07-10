<template>
    <div append="node">
        <apply-header :tit="applyTypeName+'申请'"></apply-header>
        <scroller>
            <!-- <div class="type">
                <text class="text_black" style="flex:1;">汇报类型</text>
                <div class="div_rad_border select_{{isSelected}}" onclick="">
                    <text class="txt_rad_border">加班申请</text>e
                </div>
                <div class="div_rad_border select_{{!isSelected}}" onclick="">
                    <text class="txt_rad_border">团建申请</text>
                </div>
            </div> -->
            <div class="type">
                <text class="text_black" style="flex:1;">开始日期</text>
                <text :class="['text_black','select_color_'+(type==0).toString()]" @click="clickStartDate($event,1)">{{startDate}}</text>
            </div>
            <div class="type">
                <text class="text_black" style="flex:1;">{{type==0||type==2||(!isEmptyObject(apply)&&apply.ISFINISH==0)?'预计':''}}结束日期</text>
                <text :class="['text_black','select_color_'+(type==0).toString()]" @click="clickStartDate($event,2)">{{endDate}}</text>
            </div>
            <div class="reader" v-if="type==0||type==1">
                <text :class="['text_black',type!=0?'class_flex':'']">审批者</text>
                <scroller :class="['readerList',type==0?'class_flex':'']" scroll-direction="horizontal">
                    <div class="div_reader" v-for="item in approveList">
                        <text class="text_black">{{item.USERNAME}}</text>
                    </div>
                </scroller>
                <div v-if="type==0" class="div_rad_border select_true" @click="clickAddReader(0)">
                    <text class="txt_rad_border">添加</text>
                </div>
            </div>
            <div class="reader " v-if="type==0||type==1">
                <text :class="['text_black']">知会者</text>
                <scroller :class="['readerList','class_flex']" scroll-direction="horizontal">
                    <div class="div_reader" v-for="item in noticeList">
                        <text class="text_black">{{item.USERNAME}}</text>
                    </div>
                </scroller>
                <div v-if="type==0" class="div_rad_border select_true" @click="clickAddReader(1)">
                    <text class="txt_rad_border">添加</text>
                </div>
            </div>
            <div v-if="type==0" class="border_top">
                <textarea class="textarea" rows="8" @input="inputContent($event)" :value="applyContent"
                          placeholder="申请内容"></textarea>
            </div>
            <div v-else class="border_top">
                <text class="txt_tit " style="margin-top: 30px;">申请内容</text>
                <text class="textarea">{{isEmptyObject(apply)?'':apply.APPLOYCONTENT}}</text>
            </div>
            <!--<text>{{apply}}</text>-->
        </scroller>
        <bottom-btn v-if="showBottom" :txtLeft="bottomTxt[type]"
                    :txtRight="type==2&&(!isEmptyObject(apply)&&apply.ISAPPLED==0)?'审批驳回':''"
                    btnColor="#58D68D" btnMargin="12px"
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
            ApplyHeader: require('../../components/apply-header.vue'),
            BottomBtn: require('../../components/bottom-btn.vue'),
        },
        computed: {
            params () {
                if (this.$route && this.$route.params) {
                    console.log(this.$route.params.params)
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
                if (!self.isEmptyObject(self.$store.getters.applyDetail)) {
                    self.startDate = self.$store.getters.applyDetail.STARTTIME;
                    self.endDate = self.$store.getters.applyDetail.ISFINISH == 0 ? self.$store.getters.applyDetail.EXCEPTTIME : self.$store.getters.applyDetail.ENDTIME;
                }
//                modal.alert({message:JSON.stringify(this.$store.getters.applyDetail),duration:1})
                return self.$store.getters.applyDetail;

            },
            applyContent(){
                return this.$store.getters.applyGetInput
            },
            baseUrl(){
                return this.$store.getters.applyBaseUrl
            },
            token(){
                return this.$store.getters.applyGetToken
            }
        },
        props: {},
        data(){
            return {
                devHeight: 1190,
                actionBarHeight: 112,
                imgBackUrl: '/drawable/ic_back_white_48dp.png',
                endDateType: '预计结束',
                date: '',
                startDate: '',
                endDate: '',
                isSelected: false,
                applyTit: '',
                type: '',
                itemGuid: '',
                applyTypeName: '',
                bottomTxt: ['申请', '完成', '审批通过']
            }
        },
        methods: {
            showBottom:function () {
                let self=this;
                console.log('SHOWBOTTOM: ',self.type)
                if(self.type==0){
                    return true
                }else if(self.type==1&&!self.isEmptyObject(self.apply)&&self.apply.ISFINISH==0){
                    return true
                }else return self.type == 2 && !self.isEmptyObject(self.apply) && self.apply.ISAPPLED == 0;
            },
            isEmptyObject: function (obj) {
                for (let key in obj) {
                    return false
                }
                return true
            },
            clickAddReader: function (type) {
                let self = this;
                let params = {};
                params.type = type;
                self.jump(`/applyReader/${JSON.stringify(params)}`);
            },
            clickStartDate: function (e, type) {
                let self = this;
                if (self.type == 0) {
                    let date = new Date();
                    picker.pickDate({
                        value: type === 1 ? self.startDate : self.endDate,
                        max: self.formatDate(new Date(date.getFullYear() + 10, date.getMonth(), date.getDay()), 'yyyy-MM-dd'),
                        min: self.formatDate(new Date(date.getFullYear() - 10, date.getMonth(), date.getDay()), 'yyyy-MM-dd')
                    }, function (event) {
                        if (event.result === 'success') {
                            if (type === 1) {
                                self.startDate = event.data;
                            } else if (type === 2) {
                                self.endDate = event.data;
                            }
                        }
                    });
                }
            },
            inputContent: function (e) {
                let self = this;
                self.$store.commit('SET_INPUT_VALUE',{value:e.value})
//                self.applyContent = e.value;
            },
            clickLeft: function () {
                let self = this;
                if (self.type == 0) {
                    self.newApply();
                } else if (self.type == 1) {
                    self.completeApply();
                } else if (self.type == 2) {
                    self.exceptApply(1);
                }
            },
            clickRight: function () {
                let self = this;
                self.exceptApply(5);
            },
            newApply: function () {
                let self = this;
                let body = 'QueryType=apply_for_job&UserGuid=';
                let type = self.itemGuid;
                let params = {};
                params.STARTTIME = self.startDate;
                params.EXCEPTTIME = self.endDate;
                params.TYPE = type;
                params.CONTENT = self.applyContent;
                params.APPROVER = self.listToString(self.$store.getters.applyReader.approveList);
                params.NOTICE_LIST = self.listToString(self.$store.getters.applyReader.noticeList);
                body = body + self.token + '&Params=' + JSON.stringify(params);
                self.fetchData('FETCH_APPLY_NEW', body);
            },
            completeApply: function () {
                let self = this;
                let body = 'QueryType=set_apply_for_succ&UserGuid=';
                let params = {};
                params.GUID = self.itemGuid;
                body = body + self.token + '&Params=' + JSON.stringify(params);
                self.fetchData('FETCH_APPLY_COMPLETE', body);
            },
            exceptApply: function (state) {
                let self = this;
                // excepted: 0-审批通过 1-审批驳回
                let body = 'QueryType=set_apply_for_handle&UserGuid=';
                let params = {};
                params.GUID = self.itemGuid;
                params.STATE = state;
                body = body + self.token + '&Params=' + JSON.stringify(params);
                self.fetchData('FETCH_APPLY_APPROVE', body);
            },
            fetchData: function (fetchName, body) {
                let self = this;
                let applyListBody = 'QueryType=sync_job_apply_list&UserGuid=';
                let applyListParams = {};
                applyListParams.TYPE = self.itemGuid;
                applyListBody = applyListBody + self.token + '&Params=' + JSON.stringify(applyListParams);
                self.$store.dispatch(fetchName,
                    {
                        body: body,
                        applyListBody: applyListBody,
                        callback: function (data) {
                            if (data.CODE == 0) {
                                self.back();
                            } else {
                                modal.toast({message: data.ERROR, duration: 1});
                            }
                        }
                    });

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
                let body = 'QueryType=getAskForInfoFromId&UserGuid=';
                let params = {};
                params.GUID = self.itemGuid;
                body = body + self.token + '&Params=' + JSON.stringify(params);
                self.$store.dispatch('FETCH_APPLY_DETAIL', {body: body});
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

        }
    };
</script>
<style>
    .class_flex {
        flex: 1;
    }
</style>

<style scoped>
    .border_top {
        border-top-width: 20px;
        border-color: #ebedef;
    }

    .border_bottom {
        border-bottom-width: 20px;
        border-color: #ebedef;
    }

    .type {
        flex-direction: row;
        height: 100px;
        border-bottom-width: 1px;
        border-color: #ebedef;
        align-items: center;
        justify-content: center;
    }

    .select_true {
        background-color: #58D68D;
    }

    .select_false {
        background-color: #aaaaaa;
    }

    .div_rad_border {
        height: 50px;
        margin-right: 10px;
        border-radius: 60px;
        align-items: center;
        justify-content: center;
    }

    .txt_rad_border {
        text-align: center;
        font-size: 26px;
        color: #fafafa;
        margin-left: 16px;
        margin-right: 16px;
    }

    .text_black {
        margin-left: 20px;
        margin-right: 20px;
        font-size: 30px;
        justify-content: center;
    }

    .txt_tit {
        height: 60px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        font-size: 30px;
    }

    .textarea {
        margin-left: 36px;
        margin-right: 36px;
        margin-top: 20px;
        padding: 10px;
        font-size: 28px;
        background-color: #ebedef;
        border-radius: 5px;
    }

    .select_color_true {
        color: #58D68D;
    }

    .select_color_false {
        color: #aaaaaa;
    }

    .readerList {
        /*flex: 1;*/
        /*width:560px;*/
        flex-direction: row;
        justify-content: flex-end;
        height: 100px;
    }

    .reader {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom-color: #ebedef;
        border-bottom-width: 1px;
    }

    .div_reader {
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>