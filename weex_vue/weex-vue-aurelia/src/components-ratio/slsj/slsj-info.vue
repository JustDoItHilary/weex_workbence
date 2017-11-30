<template>
    <div>
    <div v-for="(item,index) in slsjList">
        <div style="height:8px;background-color:rgb(242,244,246);"></div>
        <!-- 大标题 -->
        <div class="div_tit"
             @click="clickItem(item)">
            <div class="div_lab" :style="{ height: btnHeight+'px'}"></div>
            <div style="flex-direction: row;flex:1;align-items: center;">
                <text class="text_tit">{{item.name}}</text>
                <text class="text_value" ref="mark"
                      style="color:#ff0000;"
                      v-if="setRequired(0,index)"
                >（必选）</text>
            </div>
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
                 @click="clickCheck(choice,index)">
                <div :class="['div_check_' + (choice.selected==1)]">
                </div>
                <div class="div_text">
                    <text class="text_value">{{choice.aname}}</text>
                </div>
            </div>
            <!-- 选择 and 输入 -->
            <div class="div_select"
                 v-if="choice.atype==2"
                 @click="clickCheck(choice,index)">
                <div :class="['div_check_' + (choice.selected==1)]"
                     :choice="choice">
                </div>
                <text class="text_value">{{choice.aname}}</text>
                <div class="div_input">
                    <input class="input_base" type="text" :value="choice.value" :choice="choice"
                           @input="input($event,choice)"/>
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
                      v-if="slsjSpecial.qIndex == index && slsjSpecial.aIndex == ansIndex"
                >（必选）</text>
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
        props: {
            item: {
                type: Object,
                required: true,
                default: {}
            },
            index: {
                type: Number,
                required: true,
                default: ''
            },
            btnHeight:{
                type:String,
            },
            "isEdited":{
                type:Boolean,
                default:true
            },
            slsjList:{
                type:Array,
                default:[]
            },
        },
        components:{
            Warn:require('../warn.vue'),
        },
        computed:{
            baseUrl(){
                return this.$store.getters.baseUrl;
            },
//            slsjList(){
//                this.setList(this.$store.getters.slsjList);
//                return this.$store.getters.slsjList;
//            },
        },
        data(){
            return {
                marginBottom: 20,
                imgArrowDropUrl: '/drawable/ic_arrow_drop_down_white_48dp.png',
                imgKeyboardArrowDownBlackUrl: '/drawable/arrow_down_grey_48dp.png',
                loadingUrl: '/drawable/slsj-loading.gif',
                nailDamageList: [],
                warn: false,
                //检查表现-手足问题-灰指甲的aid，当选择了灰指甲手足模型必选一个，是固定值，非动态获取
                specialModelId: '697b57d56572695ad84882a01f54f49c',
                // 标题：手足模型的 qid,为了判定是否选中手足模型的其中一个
                modelqId: '529093b335d3232fd989294d1b043471',
                slsjNews: [],
                slsjSpecial: {
                    aIndex: '',
                    qIndex: '',
                    modelIndex: ''
                },
                selected: [],
                proList: [],
                requiredList:[]
            }
        },
        methods: {
            setList(data){
                //手足问题的 qindex
                let self=this;
                for (let j = 0; j < data.length; j++) {
                    let item = data[j];
                    if (item.data !== null && item.data.length > 0) {
                        for (let i = 0; i < item.data.length; i++) {
                            let ans = item.data[i];
                            if (self.slsjSpecial.aIndex == '' && ans.special == 1) {
                                self.slsjSpecial.aIndex = i - 1;
                                self.slsjSpecial.qIndex = j;
                                self.$emit("setSpecialqIndex",self.slsjSpecial.qIndex);
                            }
                            if (self.slsjSpecial.modelIndex === '' && j == self.slsjSpecial.qIndex + 1) {
                                self.slsjSpecial.modelIndex = i;
                            }
                            if (ans.selected == 1) {
                                self.selectItem(ans);
                            }
                        }
                    }
                }
            },
            setRequired: function (ansIndex, index) {
                let self = this;
                if (self.proList.length > 0) {
                    for (let i = 0; i < self.proList.length; i++) {
                        if (self.proList[i].aid == self.specialModelId && self.slsjSpecial.qIndex + 1 == index) {
                            return true;
                        }
                    }
                }
                return false;
            },
            clickCloseItem: function (item) {
                item.showType = false;
            },
            clickItem: function (item) {
                item.showType = !item.showType
            },
            clickCheck: function (choice, index) {
                let self = this;
                self.warn = false;
                if (choice.selected == 1) {
                    choice.selected = 0;
                    if (self.selectedList !== null && self.selectedList.length > 0) {
                        for (let i = 0; i < self.selectedList.length; i++) {
                            let item = self.selectedList[i];
                            if (item.aid == choice.aid) {
                                self.selectedList.splice(i, 1);
                                break;
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
                    choice.selected = 1;
                    let item = {};
                    item.aid = choice.aid;
                    item.value = choice.value;
                    item.qid = choice.qid;
                    item.groupid = choice.groupid;
                    if(choice.gtype==0){
                        for(let i=0;i<self.selectedList.length;i++){
                            if(self.selectedList[i].groupid==choice.groupid){
                                let data=self.slsjNews[index].data;
                                for(let j=0;j<data.length;j++){
                                    if(data[j].groupid==choice.groupid&&data[j].aid!==choice.aid){
                                        data[j].selected=false;
                                    }
                                }
                                self.selectedList.splice(i, 1);
                                break;
                            }
                        }
                    }
                    self.selectedList.push(item);
                    if (choice.special == 1) {
                        item.aname = choice.aname;
                        item.atype = choice.atype;
                        item.aid = choice.aid;
                        self.proList.push(item);
                    }
                }
                self.$emit('setSelectedList',self.selectedList);
                self.$emit('setProList',self.proList);
//                console.log('ret: ', JSON.stringify(self.selected));
//                console.log('ret: ', JSON.stringify(self.proList));
            },
            clickPick: function (choice) {
                let self = this;
                self.warn = false;
                if(self.isEdited) {
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
                let isSelected = false;
                for (let i = 0; i < self.selectedList.length; i++) {
                    let item = self.selectedList[i];
                    if (item.aid === choice.aid) {
                        isSelected = true;
                        item.value = choice.value;
                        break;
                    }
                }
                //包含两种情况：selected=null 和 selected 数组不包含该条数据所以需要放在 for 循环外
                if (!isSelected) {
                    let ans = {};
                    ans.aid = choice.aid;
                    ans.value = choice.value;
                    ans.qid = choice.qid;
                    self.selectedList.push(ans);
                }
                self.$emit("setSelectedList",self.selectedList);
            },
            input: function (e, choice) {
                let self = this;
                let type = choice.atype;
                if (type == 2) {
                    choice.value = e.value;
                    if (choice.selected == 1) {
                        if (self.selectedList !== null && self.selectedList.length > 0) {
                            for (let i = 0; i < self.selectedList.length; i++) {
                                let item = self.selectedList[i];
                                if (item.aid == choice.aid) {
                                    self.selectedList[i].value = e.value;
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
                    if (choice.selected == 0) {
                        choice.selected = 1;
                        let item = {};
                        item.aid = choice.aid;
                        item.value = e.value;
                        item.qid = choice.qid;
                        self.selectedList.push(item);
                    } else {
                        if (self.selectedList !== null && self.selectedList.length > 0) {
                            for (let i = 0; i < self.selectedList.length; i++) {
                                let item = self.selectedList[i];
                                if (item.aid == choice.aid) {
                                    item.value = e.value;
                                }
                            }
                        }
                    }
                }
                self.$emit("setSelectedList",self.selectedList);
                self.$emit("setProList",self.proList);
            },
            selectItem: function (choice) {
                let self = this;
                choice.selected = 1;
                let item = {};
                item.aid = choice.aid;
                item.value = choice.value;
                item.qid = choice.qid;
                item.groupid = choice.groupid;
                self.selectedList.push(item);
                if (choice.special == 1) {
                    item.aname = choice.aname;
                    item.atype = choice.atype;
                    item.aid = choice.aid;
                    self.proList.push(item);
                }
            },
            getPickData(choice){
                let self = this;
                if (choice.value !== '') {
                    return self.nailDamageList[choice.value];
                } else {
                    return '-请选择-';
                }
            },
            setPickList: function () {
                let self = this;
                for (let i = 0; i < 100; i++) {
                    self.nailDamageList.push(i);
                }
            }
        },
        created:function (e) {
            let self=this;
            self.setPickList();
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../style/mixin.scss";

    .div_tit {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
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