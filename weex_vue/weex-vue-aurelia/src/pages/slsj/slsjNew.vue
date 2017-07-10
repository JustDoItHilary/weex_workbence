<template>
    <div append="node"
         :style="{background: bgColor}">
        <div class="div_loading"
             v-if="false">
            <image class="img_loading" :src="baseUrl+loadingUrl"></image>
        </div>
        <scroller class="list">
            <div v-for="(item,index) in slsjNews">
                <div style="height:8px;background-color:rgb(242,244,246);"></div>
                <!-- 大标题 -->
                <div class="div_tit"
                     @click="clickItem(item)">
                    <div class="div_lab"
                         :style="{ height: btnHeight+'px'}"></div>
                    <text class="text_tit">{{item.name}}</text>
                    <div class="div_img_open">
                        <image style="height: 16px;width: 16px;" :src="baseUrl+imgKeyboardArrowDownBlackUrl"></image>
                    </div>
                </div>
                <div v-for="(choice,ansIndex) in item.data"
                     v-if="item.showed"
                     style="margin-bottom: 5px;">
                    <!-- 复选框 -->
                    <div class="div_select"
                         v-if="choice.atype==1||choice.atype==0"
                         @click="clickCheck(choice,'item'+ansIndex)">
                        <div :class="['div_check_' + (choice.selected==1)]">
                            <!-- <img class="img_check" src="{{baseUrl+imgUrl}}" if="{{choice.selected==1}}"> -->
                        </div>
                        <div class="div_text">
                            <text class="text_value">{{choice.aname}}</text>
                        </div>
                    </div>
                    <!-- 选择 and 输入 -->
                    <div class="div_select"
                         v-if="choice.atype==2">
                        <div :class="['div_check_' + (choice.selected==1)]"
                             :choice="choice"
                             @click="clickCheck(choice,ansIndex)">
                        </div>
                        <text class="text_value">{{choice.aname}}</text>
                        <div class="div_input">
                            <input class="input_base" type="text" :value="choice.value" :choice="choice"
                                   @input="input($event,choice)" @blur="blur(choice)"/>
                        </div>
                    </div>
                    <!-- 文本 and 输入 -->
                    <div class="div_select"
                         v-if="choice.atype==4">
                        <text class="text_value">{{choice.aname}}</text>
                        <div class="div_input" :ref="ansIndex">
                            <input class="input_base" type="text" :value="choice.value" :choice="choice"
                                   @input="input($event,choice)" @blur="blur(choice)"/>
                        </div>
                    </div>
                    <!-- 文本 and 输入 and 文本-->
                    <div class="div_select"
                         v-if="choice.atype==3">
                        <text class="text_value">{{choice.aname[0]}}</text>
                        <div class="div_input">
                            <input class="input_base" type="text" :value="choice.value" :choice="choice"
                                   @input="input($event,choice)" @blur="blur(choice)"/>
                        </div>
                        <text class="text_value">{{choice.aname[1]}}</text>
                    </div>
                    <!-- 文本 -->
                    <div class="div_select"
                         v-if="choice.atype==5">
                        <text class="text_value">{{choice.aname}}</text>
                        <text class="text_value" ref="mark"
                              style="color:#ff0000;"
                              v-if="setRequired(ansIndex,index)"
                        >（必选）
                        </text>
                    </div>
                    <!-- 滚动选择 -->
                    <div class="div_select"
                         v-if="choice.atype==6">
                        <text class="text_value">{{choice.aname}}</text>
                        <div class="div_picker"
                             @click="clickPick(choice)">
                            <text class="text_picker">{{getPickData(choice)}}</text>
                            <div class="div_img_pull">
                                <image class="img_arrowdrop"
                                       :src="baseUrl+imgArrowDropUrl"></image>
                            </div>
                        </div>
                    </div>
                    <div class="div_select"
                         style="justify-content:flex-end;"
                         v-if="choice.atype==7"
                         @click="clickCloseItem(item)">
                        <text class="text_close">收起</text>
                    </div>
                </div>
            </div>
        </scroller>
        <!--<bottom-btn txtLeft="提交"-->
        <!--btnColor="#FFF"-->
        <!--bgColor="rgb(2, 136, 209)"-->
        <!--:btnMargin="marginBottom+'px'"-->
        <!--:btnHeight="btnHeight+'px'"-->
        <!--txtSize="18px"-->
        <!--btnRadius="5px"-->
        <!--:left="clickLeft"></bottom-btn>-->

        <div ref="bottom" id="bottom"
             style="flex-direction:row;justify-content:center;align-items:center;">
            <div class="div_bottom"
                 :style="{ height: btnHeight+'px', marginBottom: marginBottom+'px' }"
                 @click="clickLeft">
                <text class="text_bottom">提交</text>
            </div>
        </div>
    </div>
</template>

<script>
    const stream = weex.requireModule('stream');
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');
    const picker = weex.requireModule('picker');
    const dom = weex.requireModule('dom');
    const myModule = weex.requireModule('myModule');
    const apis = require('../common/api');

    module.exports = {
        components: {
            BottomBtn: require('../../components/bottom-btn.vue'),
        },
        data(){
            return {
                devHeight: 960,// 布局的高度、宽度；底部按钮的高度、宽度；距离下边缘的高度
                devWidth: 500,
                btnHeight: 60,
                btnWidth: 240,
                marginBottom: 20,
                bgColor: 'rgb(242,244,246)',
                imgUrl: '/drawable/ic_done_black_48dp.png',
                imgArrowDropUrl: '/drawable/ic_arrow_drop_down_white_48dp.png',
                imgKeyboardArrowDownBlackUrl: '/drawable/arrow_down_grey_48dp.png',
                loadingUrl: '/drawable/slsj-loading.gif',
                baseUrl: '',
                sendUrl: '',
                selectedList: [],
                nailDamageList: [],
                nailDamageHint: '-请选择-',
                inputdate: '',
                handAndFootProList: [],
                warn: false,
                showItem: false,
                itemId: '',
                //检查表现-手足问题-灰指甲的aid，当选择了灰指甲手足模型必选一个，是固定值，非动态获取
                specialModelId: '697b57d56572695ad84882a01f54f49c',
                modelList: [],
                slsjNews: [],
                slsjSpecial: {
                    aIndex: '',
                    qIndex: '',
                    modelIndex: ''
                },
                pickerList: [],
            }
        },
        props: {},
        computed: {},
        methods: {
            setRequired: function (ansIndex, index) {
                const self = this;
                if (self.slsjSpecial.qIndex == index) {
                    if (self.slsjSpecial.aIndex == ansIndex) {
                        return true;
                    }
                    if (self.handAndFootProList.length > 0) {
                        for (const i = 0; i < self.handAndFootProList.length; i++) {
                            if (self.handAndFootProList[i].aid == self.specialModelId && self.slsjSpecial.modelIndex == ansIndex) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
                return false;
            },
            getPickData(choice){
                const self = this;
                if (choice.value !== '') {
                    if (choice.content) {
                        return choice.content.split('|@')[choice.value];
                    } else {
                        return self.nailDamageList[choice.value];
                    }
                } else {
                    return '-请选择-';
                }
            },
            clickCloseItem: function (item) {
                const self = this;
                item.showed = false;
            },
            clickItem: function (item) {
                const self = this;
                item.showed = !item.showed
            },
            clickCheck: function (choice, ansIndex) {
                const self = this;
                console.log(choice)
                self.warn = false;
                if (choice.selected == 1) {
                    choice.selected = 0;
                    if (self.selectedList !== null && self.selectedList.length > 0) {
                        for (const i = 0; i < self.selectedList.length; i++) {
                            const item = self.selectedList[i];
                            if (item.aid == choice.aid) {
                                self.selectedList.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (choice.special == 1) {
                        for (const i = 0; i < self.handAndFootProList.length; i++) {
                            if (self.handAndFootProList[i].aid === choice.aid) {
                                self.handAndFootProList.splice(i, 1);
                                break;
                            }
                        }
                    }
                } else {
                    choice.selected = 1;
                    const item = {};
                    item.aid = choice.aid;
                    item.value = choice.value;
                    item.qid = choice.qid;
                    self.selectedList.push(item);
                    if (choice.special == 1) {
                        item.aname = choice.aname;
                        item.atype = choice.atype;
                        item.aid = choice.aid;
                        self.handAndFootProList.push(item);
                    }
                }
                console.log('ret: ', JSON.stringify(self.selectedList));
                console.log('ret: ', JSON.stringify(self.handAndFootProList));
            },
            clickPick: function (choice) {
                const self = this;
                self.warn = false;
                console.log('CHOICE: ', choice)
                const index = choice.value ? choice.value : 0;
                picker.pick({
                    index: index, items: choice.content ? choice.content.split('|@') : self.nailDamageList
                }, function (ret) {
                    if (ret.result == 'success') {
                        console.log(ret)
                        choice.value = ret.data;
                        self.addList(choice);
                    }
                });
            },
            addList: function (choice) {
                const self = this;
                const isSelected = false;
                for (const i = 0; i < self.selectedList.length; i++) {
                    const item = self.selectedList[i];
                    console.log('item: ', JSON.stringify(item));
                    if (item.aid === choice.aid) {
                        isSelected = true;
                        item.value = choice.value;
                        break;
                    }
                }
                //包含两种情况：selectedList=null 和 selectedList 数组不包含该条数据所以需要放在 for 循环外
                if (!isSelected) {
                    const ans = {};
                    ans.aid = choice.aid;
                    ans.value = choice.value;
                    ans.qid = choice.qid;
                    self.selectedList.push(ans);
                    if (choice.content) {
                        self.modelList.push(ans);
                    }
                }
                // console.log('ret: ',JSON.stringify(self.nailDamageList));
            },
            clickLeft: function (e) {
                const self = this;
                const qIndex = self.slsjSpecial.qIndex
                if (self.handAndFootProList.length > 0) {
                    for (const i = 0; i < self.handAndFootProList.length; i++) {
                        if (self.handAndFootProList[i].aid == self.specialModelId) {
                            if (self.modelList.length > 0) {
                                return self.checkFinish();
                            } else {
                                return dom.scrollToElement(this.$refs.mark[1], {offset: -20})
                            }
                        }
                    }
                    return self.checkFinish();
                } else {
                    // modal.toast({'message':'九大病（手足问题）为必选项','doation':1});
                    // myModule.printToast('九大病（手足问题）为必选项'
                    self.slsjNews[qIndex].showed = true;
                    self.warn = true
                    const el = this.$refs.mark[0]
                    dom.scrollToElement(el, {offset: -20})
                }
            },
            blur: function (choice) {
                const self = this;
//			const choice = e.target.attr.choice;
                const value = choice.value;
                choice.value = '';
                choice.value = value;
            },
            input: function (e, choice) {
                const self = this;
                const type = choice.atype;
                if (type == 2) {
                    choice.value = e.value;
                    if (choice.selected == 1) {
                        if (self.selectedList !== null && self.selectedList.length > 0) {
                            for (const i = 0; i < self.selectedList.length; i++) {
                                const item = self.selectedList[i];
                                if (item.aid == choice.aid) {
                                    self.selectedList[i].value = e.value;
                                }
                            }
                        }
                        if (choice.special == 1) {
                            for (const spec of self.handAndFootProList) {
                                if (spec.aid == choice.aid) {
                                    spec.value = e.value;
                                }
                            }
                        }
                    }
                } else if (type == 4) {
                    choice.value = e.value;
                    if (choice.selected == 0) {
                        choice.selected = 1;
                        const item = {};
                        item.aid = choice.aid;
                        item.value = e.value;
                        item.qid = choice.qid;
                        self.selectedList.push(item);
                    } else {
                        if (self.selectedList !== null && self.selectedList.length > 0) {
                            for (const i = 0; i < self.selectedList.length; i++) {
                                const item = self.selectedList[i];
                                if (item.aid == choice.aid) {
                                    item.value = e.value;
                                }
                            }
                        }
                    }
                }
            },
            checkFinish: function () {
                const self = this;
                const isFinish;
                for (const j = 0; j < self.slsjNews.length; j++) {
                    isFinish = false;
                    for (const i = 0; i < self.selectedList.length; i++) {
                        if (self.selectedList[i].qid == self.slsjNews[j].id) {
                            isFinish = true;
                            break;
                        }
                    }
                    if (!isFinish) {
                        return myModule.printConfirm('顾客信息不完整,是否继续提交?', function (ret) {
//                             点击确定返回 1，点击取消返回 0
                            if (ret.data == 1) {
                                self.newInfo();
                            }
                        });
                    }
                }
                return self.newInfo();
            },
            newInfo: function () {
                const self = this;
                const queryType;
                const userGuid;
                const contactId;
                const nailUrl;
                // queryType='saveContactFileData';
                // userGuid='NTV8QDM3MWQwMmI0NWRkZmU4ODc3ODA1MTMxNWM1YThmZGQ1fEA0ZDVhNTMxNDEwNmNlNmU3OGY1ZmQ0ZjU0NmYwNjBjMg--';
                // contactId='b7b06192a00f5fb8abb19047fa7d675b';
                // nailUrl=[[],[],[],[]];
                //获取提交时需要的参数
                configModule.GetUploadPhotoPara(function (ret) {
                    queryType = ret.queryType;
                    userGuid = ret.userGuid;
                    contactId = ret.contactID;
                    nailUrl = ret.nailUrl;
                    const handAndFootPro = '';
                    for (const item of self.handAndFootProList) {
                        if (item.atype == 1) {
                            handAndFootPro = handAndFootPro + '/' + item.aname;
                        } else if (item.atype == 2) {
                            handAndFootPro = handAndFootPro + '/' + item.value;
                        }
                    }
                    // console.log('handAndFootPro: ',handAndFootPro.substring(1));
                    const params = {};
                    params.ContactId = contactId;
                    params.NailUrl = nailUrl;
                    params.FileData = self.selectedList;
                    params.Remark = handAndFootPro.substring(1);
                    const body = 'QueryType=' + queryType + '&UserGuid=' + userGuid + '&Params=' + JSON.stringify(params);
//                    const body2 = 'QueryType=' + queryType + '&UserGuid=' + userGuid + '&Params={"ContactId":"' + contactId + '","NailUrl":' + JSON.stringify(nailUrl) + ',"FileData":' + JSON.stringify(self.selectedList) + ',"Remark":"' + handAndFootPro.substring(1) + '"}';
                    // modal.alert({'message':body,'doation':1});
//                    require('@weex-module/myModule').printLog(body);
                    // console.log('BODY: ',body);
                    apis.sendInfo(body, function (retdata) {
                        // console.log('ret: ',retdata);
                        if (retdata !== null) {
                            configModule.compconste(retdata);
                        }
                    }, function (progress) {
                    });
                });
            },
            getList: function () {
                const self = this;
//                this.$store.dispatch('FETCH_SLSJ_NEW')
                apis.getBlackFile(function (retdata) {
                    if (retdata.result == '0000') {
                        self.pushList(retdata.data);
                    } else {
                        modal.toast({'message': retdata.msg, 'doation': 1});
                    }
                }, function (progress) {
                });
            },
            pushList: function (data) {
                const self = this;
                if (data !== null && data.length > 0) {
                    for (const j = 0; j < data.length; j++) {
                        const item = data[j];
                        item.showed = false;
                        if (item.data !== null && item.data.length > 0) {
                            item.id = item.data[0].qid;
                        }
                        if (item.data !== null && item.data.length > 0) {
                            for (const i = 0; i < item.data.length; i++) {
                                const ans = item.data[i];
                                ans.selected = 0;
                                ans.value = '';
                                if (self.slsjSpecial.aIndex == '' && ans.special == 1) {
                                    self.slsjSpecial.aIndex = i - 1;
                                    self.slsjSpecial.qIndex = j;
                                }
                                if (self.slsjSpecial.modelIndex === '' && ans.content !== '') {
                                    self.slsjSpecial.modelIndex = i - 1;
                                }
                                if (ans.atype == 3) {
                                    const arr = ans.aname.split('|&');
                                    ans.aname = arr;
                                }
                            }
                            const closeItem = {atype: 7};
                            item.data.push(closeItem);
                        }
                        self.slsjNews.push(item);
                    }
                    // console.log('COLLECTINFOLIST: ',JSON.stringify(self.collectInfoList));
                }
            },
            setPickList: function () {
                const self = this;
                for (const i = 0; i < 100; i++) {
                    self.nailDamageList.push(i);
                }
            },
            setMeasure: function () {
                const self = this;
                configModule.getContainerHeight(function (params) {
                    // const ratio = this.$getConfig().env.devHeight /(2*750);
                    //从本地获取按钮的高度占布局高度的比值
                    const ratio = params.ratio;
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
            const self = this;
//            self.baseUrl = 'http://192.168.100.127:8888/weex';
            self.baseUrl = self.$getConfig().bundleUrl.split('?')[0].split('/').slice(0, -1).join('/') || '';
            self.setMeasure();
            self.setPickList();
            self.getList();
        }
    };</script>
<style scoped>
    .list {
        background-color: #fff;
    }

    .div_tit {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        /*margin-top: 5;*/
        /*margin-bottom: 5;*/
    }

    .div_lab {
        justify-content: center;
        align-items: center;
        width: 5px;
        background-color: rgb(2, 136, 209);
        top: 0;
        bottom: 0;
    }

    .div_img_open {
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        margin-right: 20px;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .div_text {
        flex: 1;
        /*justify-content: flex-start;*/
        /*align-items: flex-start;*/
    }

    .div_select {
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
        /*margin-bottom: 5px;*/
        margin-left: 50px;
        margin-right: 10px;
        /*border-width: 1;*/
    }

    .div_check {
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        margin-right: 20px;
        height: 20px;
        width: 20px;
        border-width: 1px;
    }

    .div_check_false {
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        margin-right: 20px;
        height: 16px;
        width: 16px;
        border-width: 1px;
        border-radius: 50px;
        border-color: #000000;
    }

    .div_check_true {
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        margin-right: 20px;
        height: 16px;
        width: 16px;
        border-width: 4px;
        border-radius: 50px;
        border-color: rgb(2, 136, 209);
    }

    .div_input {
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .input_base {
        flex: 1;
        height: 28px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 16px;
    }

    .text_tit {
        flex: 1;
        font-size: 20px;
        /*font-weight: bold;*/
        text-align: left;
        margin-left: 20px;
        margin-right: 20px;
    }

    .text_value {
        font-size: 18px;
        text-align: left;
    }

    .text_close {
        font-size: 16px;
        text-align: right;
        margin-right: 20px;
        color: #565656;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .div_bottom {
        flex: 0.8;
        height: 45px;
        flex-direction: row;
        /*margin-top: 20px;*/
        /*margin-bottom: 20px;*/
        margin-left: 32px;
        margin-right: 32px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: rgb(2, 136, 209);
    }

    .text_bottom {
        text-align: center;
        font-size: 18px;
        color: #ffffff;
    }

    .div_loading {
        position: absolute;
        top: 0;
        bottom: 100px;
        left: 0;
        right: 0;
        justify-content: center;
        align-items: center;
    }

    .img_loading {
        width: 100px;
        height: 100px;
    }

    .div_picker {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        /*margin-top: 5px;*/
        /*margin-bottom: 5px;*/
        margin-left: 30px;
        /*background-image: linear-gradient(to bottom,#ffffff,#bbbbbb);*/
        border-width: 1px;
        border-color: #bbbbbb;
        border-radius: 5px;
    }

    .text_picker {
        font-size: 18px;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
        /*margin-top: 5px;*/
        /*margin-bottom: 5px;*/
    }

    .div_img_pull {
        justify-content: center;
        align-items: center;
        background-color: #cccccc;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .img_arrowdrop {
        /*margin: 6px;*/
        height: 32px;
        width: 28px;
    }
</style>
