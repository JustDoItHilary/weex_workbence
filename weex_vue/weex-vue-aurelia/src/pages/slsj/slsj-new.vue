<template>
    <div append="node" class="bg">
        <scroller>
            <div v-for="(item,index) in slsjNews" style="margin-top: 8px;background-color: #fff;">
                <slsj-item ref="itemref" :item="item" :index="index" :btnHeight="btnHeight" :special="slsjSpecial"
                           @showItem="setItemShowed">
                </slsj-item>
            </div>
        </scroller>
        <bottom-btn txtLeft="提交"
                    :btnHeight="btnHeight+'px'"
                    :left="clickLeft"
                    :style="{ marginBottom: marginBottom+'px' }"></bottom-btn>
    </div>
</template>

<script>
    let stream = weex.requireModule('stream');
    let configModule = weex.requireModule('configModule');
    let modal = weex.requireModule('modal');
    let picker = weex.requireModule('picker');
    let dom = weex.requireModule('dom');
    let myModule = weex.requireModule('myModule');

    module.exports = {
        components: {
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            SlsjItem: require('../../components/slsj/slsj-item.vue'),
        },
        data(){
            return {
                // 布局的高度、宽度；底部按钮的高度、宽度；距离下边缘的高度
                btnHeight: 60,
                marginBottom: 20,
                baseUrl: '',
                nailDamageList: [],
                //检查表现-手足问题-灰指甲的aid，当选择了灰指甲手足模型必选一个，是固定值，非动态获取
                specialModelId: '697b57d56572695ad84882a01f54f49c',
                // 标题：手足模型的 qid,为了判定是否选中手足模型的其中一个
                modelqId: '529093b335d3232fd989294d1b043471',
                modelList: [],
                slsjSpecial: {
                    aIndex: 0,//手足问题 a-index
                    qIndex: 0,//手足问题 q-index
                    modelIndex: 0,//手足模型 q-index
                },
            }
        },
        computed: {
            slsjNews(){
                this.setList(this.$store.getters.slsjList);
                return this.$store.getters.slsjList;
            }
        },
        methods: {
            setList(data){
                let self = this;
                for (let j = 0; j < data.length; j++) {
                    let item = data[j];
                    if (self.slsjSpecial.modelIndex == '' && item.id == self.modelqId) {
                        self.slsjSpecial.modelIndex = j;
                    }
                    if (item.data !== null && item.data.length > 0) {
                        for (let i = 0; i < item.data.length; i++) {
                            let ans = item.data[i];
                            if (self.slsjSpecial.aIndex == '' && ans.special == 1) {
                                self.slsjSpecial.aIndex = i - 1;
                                self.slsjSpecial.qIndex = j;
                                self.slsjSpecial.ans = item.data[i - 1];
                            }
                        }
                    }
                }
            },
            clickLeft: function (e) {
                let self = this;
                let selectedList = [];
                let proList = [];
                for (let i = 0; i < self.slsjNews.length; i++) {
                    let item = self.slsjNews[i];
                    for (let j = 0; j < item.data.length; j++) {
                        let ans = item.data[j];
                        if (ans.selected == 1) {
                            selectedList.push(ans);
                            if (ans.special == 1) {
                                proList.push(ans);
                            }
                        }
                    }
                }
                console.log("selectedList: ",selectedList.length);
                console.log("prolist: ",proList.length);
                let qIndex = self.slsjSpecial.qIndex;
                //手足问题至少选一个
                if (proList.length > 0) {
                    for (let i = 0; i < proList.length; i++) {
                        //手足问题如果选择了灰指甲，手足模型必选一个
                        if (proList[i].aid == self.specialModelId) {
                            for (let j = 0; j < selectedList.length; j++) {
                                if (selectedList[j].qid == self.modelqId) {
                                    return self.checkFinish(selectedList, proList);
                                }
                            }
                            self.slsjNews[self.slsjSpecial.modelIndex].showed = true;
                            return self.$refs.itemref[self.slsjSpecial.modelIndex].scroll(1);
                        }
                    }
                    return self.checkFinish(selectedList, proList);
                } else {
                    self.slsjNews[qIndex].showed = true;
                    self.$nextTick(function () {
                        self.$refs.itemref[qIndex].scroll(0);
                    })
                }
            },
            checkFinish: function (selectedList, proList) {
                let self = this;
                //判断每一个问题是否都完善了信息，未完善弹框提示
                let isFinish;
                for (let j = 0; j < self.slsjNews.length; j++) {
                    isFinish = false;
                    for (let i = 0; i < selectedList.length; i++) {
                        if (selectedList[i].qid == self.slsjNews[j].id) {
                            isFinish = true;
                            break;
                        }
                    }
//                    if (!isFinish) {
//                        return myModule.printConfirm('顾客信息不完整,是否继续提交?', function (ret) {
////                             点击确定返回 1，点击取消返回 0
//                            if (ret.data == 1) {
//                                self.newInfo(selectedList, proList);
//                            }
//                        });
//                    }
                }
                return self.newInfo(selectedList, proList);
            },
            newInfo: function (selectedList, proList) {
                let self = this;
                let queryType;
                let userGuid;
                let contactId;
                let nailUrl;
                 queryType='saveContactFileData';
                userGuid = 'NTV8QGM4YjQwZGVmOTNjNjYyNDNhMjc1ZmI4MjkzZmVkNGNkfEBjYjMzZDFiMjY2Y2U5YjhhOTE3YTc3MDhlOThkYmIyOHxAMTAuMS4yfEAyMDE3MDgxN3xAUm9tZW5zLlNMU0o-';
                 contactId='b7b06192a00f5fb8abb19047fa7d675b';
                 nailUrl=[[],[],[],[],[]];
//                //获取提交时需要的参数
//                configModule.GetUploadPhotoPara(function (ret) {
//                    queryType = ret.queryType;
//                    userGuid = ret.userGuid;
//                    contactId = ret.contactID;
//                    nailUrl = ret.nailUrl;
                    //拼接手足问题选择结果
                    let handAndFootPro = '';
                    for (let item of proList) {
                        if (item.atype == 1) {
                            handAndFootPro = handAndFootPro + '/' + item.aname;
                        } else if (item.atype == 2 && item.value != "") {
                            handAndFootPro = handAndFootPro + '/' + item.value;
                        }
                    }
                    // console.log('handAndFootPro: ',handAndFootPro.substring(1));
                    let params = {};
                    params.ContactId = contactId;
                    params.NailUrl = nailUrl;
                    params.FileData = selectedList;
                    params.Remark = handAndFootPro.substring(1);
                    let body = 'QueryType=' + queryType + '&UserGuid=' + userGuid + '&Params=' + JSON.stringify(params);
                    // modal.alert({'message':body,'doation':1});
                    console.log('BODY: ', body);
                    self.$store.dispatch('FETCH_SLSJ_NEW', {
                        body: body, callback: function (retdata) {
                            console.log(retdata)
                            if (retdata !== null) {
                                configModule.complete(retdata);
                            }
                        }
                    });
//                });
            },
            setItemShowed(index){
                let self = this;
                if (index == 1) {
                    self.slsjNews[self.slsjSpecial.modelIndex].showed = true;
                    self.slsjNews[self.slsjSpecial.modelIndex].warning = true;
                    self.$nextTick(function () {
                        self.$refs.itemref[self.slsjSpecial.modelIndex].scroll(1);
                    })
                }
            },
            setMeasure: function () {
                let self = this;
                configModule.getContainerHeight(function (params) {
                    // let ratio = this.$getConfig().env.devHeight /(2*750);
                    //从本地获取按钮的高度占布局高度的比值
                    let ratio = params.ratio;
                    if (ratio !== null) {
                        //由于是横屏显示，所以高度为设备的宽度
                        self.btnHeight = 750 * ratio;
                        //通过计算边距占布局高度的比值来获取边距的值
                        self.marginBottom = 8 * ratio / 44 * 750;
                        // require('@weex-module/myModule').printLog(this.devHeight);
                    }
                }.bind(this));
            }
        },
        created: function (e) {
            let self = this;
            self.baseUrl = 'http://192.168.100.120:8888/weex';
//            self.baseUrl = self.$getConfig().bundleUrl.split('?')[0].split('/').slice(0, -1).join('/') || '';
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
//            self.setMeasure();
            self.$store.dispatch('FETCH_SLSJ_TEMPFILE')
        }
    };</script>
<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";
    .bg{
        background-color: $fc;
    }
</style>
