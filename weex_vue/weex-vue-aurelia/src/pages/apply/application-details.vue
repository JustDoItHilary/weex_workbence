<template>
    <div append="node">
        <apply-header :tit="applyTypeName+'申请'" :close="clickClose"></apply-header>
        <scroller>
            <div class="type">
                <text class="text_black" style="flex:1;">开始日期</text>
                <text class="[ text_black select_color_false ]" @click="clickStartDate($event,1)">{{startDate}}</text>
            </div>
            <div class="type">
                <text class="text_black" style="flex:1;">{{type==2||(!isEmptyObject(apply)&&apply.ISFINISH==0)?'预计':''}}结束日期</text>
                <text class="[ text_black select_color_false ]" @click="clickStartDate($event,2)">{{endDate}}</text>
            </div>
            <div class="reader" v-if="type==1">
                <text class="text_black " style="flex:1;">审批者</text>
                <scroller class="readerList" scroll-direction="horizontal">
                    <div class="div_reader" v-for="item in approveList">
                        <text class="text_black">{{item.USERNAME}}</text>
                    </div>
                </scroller>
            </div>
            <div class="reader " v-if="type==1">
                <text class="[ text_black class_flex ]">知会者</text>
                <scroller class="readerList" scroll-direction="horizontal">
                    <div class="div_reader" v-for="item in noticeList">
                        <text class="text_black">{{item.USERNAME}}</text>
                    </div>
                </scroller>
            </div>
            <div class="border_top">
                <text class="txt_tit " style="margin-top: 30px;">申请内容</text>
                <text class="textarea">{{isEmptyObject(apply)?'':apply.APPLOYCONTENT}}</text>
            </div>
        </scroller>
        <bottom-btn v-if="(!isEmptyObject(apply)&&apply.ISFINISH==0)" :txtLeft="bottomTxt[type]"
                    :txtRight="type==2?'审批驳回':''"
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
            ApplyHeader: require('../../components/header/apply-header.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
        },
        computed: {
            approveList(){
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
//                modal.alert({message:self.$store.getters.applyDetails,duration:1})
                return self.$store.getters.applyDetail;

            },
        },
        props: {},
        data(){
            return {
                devHeight: 1190,
                actionBarHeight: 112,
                baseUrl: '',
                imgBackUrl: '/drawable/ic_back_white_48dp.png',
                endDateType: '预计结束',
                date: '',
                startDate: '',
                endDate: '',
                isSelected: false,
                applyTit: '',
                applyContent: '',
                type: '',
                itemGuid: '',
                token: '',
                applyTypeName: '',
                bottomTxt: ['申请', '完成', '审批通过']
            }
        },
        methods: {
            isEmptyObject: function (obj) {
                for (let key in obj) {
                    return false
                }
                return true
            },
            //关闭界面，退出
            clickClose: function () {
                console.log('CLOSE')
                configModule.finish();
            },
            clickLeft: function () {
                let self = this;
                if (self.type == 1) {
                    self.completeApply();
                } else if (self.type == 2) {
                    self.exceptApply(1);
                }
            },
            clickRight: function () {
                let self = this;
                self.exceptApply(5);
            },
            completeApply: function () {
                let self = this;
                let params = {};
                params.GUID = self.itemGuid;
                self.fetchData('FETCH_APPLY_COMPLETE', {params: JSON.stringify(params)});
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
                            if (data.CODE === "0") {
                                let params = {'animated': 'true'};
                                navigator.pop(params, function (ret) {
                                });
                            } else {
                                modal.toast({message: data.ERROR, duration: 1});
                            }
                        }
                    });
            },
            getDetails: function () {
                let self = this;
                let params = {};
                params.GUID = self.itemGuid;
                self.$store.dispatch('FETCH_APPLY_DETAIL', {params: JSON.stringify(params)});
            },
            getUrlParams: function () {
                let self = this;
                let bundleUrl = self.$getConfig().bundleUrl || '';
                // apply-type: 0-新建 1-详情 2-审批
//                let bundleUrl = 'http://192.168.100.120:8888/weex/workRep.js?guid=620b8089ffe615d2d16615de8bf2c6db&type=1';
                let params = bundleUrl.split('?');
                self.baseUrl = params[0].split('/').slice(0, -1).join('/');
                self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
                let paramsArr = params[1].split('&');
                self.itemGuid = paramsArr[0].split('=')[1];
                self.type = paramsArr[1].split('=')[1];
            }
        },
        created: function (e) {
            let self = this;
            self.getUrlParams();
//            self.token = '@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--';
            configModule.getUrl('', function (ret) {
                self.token = ret.split('=')[1];
                self.getDetails()
            })
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
        text-align: left;
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
        flex-direction: row;
        justify-content: flex-start;
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