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
                    <date-logo :type="item.ISFINISH==1||item.ISAPPLED==5" :month="(new
                                Date(Date.parse(item.STARTTIME))).getMonth()+1" :year="(new
                                Date(Date.parse(item.STARTTIME))).getFullYear()"></date-logo>
                    <div class="flex_left">
                        <text class="text_mulit">{{item.APPLOYCONTENT}}</text>
                        <text class="text_tit">{{item.STARTTIME}} -- {{item.EXCEPTTIME}}</text>
                        <div style="flex-direction: row;">
                            <text :class="['text_tit', 'select_' + (item.ISAPPLED==0)]"
                            >{{item.ISAPPLED==5?'已驳回':item.ISAPPLEDNAME}}</text>
                            <text v-if="item.ISAPPLED!=5" :class="['text_tit', 'select_' + (item.ISFINISH==0)]"
                            >{{item.ISFINISH==0?'未完成':'已完成'}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
        <bottom-btn v-if="isSelected" class="cell_bottom_btn" txtLeft="新建" :left="clickLeft"></bottom-btn>
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
            ApplyHeader: require('../../components/header/apply-header.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            Label: require('../../components/label.vue'),
            DateLogo: require('../../components/cell-date-logo.vue'),
        },
        computed: {
            item () {
                if (this.$route && this.$route.params) {
//                    console.log(this.$route.params.item)
                    return this.$route.params.item
                }
                return ''
            },
            applyList(){
                return this.$store.getters.applyList
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
                isSelected: true,
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
                let params = {};
                params.TYPE = self.itemGuid;
                self.$store.dispatch('FETCH_NO_APPLY_LIST', {params: JSON.stringify(params)});
            },
            getApplyList: function () {
                let self = this;
                self.applyList = [];
                let params = {};
                params.TYPE = self.itemGuid;
                self.$store.dispatch('FETCH_APPLY_LIST', {params: JSON.stringify(params)});
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
//            console.log(self.$route)
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";
    .list {
    @include marginRow(36px);
        margin-top: 20px;
    }

    .div_item_top {
    @include paddingColumn;
    @include borderRadius;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .select_true {
        color: #58D68D;
    }

    .select_false {
        color: #aaaaaa;
    }

    .flex_left {
        margin-left: 20px;
        flex: 1;
        align-items: flex-start;
        justify-content: center;
    }

    .cell {
        border-bottom-width: 20px;
        border-color: #ebedef;
    }
    .text_tit {
    @include fontCommon;
    @include marginRow(20px);
        margin-top: 10px;
    }

    .text_mulit {
    @include fontLines;
    @include marginRow(20px);
    @include fontCommon(32px);
    }
    .cell_bottom_btn{
        @include paddingColumn(16px);
        @include paddingRow;
    }
</style>
