<template>
    <div append="node" >
        <apply-header :tit="applyTypeName+'申请'"></apply-header>

        <bottom-btn v-if="showBottom" :txtLeft="getBottomLeft()"
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
//            BottomBtn: require('../../components/footer/footGuide.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            CellTime: require('../../components/cell-justify.vue'),
            CellPeo: require('../../components/cell-peo.vue'),
            CellInput:require('../../components/cell-input.vue'),
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
                if (!self.isEmptyObject(self.$store.getters.applyDetail)) {
                    self.startDate = self.$store.getters.applyDetail.STARTTIME;
                    self.endDate = self.$store.getters.applyDetail.ISFINISH == 0 ? self.$store.getters.applyDetail.EXCEPTTIME : self.$store.getters.applyDetail.ENDTIME;
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
                devHeight: 1190,
                actionBarHeight: 112,
                endDateType: '预计结束',
                date: '',
                startDate: '',
                endDate: '',
                isSelected: false,
                applyTit: '',
                type: '',
                itemGuid: '',
                applyTypeName: '',
                bottomTxt: ['申请', '完成', '审批通过'],
                applyContent:'',
                txtList:['无意见','上班延迟','调休'],
                exceptOption:{}
            }
        },
        methods: {
            getBottomLeft:function () {
                let self=this;
                if (self.type==1&&self.apply.ISFINISH==1){
                    return '已完成'
                }else if (self.type==2&&self.apply.ISAPPLED==1){
                    return '已审批'
                }else if(self.apply.ISAPPLED==5){
                    return '已驳回'
                }else{
                    return self.bottomTxt[self.type];
                }
            },
            clickCellTime:function (data,timeType) {
                let self=this;
                if (self.type == 0) {
                    if(timeType==1){
                        self.startDate=data;
                    }else if(timeType==2){
                        self.endDate=data;
                    }
                }
            },
            clickCellApply:function (guid,note,type) {
                let self=this;
                if(type==0){
                    self.exceptOption.guid=guid;
                    self.exceptOption.note=note;
                }else if(type==1){
                    self.applyContent = note;
                }
            },
            showBottom:function () {
                let self=this;
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
            clickAddPeo: function (type) {
                let self = this;
                let params = {};
                params.type = type;
                self.jump(`/applyReader/${JSON.stringify(params)}`);
                console.log('clickaddpeo')
            },
            inputContent: function (e) {
                let self = this;
                self.applyContent = e.value;
            },
            clickLeft: function () {
                let self = this;
                self.jump('/test')
//                if (self.type == 0) {
//                    self.newApply();
//                } else if (self.type == 1) {
//                    if(self.apply.ISFINISH==0){
//                        self.completeApply();
//                    }
//                } else if (self.type == 2) {
//                    self.exceptApply(1);
//                }
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
//                console.log('BODY: ',body)
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
                params.OPTIONGUID=self.exceptOption.guid;
                params.NOTE=self.exceptOption.note;
                body = body + self.token + '&Params=' + JSON.stringify(params);
                console.log('BODY: ',body)
//                self.fetchData('FETCH_APPLY_APPROVE', body);
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

        },
        beforeRouteEnter:function (to,from,next) {
            console.log("beforeRouteEnter------------",from)
            next(vm=>{
//                if (from.name=='applyreader') {
//                    vm.startDate = to.meta.options.start;
//                    vm.endDate = to.meta.options.end;
//                    vm.applyContent = to.meta.options.content;
//                }
            });
        },
        beforeRouteLeave:function (to,from,next) {
            next();
//            if (from.meta.keepAlive){
//                from.meta.options.start=this.startDate;
//                from.meta.options.end=this.endDate;
//                from.meta.options.content=this.applyContent;
//                next();
//            }
        }
    };
</script>
<style>
    .class_flex {
        flex: 1;
    }
</style>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";

    .txt-tit{
    @include marginRow;
    @include fontSize;
        margin-top: 28px;
        color:$colorCommon;
    }
    .div-padding {
    @include marginRow;
    @include paddingColumn;
        margin-top: 10px;

    }
    .div-cell-input{
    @include marginRow;
    @include marginColumn;
    }

    .border{
        height:20px;
        background-color: $wg;
    }
</style>