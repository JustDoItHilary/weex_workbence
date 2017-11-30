<template>
    <div append="node">
        <apply-header tit="添加审核人员" :done="clickDone" :imgUrl="imgUrl"></apply-header>
        <div v-ratio="ratio"
             class="div_search">
            <input v-ratio="ratio"
                   class="txt_center input"
                   type="text"
                   placeholder="搜索"
                   @input="input"
                   :value="searchMess"/>
        </div>
        <list v-ratio="ratio" class="list">
            <cell  v-ratio="ratio"
                   v-for="item in empList"
                   class="cell"
                   @click="clickMember(item)">
                <div  v-ratio="ratio"
                      class="div_logo">
                    <text v-ratio="ratio"
                          class="text_logo">{{item.fir}}</text>
                </div>
                <div v-ratio="ratio" class="div_member">
                    <!--<div v-ratio="ratio">-->
                        <text v-ratio="ratio" class="text_member" style="flex:1;">{{item.Name}}</text>
                    <!--</div>-->
                    <div v-ratio="ratio" class="div_select" v-if="getSelected(item)">
                        <image v-ratio="ratio" class="img_select" :src="baseUrl+imgUrl"></image>
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
            ApplyHeader: require('../../components/header/apply-header.vue')
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            },
            baseUrl(){
                return this.$store.getters.baseUrl
            },
            empList(){
                if (this.searchMess) {
                    return this.searchMemberList(this.$store.getters.getEmpList)
                }
                return this.$store.getters.getEmpList;
            },
            token(){
                return this.$store.getters.selfToken
            },
        },
        props: {},
        data(){
            return {
                imgUrl: '/drawable/ic_done_white_48dp.png',
                imgBackUrl: '/drawable/ic_back_white_48dp.png',
                imgSearchUrl: '/drawable/ic_search_48pt.png',
                selectedList: [],
                searchMess: '',
            }
        },
        methods: {
            //是否选中
            getSelected: function (item) {
                let self = this;
                for (let i = 0; i < self.selectedList.length; i++) {
                    if (self.selectedList[i].Guid == item.Guid) {
                        return true;
                    }
                }
                return false;
            },
            clickDone: function (e) {
                let self = this;
                //选择结果 - 未选择的话需要将 state 中的数据清空
//                this.$store.commit('SET_READER', {reader: self.selectedList});// reader 与后面获取值得键名一致
                this.$router.back();
            },
//            clickClose: function () {
//                let self = this;
//                console.log("close: ",self.baseList)
//                //选择结果 - 未选择的话需要将 state 中的数据清空
//                this.$store.commit('SET_READER', { reader: self.baseList});// reader 与后面获取值得键名一致
//                self.back();
//            },
            clickMember: function (item) {
                let self = this;
                let selected = false;
                for (let i = 0; i < self.selectedList.length; i++) {
                    if (item.Guid == self.selectedList[i].Guid) {
                        self.selectedList.splice(i, 1);
                        selected = true;
                        break;
                    }
                }
                if (!selected) {
                    self.selectedList.push(item);
                }
            },
            input: function (e) {
                let self = this;
                self.searchMess = e.value;
                console.log("input: ", self.searchMess)
            },
            searchMemberList(list){
                let self = this;
                console.log(self.searchMess)
                let readerList = [];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].Name.indexOf(self.searchMess) > -1) {
                        readerList.push(list[i])
                    }
                }
                return readerList;
            },
            getMemberList: function (search) {
                let self = this;
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var startDate = self.formatDate(new Date(year, month, 1), 'yyyy-MM-dd');
                var endDate = self.formatDate(date, 'yyyy-MM-dd');
                startDate = encodeURIComponent(startDate);
                endDate = encodeURIComponent(endDate);
                var body = 'code=' + self.$store.getters.getUserPlatformCode + '&startDate=' + startDate + '&endDate=' + endDate + '&type=1&cros=';
                self.$store.dispatch('FETCH_REP_EMP', {body: body});// reader 与后面获取值得键名一致
            },
        },
        created: function () {
            let self = this;
            self.getMemberList();
            self.selectedList = self.$store.getters.getReaderList;
        }
    };</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_search {
        flex-direction: row;
    }

    .input {
        height: 32px;
        flex: 1;
        background-color: #ebedef;
        align-items: center;
        justify-content: center;
        @include marginColumn($cl);
        @include marginRow($bl);
        @include borderRadius();
    }

    .txt_center {
        height: $ls;
        text-align: center;
        font-weight: bold;
        @include fontCommon($cs);
    }

    .list {
        @include marginRow($bl);
        justify-content: center;
        @include marginColumn($sl);
    }

    .cell {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        @include paddingColumn($sl);
        @include paddingRow($bl);
    }

    .div_logo {
        @include wh(40px,40px);
        align-items: center;
        justify-content: center;
        background-color: $colorCommon;
        border-radius: 50px;
    }

    .text_logo {
        font-size: 18px;
        color: #ffffff;
        font-weight: bold;
    }

    .text_member {
        font-size: $bs;
        margin-left: $cl;
        margin-top: $bl;
        margin-bottom: $cl;
    }

    .div_member {
        flex: 1;
        flex-direction: row;
        margin-left: $cl;
        border-bottom-width: 1px;
        border-color: #bbbbbb;
        align-items: center;
        justify-content: center;
        @include marginColumn($sl);
    }

    .div_select {
        align-items: center;
        justify-content: center;
    }

    .img_select {
        @include wh();
        border-radius: $bRadius;
        background-color: $colorCommon;
    }
</style>
