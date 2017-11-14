<template>
    <div>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');

    module.exports = {
        data(){
            return {
                baseUrl: ""
            }
        },
        methods: {
            openPages: function (par) {
                let self = this;
                let obj = {};
                let key = "";
                for (let i = 0; i < par.length; i++) {
                    obj[par[i].split("=")[0]] = par[i].split("=")[1];
                    if (par[i].split("=")[0] == "KEY") {
                        key = par[i].split("=")[1];
                    }
                }
                if (key == "APPLY") {
                    let params = {};
                    params.TYPE = 2;
                    params.GUID = obj.APPLYGUID;
                    params.NAME = "工作";
//                    console.log("params",JSON.stringify(params))
                    self.jump(`/application/${JSON.stringify(params)}`);
                }
            },
            getParams:function () {
                let self = this;
//                let bundleUrl = "http://192.168.100.120:8888/weex/ww-details.js?KEY=APPLY&APPLYGUID=6296f4a1d198fe777f066f2340bf95f9&ACTION=APPROVE";
            let bundleUrl = self.$getConfig().bundleUrl;
                let paramsArr = bundleUrl.split("?");
                self.baseUrl = paramsArr[0].split('/').slice(0, -1).join('/') || '';
                self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
                self.openPages(paramsArr[1].split("&"));
            }
        },
//        created: function () {
//            let self = this;
//            let bundleUrl = "http://192.168.100.120:8888/weex/ww-details.js?KEY=APPLY&APPLYGUID=6296f4a1d198fe777f066f2340bf95f9&ACTION=APPROVE";
////            let bundleUrl = self.$getConfig().bundleUrl;
//            let paramsArr = bundleUrl.split("?");
//            self.baseUrl = paramsArr[0].split('/').slice(0, -1).join('/') || '';
//            self.openPages(paramsArr[1].split("&"));
//        },
        beforeRouteEnter:function (to,from,next) {
            next(function (vm) {
                if(from.name!=null){
                    console.log("from",from);
                    configModule.finish();
                }else {
                    vm.getParams();
                }
            });
        },
//        beforeRouteEnter: function (to, from, next) {
//            next(function () {
//                console.log("from",from)
//                if(from.name!=null){
//                    console.log("finish")
////                    configModule.finish();
//                }
//            });
////            next(vm => {
////                if (from.name != null) {
////                            configModule.finish();
////                }
////            });
//        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import '../../style/mixin';

</style>