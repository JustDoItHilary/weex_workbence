<template>
    <div >
        <scroller >
              <!--:style="{ flex: '1', margin: marginBottom+'px', backgroundColor: '#ffffff' }"-->
            <div v-for="(item,index) in slsjNews">
                <!-- 大标题 -->
                <div class="div_tit"
                     >
                    <text class="text_tit">{{item.name}}</text>
                </div>
                <div v-for="(choice,ansIndex) in item.data"
                     style="margin-bottom: 5px;">
                    <!-- 复选框 -->
                    <div class="div_select"
                         v-if="choice.atype==1||choice.atype==0">
                        <div class="div_text">
                            <text class="text_value">{{choice.aname}}</text>
                        </div>
                    </div>
                    <!-- 文本 -->
                    <div class="div_select"  ref="mark"
                         v-if="choice.atype==5">
                        <text class="text_value">{{choice.aname}}</text>
                        <text class="text_value"
                              style="color:#ff0000;"
                              v-if="special_aIndex==ansIndex&&special_qIndex==index"
                              >（必选）</text>
                    </div>
                </div>
                <div style="height:10px;background-color:rgb(242,244,246);"></div>
            </div>
        </scroller>
        <div ref="bottom" id="bottom"
             style="flex-direction:row;justify-content:center;align-items:center;">
            <div class="div_bottom"
                 @click="clickSub">
                <text class="text_bottom">提交</text>
            </div>
        </div>
    </div>
</template>

<script>
    var stream = weex.requireModule('stream');
    var modal = weex.requireModule('modal');
    var picker = weex.requireModule('picker');
    var dom = weex.requireModule('dom');

    module.exports = {
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
                selected: [],
                nailDamageList: [],
                nailDamageHint: '-请选择-',
                inputdate: '',
                proList: [],
                warn: false,
                showItem: false,
                itemId: '',
            }
        },
        props: {},
        computed: {
            slsjNews () {
                return this.$store.getters.slsjList
            },
            special_aIndex(){
                return this.$store.getters.slsjSpecial.aIndex
            },
            special_qIndex(){
                return this.$store.getters.slsjSpecial.qIndex
            }
        },
        methods: {
            getList: function () {
                var self = this;
                this.$store.dispatch('FETCH_SLSJ_TEMPFILE')
            },
            clickSub: function (e) {
                    const el = this.$refs.mark[0]
                    dom.scrollToElement(el, {offset:-2})
                    console.log(el)
                    modal.toast({'message':el,'doation':1})
            },
        },
        created: function (e) {
            var self = this;
            self.baseUrl = 'http://192.168.100.127:8888/weex';
//		self.baseUrl = self.$getConfig().bundleUrl.split('?')[0].split('/').slice(0, -1).join('/') || '';
            self.getList();
        },
    };</script>
<style scoped="">
    .list{
        background-color: #fff;
        height:700px;
    }
    .div_tit {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        /*margin-top: 5;*/
        /*margin-bottom: 5;*/
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
</style>
