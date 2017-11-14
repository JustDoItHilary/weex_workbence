<template>
    <div class="root">
        <app-header class="header" :close="clickClose"></app-header>
        <image class="img_error" :src="imgUrl"></image>
        <div class="div_txt" @click="reload">
            <text class="txt">重新加载</text>
        </div>
    </div>
</template>

<script>
    var modal = weex.requireModule('modal');
    var navigator = weex.requireModule('navigator');
    const configModule = weex.requireModule('configModule');

    export default{
        components: {
            appHeader: require('../../components/header/apply-header.vue')
        },
        data(){
            return {
//                imgUrl:'http://192.168.100.120:8888/weex/drawable/loading_404.png',
//                imgUrl:'assets://dist/ic_launcher',//不可用
                imgUrl: 'local:///net_error',//可用
//                imgUrl:'mipmap://ic_launcher',//可用
                url: ''
            }
        },
        methods: {
            reload(){
                let params = {
                    url: this.url,
                    animated: true
                };
                navigator.push(params)
            },
            clickClose(){
                configModule.finish();
            }
        },
        created: function (e) {
            let self = this;
            var bundleUrl = self.$getConfig().bundleUrl || '';
//            configModule.printLog(bundleUrl)
//            modal.alert({message:bundleUrl,duration:0.3})
//            var bundleUrl = 'file://assert/dist/error.js?url=http://192.168.100.120:8888/weex/apply-type.js';
            self.url = bundleUrl.split('?')[1].split('=')[1];
            let baseUrl = self.url.split('/').slice(0, -1).join('/');
            self.$store.commit('SET_BASE_URL', {url: baseUrl});
            console.log('URL: ', self.url)
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .root {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        position: fixed;
    }

    .header {
        left: 0;
        right: 0;
        top: 0;
        position: fixed;
    }

    .img_error {
        width: 320px;
        height: 320px;
    }

    .div_txt {
        border-width: 2px;
        border-color: $blue;
        border-radius: 50px;
        margin-top: 20px;
        @include paddingRow(36px);
        @include paddingColumn(8px);
    }

    .txt {
        color: $blue
    }

</style>