<template>
    <div class="div_root">
        <text class="txt_loading">令牌请求中</text>
        <text class="txt_loading">loading...</text>
    </div>
</template>

<script>
    var storage = weex.requireModule('storage');
    var event = weex.requireModule('event');
    var configModule = weex.requireModule('configModule');
    var navigator = weex.requireModule('navigator');

    export default{
        data(){
            return {
                baseUrl: '',
                nextUrl: '',
            }
        },
        methods: {
            next(){
                let self=this;
//                var params = {
//                    'url':  self.nextUrl,
//                    'animated' : 'true',
//                };
//                navigator.push(params, function () {});
//                event.openURL(self.nextUrl);
                self.$router.push(`/${self.nextUrl}`);
//                self.$router.push(`/memberOperator`);
            },
            getToken(){
                let self = this;
                var body = "grant_type=client_credentials";
                var header={
                    "content-type": "application/x-www-form-urlencoded",
                    "authorization": "Basic W1lZMzY1XTpAQE9UazVPVGs1ZkVBeE5UYzJOREl6TmpRNU5YeEFNRGxpTkdJek5EZGtOalUxWlRrMllqRm1PR1F4TjJNeE5EWTVPV1JrWlRsOFFIWXpMak11TldNeE56RXdNalI4UURNNE9qY3pPakE1T2pnMk9rTTFPa015T2pkQk9qWTRPamxET2pNMU9qQXhPamxGT2tWQ09qWkJPamsyT2pKRE9qazVPalF3T2tVMU9qSXk="
                };
                self.$store.dispatch('FETCH_GET_TOKEN', {
                    body: body,header, callback: function (data) {
                        if (data) {
                            self.next();
                        }else{
                            configModule.finish();
                        }
                    }
                });
            },
            computeTime(tokens){
                var time = Date.parse(new Date());
                var getTime = tokens.saveTime + (tokens.expiresIn-10*60)*1000;//令牌提前十分钟失效所以 -10*60；令牌是以分钟为单位的，所以 *1000
                console.log(time, getTime);
                if (time < getTime) {
                    return true;
                }
                return false;
            },
            isHaveToken(tokens){
                let self = this;
                if (tokens.hasOwnProperty("accessToken") && tokens.accessToken && self.computeTime(tokens)) {
                    console.log("push: ");
                    self.next();
                } else {
                    console.log("getToken");
                    self.getToken();
                }
            },
            getStorage(){
                let self = this;
                var tokens;
                storage.getItem("sy_token", function (e) {
                    if (e.result == "success" && e.data != "undefind") {
                        tokens = JSON.parse(e.data);
                    } else {
                        tokens = {};
                    }
                    console.log(tokens);
                    self.isHaveToken(tokens)
                })
            },
            getParams(){
                let self = this;
//                console.log(self.$getConfig())
                let bundleUrl = "http://192.168.100.120:8888/weex/getToken.js?path=memberOperator&guid=100084096";
//             let bundleUrl = self.$getConfig().bundleUrl;
                let urlArr = bundleUrl.split('?');
                self.baseUrl = urlArr[0].split('/').slice(0, -1).join('/');
                let paramArr = urlArr[1].split('&');
                var params={};
                for(var i=1;i<paramArr.length;i++){
                    var itemArr=paramArr[i].split('=');
                    params[itemArr[0]]=itemArr[1];
//                    console.log(params)
                }
                self.nextUrl = `${paramArr[0].split('=')[1]}/${JSON.stringify(params)}`;
                console.log(self.nextUrl)
            },
        },
        created: function (e) {
            console.log("created")
            let self = this;
            self.getParams();
            self.getStorage();
        },
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../../style/mixin";

    .div_root {
        justify-content: center;
        align-items: center;
        opacity: 0.3;
    }

    .txt_loading {
        text-align: center;
        margin-top: 10px;
        @include fontCommon(36px);
    }

</style>