<template>
    <div>
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
                 @click="check(choice,'item'+ansIndex)">
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
                <div :class="['div_check_' + (choice.selected==1)]" :choice="choice"
                     @click="check()">
                    <!--@click="check(choice,ansIndex)">-->
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
                      v-if="required(ansIndex,index)"
                >（必选）
                </text>
            </div>
            <!-- 滚动选择 -->
            <div class="div_select"
                 v-if="choice.atype==6">
                <text class="text_value">{{choice.aname}}</text>
                <div class="div_picker"
                     @click="pick(choice)">
                    <text class="text_picker">{{getPickData(choice)}}
                    </text>
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
        <div style="height:10px;background-color:rgb(242,244,246);"></div>
    </div>
</template>

<script>
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
            btnHeight: {
                type: Number,
                required: true,
                default: ''
            },
            baseUrl: {
                type: String,
                required: true,
                default: ''
            },
            check: {
                type: Function,
            },
            pick: {
                type: Function,
            },
            input: {
                type: Function,
            },
            required:{
                type:Function
            }
        },
        data(){
            return {
                imgUrl: '/drawable/ic_done_black_48dp.png',
                imgArrowDropUrl: '/drawable/ic_arrow_drop_down_white_48dp.png',
                imgKeyboardArrowDownBlackUrl: '/drawable/arrow_down_grey_48dp.png',
                loadingUrl: '/drawable/slsj-loading.gif',
            }
        },
        methods: {
            clickCloseItem: function (item) {
                let self = this;
                item.showed = false;
            },
            clickItem: function (item) {
                let self = this;
                item.showed = !item.showed
            },
            blur: function (choice) {
                let self = this;
//			let choice = e.target.attr.choice;
                let value = choice.value;
                choice.value = '';
                choice.value = value;
            },
            getPickData(choice){
                let self = this;
                if (choice.value) {
                    if (choice.content) {
                        return choice.content.split('|@')[choice.value];
                    } else {
                        return self.$store.getters.pickList[choice.value];
                    }
                } else {
                    return '-请选择-';
                }
            },
        }
    }
</script>

<style scoped>
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
        height: 32px;
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