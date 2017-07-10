<template>
    <div append="node">
        <apply-header tit="添加审批人员" :done="clickDone" :imgUrl="imgUrl"></apply-header>
        <div class="div_search">
            <input class="txt_center input" type="text" placeholder="搜索" @input="input" :value="searchMess"/>
        </div>
        <list class="list">
            <cell v-for="item in memberList" class="cell" @click="clickMember(item)">
                <div class="div_logo">
                    <text class="text_logo">{{item.fir}}</text>
                </div>
                <div class="div_member">
                    <div style="flex:1;">
                        <text class="text_member">{{item.USERNAME}}</text>
                    </div>
                    <div class="div_select" v-if="getSelected(item)">
                        <image class="img_select" :src="baseUrl+imgUrl"></image>
                    </div>
                </div>
            </cell>
        </list>
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
            ApplyHeader: require('../../components/apply-header.vue')
        },
        computed: {
            reader () {
                if (this.$route && this.$route.params) {
                    return this.$route.params.reader
                }
                return ''
            },
            baseUrl(){
                return this.$store.getters.applyBaseUrl
            },
            memberList(){
                return this.$store.getters.applyMember
            },
            token(){
                return this.$store.getters.applyGetToken
            }
        },
        props: {},
        data(){
            return {
                devHeight: 960,
                actionBarHeight: 112,
                imgUrl: '/drawable/ic_done_white_48dp.png',
                imgBackUrl: '/drawable/ic_back_white_48dp.png',
                imgSearchUrl: '/drawable/ic_search_48pt.png',
                memberMess: '',
                selectedList: [],
                selectedMess: '',
                searchMess: '',
                readerType: 1
            }
        },
        methods: {
            //是否选中
            getSelected: function (item) {
                let self = this;
                for (let i = 0; i < self.selectedList.length; i++) {
                    if (self.selectedList[i].ID == item.ID) {
                        return true;
                    }
                }
                return false;
            },
            clickDone: function (e) {
                let self = this;
                //选择结果 - 未选择的话需要将 state 中的数据清空
                this.$store.commit('SET_READER', {type: self.readerType, reader: self.selectedList});// reader 与后面获取值得键名一致
                self.back();
            },
            clickClose: function () {
                let self = this;
                self.back();
            },
            clickMember: function (item) {
                let self = this;
                if (self.readerType == 0) {
                    if (self.selectedList.length > 0 && self.selectedList[0].ID == item.ID) {
                        self.selectedList = [];
                    } else {
                        self.selectedList = [];
                        self.selectedList.push(item);
                    }
                } else if (self.readerType == 1) {
                    let selected = false;
                    for (let i = 0; i < self.selectedList.length; i++) {
                        if (item.ID == self.selectedList[i].ID) {
                            self.selectedList.splice(i, 1);
                            selected = true;
                            break;
                        }
                    }
                    if (!selected) {
                        self.selectedList.push(item);
                    }
                }
            },
            input: function (e) {
                let self = this;
                self.searchMess = e.value;
                self.getMemberList(self.searchMess);
            },
            getMemberList: function (search) {
                let self = this;
                let body = 'QueryType=getUserListFroWeex&UserGuid=';
                let params = {};
                params.SEARCH = search;
                body = body + self.token + '&Params=' + JSON.stringify(params);
                self.$store.dispatch('FETCH_APPLY_READER', {body: body});// reader 与后面获取值得键名一致

            },
            getParams: function (params) {
                let self = this;
                self.readerType = params.type;
                if (self.readerType == 0) {
                    self.selectedList = self.$store.getters.applyReader.approveList;
                } else if (self.readerType == 1) {
                    self.selectedList = self.$store.getters.applyReader.noticeList;
                }
//                modal.alert({message:JSON.stringify(self.selectedList),duration:1})
            }
        },
        created: function () {
            let self = this;
            // self.setMeasure();
            if (self.reader) {
                self.getParams(JSON.parse(self.reader));
            }
            self.getMemberList('');
        }
    };</script>

<style scoped>
    .div_search {
        flex-direction: row;
    }

    .input {
        height: 64px;
        flex: 1;
        background-color: #ebedef;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 10px;
        margin-left: 36px;
        margin-right: 36px;
    }

    .txt_center {
        height: 48px;
        text-align: center;
        font-weight: bold;
        font-size: 28px;
    }

    .list {
        margin-left: 40px;
        margin-right: 40px;
        justify-content: center;
        margin-bottom: 10px;
    }

    .cell {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .div_logo {
        height: 80px;
        width: 80px;
        align-items: center;
        justify-content: center;
        background-color: #58D68D;
        border-radius: 50px;
    }

    .text_logo {
        font-size: 48px;
        color: #ffffff;
    }

    .text_member {
        font-size: 36px;
        margin-left: 16px;
        margin-top: 28px;
        margin-bottom: 20px;
    }

    .div_member {
        flex: 1;
        flex-direction: row;
        margin-left: 24px;
        border-bottom-width: 1px;
        border-color: #bbbbbb;
        align-items: center;
        justify-content: center;
    }

    .div_select {
        align-items: center;
        justify-content: center;
    }

    .img_select {
        width: 48px;
        height: 48px;
        border-radius: 50px;
        background-color: #58D68D;
    }
</style>
