<template>
    <div style="background-color:#ebedef;" append="node">
        <apply-header tit="工作申请" :close="clickClose"></apply-header>
        <list class="list">
            <cell v-for="item in applyTypes">
                <div class="div_card" @click="clickItem(item)">
                    <div class="logo">
                        <image class="img_center" :src="item.COVER"></image>
                    </div>
                    <div class="flex_left">
                        <text class="text_tit">{{item.NAME}}申请</text>
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
            applyTypes(){
                return this.$store.getters.applyType
            }
        },
        props: {},
        data(){
            return {
                devHeight: 990,
                actionBarHeight: 100,
                imgBackUrl: '',
                buildingImgUrl:'/drawable/building.png',
                workOverImgUrl:'/drawable/workOver.png',
                baseUrl: '',
                imgUrl: '',
                token: ''
            }
        },
        methods: {
            getImgUrl:function (guid) {
                let self=this;
                if(guid=='e35ac823-5a4e-11e7-af47-ec388f6f5b1d'){
                    return self.buildingImgUrl;
                }else {
                    return self.workOverImgUrl;
                }
            },
            //关闭界面，退出
            clickClose: function () {
                console.log('CLOSE')
                configModule.finish();
            },
            clickItem: function (item) {
                var self = this;
                let params = {};
                params.GUID = item.GUID;
                params.NAME = item.NAME;
                self.jump(`/applyList/${JSON.stringify(params)}`);
            },
            getData: function () {
                let self = this;
                var body = 'QueryType=sync_job_type&UserGuid=';
                self.token = '@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--';
//                configModule.getUrl('', function (ret) {
//                    self.token = ret.split('=')[1];
                    self.$store.commit('SET_TOKEN', {token: self.token});
                    body = body + self.token + '&Params={}';
                    self.$store.dispatch('FETCH_APPLY_TYPE', {body: body});
//                });
            },
        },
        created: function (e) {
            var self = this;
//            var bundleUrl = self.$getConfig().bundleUrl || '';
            var bundleUrl = 'http://192.168.100.120:8888/weex/applyType.js';
//            var bundleUrl = 'http://192.168.1.103:8888/weex/applyType.js';
            self.baseUrl = bundleUrl.split('/').slice(0, -1).join('/');
            self.$store.commit('SET_APPLY_URL', {url: self.baseUrl});
            self.getData();
        }
    };</script>

<style scoped>
    .list {
        margin-left: 36px;
        margin-right: 36px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .div_card {
        flex-direction: row;
        height: 200px;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        margin-top: 20px;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .logo {
        height: 100px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 36px;
        border-radius: 12px;
        border-width: 2px;
        border-color: #d9d9d9;
        background-color: #58D68D;
    }

    .img_center {
        width: 96px;
        height: 96px;
    }

    .flex_left {
        margin: 10px;
        flex: 1;
        text-overflow: ellipsis;
    }

    .text_tit {
        height: 50px;
        margin-left: 20px;
        font-size: 32px;
    }

    .text_content {
        color: #bbbbbb;
        overflow: hidden;
        text-overflow: ellipsis;
        lines: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        /*font-weight: normal;*/
        /*font-size: 24px;*/
        /*text-align: left;*/
        /*align-items: flex-start;*/
        /*margin-left: 20px;*/
    }
</style>
