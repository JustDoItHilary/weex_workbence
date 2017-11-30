<template>
    <div append="node" style="background-color:rgb(242,244,246);">
        <scroller class="list">
            <div v-for="(item,index) in slsjNews">
                <div style="height:8px;background-color:rgb(242,244,246);"></div>
                <!-- 大标题 -->
                <div class="div_tit"
                     @click="clickItem(item)">
                    <div class="div_lab"
                         :style="{ height: btnHeight+'px'}"></div>
                    <div style="flex-direction: row;flex:1;align-items: center;">
                        <text class="text_tit">{{item.name}}</text>
                        <text class="text_value" ref="mark"
                              style="color:#ff0000;"
                              v-if="setRequired(0,index)"
                        >（必选）</text>
                    </div>
                    <div class="div_img_open">
                        <image style="height: 16px;width: 16px;"
                               :src="baseUrl+imgKeyboardArrowDownBlackUrl"></image>
                    </div>
                </div>
                <div v-for="(choice,ansIndex) in item.data"
                     v-if="item.showed"
                     style="margin-bottom: 5px;">
                    <!-- 复选框 -->
                    <div class="div_select"
                         v-if="choice.atype==1||choice.atype==0"
                         @click="clickCheck(choice,index)"
                         :ref="index">
                        <div :class="['div_check_' + (choice.chosed==1)]">
                        </div>
                        <div class="div_text">
                            <text class="text_value">{{choice.aname}}</text>
                        </div>
                    </div>
                    <!-- 选择 and 输入 -->
                    <div class="div_select"
                         v-if="choice.atype==2"
                         @click="clickCheck(choice,index)"
                         :ref="index">
                        <div :class="['div_check_' + (choice.chosed==1)]">
                        </div>
                        <text class="text_value">{{choice.aname}}</text>
                        <div :class="['div_input', 'border_' + (isEdited)]">
                            <input class="textarea" type="text" :value="choice.value"
                                   @input="input($event,choice)" :disabled="!isEdited"/>
                        </div>
                    </div>
                    <!-- 文本 and 输入 -->
                    <div class="div_select"
                         v-if="choice.atype==4" :ref="index">
                        <text class="text_value">{{choice.aname}}</text>
                        <div :class="['div_input', 'border_' + (isEdited)]">
                            <input class="textarea" type="text" :value="choice.value"
                                   @input="input($event,choice)"
                                   :disabled="!isEdited"/>
                        </div>
                    </div>
                    <!-- 文本 and 输入 and 文本-->
                    <div class="div_select" v-if="choice.atype==3" :ref="index">
                        <text class="text_value">{{choice.aname[0]}}</text>
                        <div :class="['div_input', 'border_' + (isEdited)]">
                            <input class="textarea" type="text" :value="choice.value"
                                   @input="input($event,choice)"
                                   :disabled="!isEdited"/>
                        </div>
                        <text class="text_value">{{choice.aname[1]}}</text>
                    </div>
                    <!-- 文本 -->
                    <div class="div_select"
                         v-if="choice.atype==5">
                        <text class="text_value">{{choice.aname}}</text>
                        <text class="text_value" ref="mark"
                              style="color:#ff0000;"
                              v-if="choice.required==1||(slsjSpecial.qIndex == index&&slsjSpecial.aIndex == ansIndex)"
                        >（必选）</text>
                    </div>
                    <!-- 滚动选择 -->
                    <div class="div_select" v-if="choice.atype==6" :ref="index">
                        <text class="text_value">{{choice.aname}}</text>
                        <div class="div_picker"
                             @click="clickPick(choice)">
                            <text class=" text_picker">{{getPickData(choice)}}</text>
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
        <div :style="{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: marginBottom }"
             v-if="isEditedOfAll">
            <div class="div_bottom" :style="{ height: btnHeight }" v-if="!isEdited" @click="clickEdit">
                <text class="text_bottom">修改档案</text>
            </div>
            <div class="div_bottom" :style="{ height: btnHeight }" v-if="isEdited" @click="clickSave">
                <text class="text_bottom">保存</text>
            </div>
            <div class="div_bottom" :style="{ height: btnHeight, width: btnWidth }" v-if="isEdited"
                 @click="clickCancel">
                <text class="text_bottom">取消</text>
            </div>
        </div>
    </div>
</template>

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
        /*flex: 1;*/
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

    .div_tit {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        /*margin-top: 5px;*/
        /*background-color:rgb(242,244,246);*/
        /*margin-bottom: 5px;*/
    }

    .div_lab {
        justify-content: center;
        align-items: center;
        width: 5px;
        background-color: rgb(2, 136, 209);
        top: 0px;
        bottom: 0px;
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
        border-width: 5px;
        border-radius: 50px;
        border-color: rgb(2, 136, 209);
    }

    .img_check {
        height: 20px;
        width: 20px;
        /*border-width: 1;*/
        /*border-color: #ff0000px;*/
    }

    .text_value {
        font-size: 18px;
        text-align: left;
    }

    .border_true {
        border-color: #000000;
    }

    .border_false {
        border-color: #bbbbbb;
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

    .textarea {
        flex: 1;
        height: 28px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 16px;
    }

    .img_spot {
        width: 6px;
        height: 6px;
        background-color: #000000;
        margin: 20px;
    }

    .text_tit {
        /*flex: 1;*/
        font-size: 20px;
        /*font-weight: bold;*/
        text-align: left;
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
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
        /*color: rgb(2,136,209);*/
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
        border-left-width: 1px;
        border-left-color: #bbbbbb;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .img_arrowdrop {
        /*margin: 6px;*/
        height: 32px;
        width: 28px;
    }
</style>

<script>
    let stream = weex.requireModule('stream');
    let configModule = weex.requireModule('configModule');
    let modal = weex.requireModule('modal');
    let picker = weex.requireModule('picker');
    let dom = weex.requireModule('dom');
    let myModule = weex.requireModule('myModule');
    const apis = require('../common/api');

    module.exports = {
        data(){
            return {
                devHeight: 960,
                devWidth: 750,
                btnHeight: 60,
                btnWidth: 240,
                labHeight: 40,
                isEdited: false,
                isEditedOfAll: true,
                imgUrl: '/drawable/ic_done_black_48dp.png',
                imgArrowDropUrl: '/drawable/ic_arrow_drop_down_white_48dp.png',
                imgKeyboardArrowDownBlackUrl: '/drawable/arrow_down_grey_48dp.png',
                baseUrl: '',
                slsjNews: [],
                initInfo: '',
                chosedList: [],
                queryType: '',
                userGuid: '',
                contactId: '',
                nailUrl: [[], [], [], []],
                fileId: '',
                marginBottom: 20,
                nailDamageList: [],
                nailDamageHint: '-请选择-',
                proList: [],
                special: '',
                warn: false,
                showItem: false,
                itemId: '',
                timer: '',
                //检查表现-手足问题-灰指甲的aid，当选择了灰指甲手足模型必选一个，是固定值，非动态获取
                specialModelId: '697b57d56572695ad84882a01f54f49c',
                // 标题：手足模型的 qid,为了判定是否选中手足模型的其中一个
                modelqId:'529093b335d3232fd989294d1b043471',
                modelList: [],
                slsjSpecial: {
                    aIndex: '',
                    qIndex: '',
                    modelIndex: ''
                },
                pickerList: [],
                requiredList:[]
            }
        },
        props: {},
        methods: {
            setRequired: function (ansIndex, index) {
                let self = this;
                if (self.proList.length > 0) {
                    for (let i = 0; i < self.proList.length; i++) {
                        if (self.proList[i].aid == self.specialModelId && self.slsjSpecial.qIndex +1 == index) {
                            return true;
                        }
                    }
                }
                return false;
            },
            getPickData(choice){
                let self = this;
                if (choice.value !== '') {
                    return self.nailDamageList[choice.value];
                } else {
                    return '-请选择-';
                }
            },
            clickCloseItem: function (item) {
                item.showType = false;
            },
            clickItem: function (item) {
                item.showType = !item.showType
            },
            //勾选事件
            clickCheck: function (choice,index) {
                let self = this;
                self.warn = false;
                if (self.isEdited) {
                    if (choice.chosed == 1) {
                        choice.chosed = 0;
                        if (self.chosedList != null && self.chosedList.length > 0) {
                            for (let i = 0; i < self.chosedList.length; i++) {
                                let item = self.chosedList[i];
                                if (item.aid == choice.aid) {
                                    self.chosedList.splice(i, 1);
                                }
                            }
                        }
                        if (choice.special == 1) {
                            for (let i = 0; i < self.proList.length; i++) {
                                if (self.proList[i].aid === choice.aid) {
                                    self.proList.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    } else {
                        choice.chosed = 1;
                        let item = {};
                        item.aid = choice.aid;
                        item.value = choice.value;
                        item.qid = choice.qid;
                        item.groupid = choice.groupid;
                        if(choice.gtype==0){
                            for(let i=0;i<self.chosedList.length;i++){
                                if(self.chosedList[i].groupid==choice.groupid){
                                    let data=self.slsjNews[index].data;
                                    for(let j=0;j<data.length;j++){
                                        if(data[j].groupid==choice.groupid&&data[j].aid!==choice.aid){
                                            data[j].chosed=false;
                                        }
                                    }
                                    self.chosedList.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        self.chosedList.push(item);
                        if (choice.special == 1) {
                            item.aname = choice.aname;
                            item.atype = choice.atype;
                            self.proList.push(item);
                        }
                    }
                }
//                console.log('ret: ', JSON.stringify(self.chosedList));
//                console.log('ret: ', JSON.stringify(self.proList));
            },
            input: function (e,choice) {
                let self = this;
                let type = choice.atype;
                if (type == 2) {
                    choice.value = e.value;
                    if (choice.chosed == 1) {
                        console.log(choice)
                        if (self.chosedList != null && self.chosedList.length > 0) {
                            for (let i = 0; i < self.chosedList.length; i++) {
                                let item = self.chosedList[i];
                                if (item.aid == choice.aid) {
                                    self.chosedList[i].value = e.value;
                                }
                            }
                        }
                        if (choice.special == 1) {
                            for (let spec of self.proList) {
                                if (spec.aid == choice.aid) {
                                    spec.value = e.value;
                                }
                            }
                        }
                    } else {
                        self.selectItem(choice);
                    }
                } else if (type == 4) {
                    choice.value = e.value;
                    if (choice.chosed == 0) {
                        choice.chosed = 1;
                        let item = {};
                        item.aid = choice.aid;
                        item.value = e.value;
                        item.qid = choice.qid;
                        self.chosedList.push(item);
                    } else {
                        if (self.chosedList != null && self.chosedList.length > 0) {
                            for (let i = 0; i < self.chosedList.length; i++) {
                                let item = self.chosedList[i];
                                if (item.aid == choice.aid) {
                                    item.value = e.value;
                                }
                            }
                        }
                    }
                }
            },
            selectItem: function (choice) {
                let self = this;
                choice.chosed = 1;
                let item = {};
                item.aid = choice.aid;
                item.value = choice.value;
                item.qid = choice.qid;
                item.groupid = choice.groupid;
                self.chosedList.push(item);
                if (choice.special == 1) {
                    item.aname = choice.aname;
                    item.atype = choice.atype;
                    item.aid = choice.aid;
                    self.proList.push(item);
                }
            },
            clickEdit: function (e) {
                let self = this;
                self.isEdited = true;
                configModule.editArchiveInfo();
            },
            clickPick: function (choice) {
                let self = this;
                self.warn = false;
                if (self.isEdited) {
                    let index = choice.value ? choice.value : 0;
                    picker.pick({
                        index: index, items: choice.content ? choice.content.split('|@') : self.nailDamageList
                    }, function (ret) {
                        if (ret.result == 'success') {
                            choice.value = ret.data;
                            self.addList(choice);
                        }
                    });
                }
            },
            addList: function (choice) {
                let self = this;
                let ischosed = false;
                for (let i = 0; i < self.chosedList.length; i++) {
                    let item = self.chosedList[i];
                    if (item.aid === choice.aid) {
                        ischosed = true;
                        item.value = choice.value;
                        break;
                    }
                }
                //包含两种情况：chosedList=null 和 chosedList 数组不包含该条数据所以需要放在 for 循环外
                if (!ischosed) {
                    let ans = {};
                    ans.aid = choice.aid;
                    ans.value = choice.value;
                    ans.qid = choice.qid;
                    self.chosedList.push(ans);
                    if (choice.content) {
                        self.modelList.push(ans);
                    }
                }
            },
            clickCancel: function (e) {
                let self = this;
                self.isEdited = false;
                self.slsjNews = JSON.parse(self.initInfo);
                configModule.cancalEditArchiveInfo();
            },
            checkFinish: function () {
                let self = this;
                for (let j=0;j<self.requiredList.length;j++){
                    let required=false;
                    for (let i = 0; i < self.chosedList.length; i++) {
//                        console.log(self.requiredList[j].groupid,self.chosedList[i].groupid)
                        if (self.chosedList[i].groupid == self.requiredList[j].groupid) {
                            required = true;
                            break;
                        }
                    }
                    if (!required){
//                        console.log("scroll: ",self.requiredList[j])
                        for(let s=0;s<self.slsjNews.length;s++){
                            if (self.slsjNews[s].id==self.requiredList[j].qid){
                                self.slsjNews[s].showType = true;
                                const el = this.$refs.mark[2]
                                return dom.scrollToElement(el, {offset: -20})
                            }
                        }
                    }
                }
                let isFinish;
                for (let j = 0; j < self.slsjNews.length; j++) {
                    isFinish = false;
                    for (let i = 0; i < self.chosedList.length; i++) {
                        if (self.chosedList[i].qid == self.slsjNews[j].id) {
                            isFinish = true;
                            break;
                        }
                    }
                    if (!isFinish) {
                        return myModule.printConfirm('顾客信息不完整,是否继续提交?', function (ret) {
//                             点击确定返回 1，点击取消返回 0
                            if (ret.data == 1) {
                                self.save();
                            }
                        });
                    }
                }
                return self.save();
            },
            clickSave: function (e) {
                let self = this;
                let qIndex = self.slsjSpecial.qIndex;
                if (self.proList.length > 0) {
                    for (let i = 0; i < self.proList.length; i++) {
                        if (self.proList[i].aid == self.specialModelId) {
                            for(let j=0;j<self.chosedList.length;j++){
                                if(self.chosedList[j].qid==self.modelqId){
                                    return self.checkFinish();
                                }
                            }
                            self.slsjNews[qIndex+1].showType = true;
                            return dom.scrollToElement(this.$refs.mark[1], {offset: -20})
                        }
                    }
                    return self.checkFinish();
                } else {
                    console.log("qIndex: ",qIndex)
                    self.slsjNews[qIndex].showType = true;
                    self.warn = true
                    const el = this.$refs.mark[0]
                    dom.scrollToElement(el, {offset: -20})
                }
            },
            save: function () {
                let self = this;
//                 self.queryType="saveContactFileData";
//                 self.nailUrl=[[],["http://mobile-10034140.image.myqcloud.com/357f636e-e524-4f73-9a68-ccebd4dd067d"],[],[],[]];
                let handAndFootPro = '';
                for (let item of self.proList) {
                    if (item.atype == 1) {
                        handAndFootPro = handAndFootPro + '/' + item.aname;
                    } else if (item.atype == 2&&item.value!="") {
                        handAndFootPro = handAndFootPro + '/' + item.value;
                    }
                }
//                // console.log('handAndFootPro: ',handAndFootPro.substring(1));
                configModule.GetUploadPhotoPara(function (ret) {
                    // require('@weex-module/myModule').printLog('clickSubParams: '+JSON.stringify(ret));
                    // queryType 是提交数据接口的参数
                    self.queryType = ret.queryType;
                    // self.userGuid=ret.userGuid;
                    // self.contactId=ret.contactID;
                    self.nailUrl = ret.nailUrl;
                    let params = {};
                    params.ContactId = self.contactId;
                    params.FileId = self.fileId;
                    params.NailUrl = self.nailUrl;
                    params.FileData = self.chosedList;
                    params.Remark = handAndFootPro.substring(1);
                    let body = 'QueryType=' + self.queryType + '&UserGuid=' + self.userGuid + '&Params=' + JSON.stringify(params);
//                    let body = 'QueryType=' + self.queryType + '&UserGuid=' + self.userGuid + '&Params={"ContactId":"' + self.contactId + '","FileId":"' + self.fileId + '","NailUrl":' + JSON.stringify(self.nailUrl) + ',"FileData":' + JSON.stringify(self.chosedList) + ',"Remark":"' + handAndFootPro.substring(1) + '"}';
//                    console.log('BODY; ', body);
//                    require('@weex-module/myModule').printLog('body: ' + body);
                    apis.sendInfo(body, function (retdata) {
                        if (retdata != null) {
                            // console.log('RETDATA: ',retdata);
                            configModule.complete(retdata);
                        }
                    }, function (progress) {
                    });
                });
            },
            getList: function () {
                let self = this;
//                self.contactId = 'b7b06192a00f5fb8abb19047fa7d675b';
//                self.fileId = 'fd65c06b27b568bff14dd106fb50d808';

                //调用 native 接口获取参数
                configModule.GetUploadPhotoPara(function (ret) {
                    // queryType 是提交数据接口的参数
                    self.userGuid = ret.userGuid;
                    self.contactId = ret.contactID;
                    self.fileId = ret.fileID;
                    let params = {};
                    params.ContactId = self.contactId;
                    params.FileId = self.fileId;
                    //查询已有数据的 queryType 使用 getContactFileData
                    let body = 'QueryType=getContactFileData' + '&UserGuid=' + self.userGuid + '&Params=' + JSON.stringify(params);
//                    let body = 'QueryType=getContactFileData' + '&UserGuid=' + self.userGuid + '&Params={"ContactId":"' + self.contactId + '","FileId":"' + self.fileId + '"}';
                    //查询已有的数据
                    apis.getFile(body, function (retdata) {
//                        console.log('DATA: ', JSON.stringify(retdata));
                        if (retdata.result == '0000') {
                            self.pushList(retdata.data);
                        }
                    }, function (progress) {
                    });
                });
            },
            pushList: function (data) {
                let self = this;
                if (data != null) {
                    for (let j = 0; j < data.length; j++) {
                        let item = data[j];
                        item.showType = false;
                        if (item.data !== null && item.data.length > 0) {
                            item.id = item.data[0].qid;
                        }
                        if (item.data != null && item.data.length > 0) {
                            for (let i = 0; i < item.data.length; i++) {
                                let ans = item.data[i];
                                // 如果已被选中放入 chosedList 列表
                                if(ans.chosed==1){
                                    self.selectItem(ans);
                                }
//                                if (ans.chosed == 1) {
//                                    let selItem = {};
//                                    selItem.aid = ans.aid;
//                                    selItem.value = ans.value;
//                                    selItem.qid = ans.qid;
//                                    self.chosedList.push(selItem);
//                                    if (ans.special == 1) {
//                                        selItem.aname = ans.aname;
//                                        selItem.atype = ans.atype;
//                                        self.proList.push(selItem);
//                                    }
//                                }
                                if (self.slsjSpecial.aIndex == '' && ans.special == 1) {
                                    self.slsjSpecial.aIndex = i - 1;
                                    self.slsjSpecial.qIndex = j;
                                }
                                if (self.slsjSpecial.modelIndex === '' && j == self.slsjSpecial.qIndex+1) {
                                    self.slsjSpecial.modelIndex = i ;
                                }
                                if (ans.required == 1) {
                                    let newItem=true;
                                    for (let r=0;r<self.requiredList.length;r++){
                                        if (ans.groupid==self.requiredList[r].groupid){
                                            newItem=false;
                                            break;
                                        }
                                    }
                                    if (newItem){
                                        self.requiredList.push(ans);
                                    }
                                }
//                                if (ans.content !== '') {
//                                    self.modelList.push(ans);
//                                    if (self.slsjSpecial.modelIndex === '') {
//                                        self.slsjSpecial.modelIndex = i - 1;
//                                    }
//                                }
                            }
                            let closeItem = {atype: 7};
                            item.data.push(closeItem);
                        }
                        self.slsjNews.push(item);
                    }
                    self.initInfo = JSON.stringify(self.slsjNews);
                }
//                console.log("chosedList: ",JSON.stringify(self.chosedList))
//                console.log("chosedList: ",JSON.stringify(self.requiredList.length))
            },
            setPickList: function () {
                let self = this;
                for (let i = 0; i < 100; i++) {
                    self.nailDamageList.push(i);
                }
            },
            setMeasure: function () {
                let self = this;
                // //获取 dev 的高度
                configModule.getContainerHeight(function (params) {
                    let ratio = params.ratio;
                    self.btnHeight = 750 * ratio;
                    self.marginBottom = 8 * ratio / 44 * 750;
                }.bind(this));
            }
        },
        created: function (e) {
            let self = this;
            self.setMeasure();
            self.setPickList();
            self.getList();
//            let bundleUrl = 'http://192.168.100.120:8888/weex/queryInfo.js?isEditedOfAll=1';
            let bundleUrl = self.$getConfig().bundleUrl || '';
            let paramsArr = bundleUrl.split('?');
            self.baseUrl = paramsArr[0].split('/').slice(0, -1).join('/');
            // isEditedOfAll:=1 是可以编辑，=0 是不可编辑只能查询
            self.isEditedOfAll = paramsArr[1].split('=')[1] == 1;
        }
    };</script>