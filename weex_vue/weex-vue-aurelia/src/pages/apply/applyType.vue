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
    const global = weex.requireModule('globalEvent');

    module.exports = {
        components: {
            ApplyHeader: require('../../components/header/apply-header.vue')
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
                buildingImgUrl: '/drawable/building.png',
                workOverImgUrl: '/drawable/workOver.png',
                baseUrl: '',
                imgUrl: '',
                token: ''
            }
        },
        methods: {
            getImgUrl: function (guid) {
                let self = this;
                if (guid == 'e35ac823-5a4e-11e7-af47-ec388f6f5b1d') {
                    return self.buildingImgUrl;
                } else {
                    return self.workOverImgUrl;
                }
            },
            //关闭界面，退出
            clickClose: function () {
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
////                var body = 'QueryType=sync_job_type&UserGuid=';
////                body = body + self.token + '&Params={}';
                self.token = '@@ODg4ODg4fEA1NzllZjJlMGVlNWY2fEBjNGMxMDkyOTU5M2NiZWEzZTA3YWE5MTMxYzFjN2U1Mg--';
//                configModule.getUrl('', function (ret) {
//                    self.token = ret.split('=')[1];
                self.$store.commit('SET_TOKEN', {token: self.token});
                self.$store.dispatch('FETCH_APPLY_TYPE', {params:{}});
//                });
            },
        },
        created: function (e) {
            var self = this;
            var bundleUrl = self.$getConfig().bundleUrl || '';
//            var bundleUrl = 'http://192.168.100.120:8888/weex/applyType.js';
//            var bundleUrl = 'http://192.168.1.104:8888/weex/applyType.js';
            self.baseUrl = bundleUrl.split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
            self.getData();
        },
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                if (from.name == null) {
                    global.addEventListener("interceptBackEvent", function (result) {
//                    modal.alert({message:'GLOBAL',duration:1});
                        if (vm.$route.name == "home") {
//                            modal.alert({message: "finish-applyType", duration: 1});
                            configModule.finish();
                        } else {
//                            modal.alert({message: "back-applyType", duration: 1});
                            vm.back();
                        }
                    });
                }
            });
        }
    };</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .list {
    @include marginRow(36px);
    @include marginColumn;
    }

    .div_card {
        flex-direction: row;
        height: 200px;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        margin-top: 20px;
        margin-bottom: 10px;
    @include borderRadius;
    }

    .logo {
    @include borderRadius(12px);
        height: 100px;
        justify-content: center;
        align-items: center;
        margin-left: 36px;
        background-color:$colorCommon;
    }

    .img_center {
        width: 96px;
        height: 96px;
    }

    .flex_left {
        margin: 10px;
        flex: 1;
    @include fontLines;
    }

    .text_tit {
        height: 50px;
        margin-left: 20px;
        font-size: 32px;
    }

</style>
