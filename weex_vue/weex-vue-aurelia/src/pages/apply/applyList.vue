<template>
    <div style="background-color:#ebedef;" append="node">
        <apply-header :tit="typeName + '申请'"></apply-header>
        <label :labelOneTxt="typeName + '申请'"
               :labelTwoTxt="typeName + '审批'"
               :selected="isSelected"
               :labelOne="clickLabelOne"
               :labelTwo="clickLabelTwo"
        ></label>
        <list class="list">
            <cell class="cell" v-for="item in applyList" @click="clickItem(item.GUID)">
                <div class="div_item_top">
                    <div class="logo">
                        <div class="div_time">
                            <text class="text_logo" style="color:#d9d9d9;">{{(new
                                Date(Date.parse(item.STARTTIME))).getMonth()+1
                                }}月</text>
                        </div>
                        <div class="div_time div_year">
                            <text class="text_logo" style="color:#ffffff;">{{(new
                                Date(Date.parse(item.STARTTIME))).getFullYear()}}年</text>
                        </div>
                    </div>
                    <div class="flex_left">
                        <text class="text_tit">{{item.STARTTIME}} -- {{item.EXCEPTTIME}}</text>
                        <div style="flex-direction: row;">
                            <text :class="['text_content', 'select_' + (item.ISAPPLED==1)]"
                            >{{item.ISAPPLEDNAME}}</text>
                            <text :class="['text_content', 'select_' + (item.ISFINISH==1)]"
                            >{{item.ISFINISH==0?'未完成':'已完成'}}</text>
                        </div>
                    </div>
                </div>
                <text class="text_mulit">{{item.APPLOYCONTENT}}</text>
            </cell>
        </list>
        <bottom-btn v-if="isSelected" txtLeft="新建" btnColor="#58D68D" :left="clickLeft"></bottom-btn>
    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');

    module.exports = {
        components: {
            ApplyHeader: require('../../components/apply-header.vue'),
            BottomBtn: require('../../components/bottom-btn.vue'),
            Label: require('../../components/label.vue')
        },
        computed: {
            item () {
                if (this.$route && this.$route.params) {
                    console.log(this.$route.params.item)
                    return this.$route.params.item
                }
                return ''
            },
            applyList(){
                return this.$store.getters.applyList
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
                isSelected: true,
                devHeight: 990,
                actionBarHeight: 100,
                imgUrl: '/drawable/ic_done_white_48dp.png',
                imgBackUrl: '/drawable/ic_back_white_48dp.png',
                weekly_list: [],
                hintRep: {type: 3, tit: '没有更多了哦~', time: ''},
                typeName: '',
                itemGuid: '',
            }
        },
        methods: {
            clickLabelOne: function (e) {
                let self = this;
                if (!self.isSelected) {
                    self.isSelected = true;
                    self.getApplyList();
                }
            },
            clickLabelTwo: function (e) {
                let self = this;
                if (self.isSelected) {
                    self.isSelected = false;
                    self.getExceptList();
                }
            },
            clickItem: function (guid) {
                let self = this;
                if (self.isSelected) {
                    self.nextPage(1, guid);
                } else {
                    self.nextPage(2, guid);
                }
            },
            clickLeft: function (e) {
                let self = this;
                self.$store.commit('SET_READER', {type: 0, reader: []});// reader 与后面获取值得键名一致
                self.$store.commit('SET_READER', {type: 1, reader: []});// reader 与后面获取值得键名一致
                self.nextPage(0, self.itemGuid);
            },
            nextPage: function (type, guid) {
                let self = this;
                let params = {};
                params.TYPE = type;
                params.GUID = guid;
                params.NAME = self.typeName;
                self.jump(`/application/${JSON.stringify(params)}`);
            },
            getExceptList: function () {
                let self = this;
                self.applyList = [];
                let body = 'QueryType=get_wait_for_handle&UserGuid=';
                let params = {};
                params.TYPE = self.itemGuid;
                    body = body + self.token + '&Params=' + JSON.stringify(params);
                    self.$store.dispatch('FETCH_APPLY_LIST', {body: body});
            },
            getApplyList: function () {
                let self = this;
                self.applyList = [];
                let body = 'QueryType=sync_job_apply_list&UserGuid=';
                let params = {};
                params.TYPE = self.itemGuid;
                body = body + self.token + '&Params=' + JSON.stringify(params);
                self.$store.dispatch('FETCH_APPLY_LIST', {body: body});
            },
            getParams: function (item) {
                let self = this;
                self.itemGuid = item.GUID;
                self.typeName = item.NAME;
            },
        },
        created: function (e) {
            let self = this;
            self.getParams(JSON.parse(self.item))
            self.getApplyList();
        }
    };</script>
<style scoped>
    .list {
        margin-left: 36px;
        margin-right: 36px;
        margin-top: 20px;
    }

    .div_item_top {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .select_true {
        color: #58D68D;
    }

    .select_false {
        color: #aaaaaa;
    }

    .logo {
        height: 100px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        border-width: 2px;
        border-color: #d9d9d9;
        /*background-color: #58D68D;*/
    }

    .div_time {
        flex: 1;
        width: 100px;
        justify-content: center;
        align-items: center;
        margin-left: 0px;
        margin-right: 0px;
    }

    .div_year {
        background-color: #d9d9d9;
    }

    .flex_left {
        margin-left: 20px;
        flex: 1;
        align-items: flex-start;
        justify-content: center;
    }

    .text_content {
        color: #bbbbbb;
        font-size: 24px;
        text-align: left;
        align-items: flex-start;
        margin-left: 20px;
    }

    .cell {
        border-bottom-width: 20px;
        border-color: #ebedef;
        background-color: #ffffff;
        border-radius: 4px;
    }

    .text_logo {
        font-size: 28px;
    }

    .text_tit {
        margin-left: 20px;
        font-size: 28px;
    }

    .text_mulit {
        font-size: 32px;
        lines: 2;
        text-overflow: ellipsis;
        margin-left: 28px;
        margin-right: 28px;
        margin-top: 16px;
        margin-bottom: 28px;
    }
</style>
