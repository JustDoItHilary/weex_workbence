<template>
    <div class="root" bubble="true" style="border-width:10px;border-color: red;">
        <!--<list >-->
            <!--<refresh class="refresh" display="show">-->
                <!--<text class="indicator">Refreshing ...</text>-->
            <!--</refresh>-->
            <!--<cell v-for="item in list" style="flex-direction: row;">-->
                <!--<text style="font-size:28px;padding:30px;" >test11111</text>-->
                <!--<text style="font-size:1rem;" >test22222</text>-->
            <!--</cell>-->
        <!--</list>-->
        <scroller >
            <!--<text v-for="item in list">{{item}}  test      </text>-->
            <div class="root" @click="click('#ff0')">
                <text class="txt">{{getSize(28)+',,,'+width+',,,'+scale}}心若在梦就在迟到、早退时间大于 30 分钟，且提供合理解释的，按事假半天处理;无合理解释的' +
                    '，按旷工半天 处理。 研发部门弹性工作制要求: 研发</text>
            </div>
            <text @click="click('#0f0')" class="txt_else" style="border-width: 10;font-size: 16;" v-ratio="ratio">1{{rootText}}</text>
            <text @click="click('#f0f')" v-ratio="ratio" :class="['txt']" style="border-width: 10;">2{{rootText}}</text>
            <text @click="click('#0ff')" v-ratio="ratio" :class="['txt']" style="border-width: 10;" v-if="showType">2{{rootText}}</text>

            <text class="txt1">test1</text>
            <text class="txt2">test2</text>
            <text class="txt3">test3</text>
            <!--<validator name="validation" style="border-width: 1px;border-color: red;">-->
                <!--<input type="text" v-model='comment' ref='comment' v-validate:comment="{ minlength: 3, maxlength: 15 }">-->
                <!--<div>-->
                    <!--<span v-show="$validation.comment.minlength">不得少于3个字符</span>-->
                    <!--<span v-show="$validation.comment.maxlength">不得大于15个字符</span>-->
                <!--</div>-->
            <!--</validator>-->
        </scroller>
    </div>
</template>

<script>
    var animation = weex.requireModule('animation');
    var modal = weex.requireModule('modal');
    module.exports = {
        data(){
            return {
                size: '58dp',
                rootText: '迟到、早退时间大于 30 分钟，且提供合理解释的，按事假半天处理;无合理解释的' ,
                txt:
                '，按旷工半天 处理。 研发部门弹性工作制要求: 研发部门员工，如因项目紧急出现晚上加班的情况，可执行弹性工作时间，前一天加班时间太晚，' +
                '第二天上班时间可适当延迟，但需提供前一天经部门经理审批的加班记录单，无加班记录单，一律按迟 到处理。' +
            ' 外勤管理规定' +
                '员工出访办公所在地城市，原则上需先到公司签到后再外出;如特殊原因确需直接外勤，需提前告 知部门经理，并通知考勤人员登记在考勤外出登记表上，同时在上、下班时间内需要在雨诺工作圈签 到;外出结束后，需告知部门经理;实施服务人员外出结束需凭客户实施服务单进行销假，否则按旷工 处理;' +
                '员工因出差或业务原因需在外长期驻点工作的人员，需要填写出差申请，经部门负责人审批、人力 核准、财务备案;外出备案必须提前一天进行，如因特殊原因确实无法提前备案的，须在出差或外出当 天通过邮件申请备案，否则视同旷工;出差期间需每天在工作圈签到。部门负责人需清楚员工在工作时 间的去向，便于工作的统一安排;未向部门负责人申请，也未在人力、财务备案的外出视同旷工;' +
                '考勤人员每月不定期抽查外勤人员是否按约定在客户现场，发现一次未按约定执行的，记过一次， 12 个月内记过 3 次以上，按严重违反公司管理制度处理，情节严重的，公司有权解除劳动合同，并不 支付经济补偿金。' +
                '二、 请假、休假流程' +
                '依据公司《休假管理制度》，重新优化休假、请假流程，自本月起启用新版请假单，全体员工申请 休假、请假根据假期长短需经部门负责人及分管负责人审批、人力核准、财务备案，具体流程如下:' +
                ' 2天及2天以内的休假、请假，由部门直接负责人审批，人力核准、财务备案;' +
                ' 2天以上的休假、请假，由部门直接负责人、分管负责人审批，人力核准、财务备案;' +
                '三、 年假申请相关说明' +
                '年休假的相关制度依据原《休假管理制度》执行，同时强调以下几点:' +
                ' 标准年休假的计算周期为公历年度的 1 月 1 日至 12 月 31 日;正式员工连续工作 1 年以上，' +
                '可享受带薪年休假;试用期员工不享受带薪年休假;' +
                ' 带薪年休假原则上不跨公历年度，若因工作原因，员工年度内有应休未休的年休假，次年6月份' +
                '前可根据情况申请调休，逾期将归零处理;',
                width: '',
                scale:1,
                showed:true,
                color:'#F00',
                ratio:1,
                list:[1,2,3,4,5,6,7,8,9,9],
                imgUrl:'/drawable/no_found.png',
                baseUrl:'',
            }
        },
        components: {
            cellError:require('./components/error.vue'),
            cellHeader:require('./components/header/apply-header.vue')
        },
        computed: {
            sty(){
                return ``
            },
            toDpw(){
                return '48dp';
            },
        },
        methods: {
            onrefresh (event) {
                let self=this;
                console.log('is refreshing');
                modal.toast({ message: 'refresh', duration: 1 });
                setTimeout(function () {

                } ,2000);
            },
            onpullingdown (event) {
                console.log('is onpulling down')
//                modal.toast({ message: 'pulling down', duration: 1 })
            },
            click(c){
                this.color=c;
                this.showed=!this.showed;
            },
            getSize(size){
                var tt=Math.round(size* 750 / ( this.width / this.scale ));
                console.log(tt+',,,'+this.width+',,,'+this.scale );
//                this.toAlert(tt+',,,'+this.width+',,,'+this.scale,'',function () {
//
//                });
                return tt+'dp';
            },
            setRatio(){
                return 2;
//                this.ratio= 750 / ( this.width / this.scale );
//                this.$store.commit('SET_RATIO', {ratio: this.ratio});
            },
        },
        created(e){
            console.log("created",weex.config)
            console.log("created",this.$style)
            let self = this;
            var bundleUrl = 'http://weex.yy365.cn/sy-member.js';
            self.baseUrl = self.getBaseUrl(bundleUrl);
            self.$store.commit('SET_BASE_URL', {url: self.baseUrl});
            self.width=weex.config.env.hasOwnProperty('deviceWidth')?weex.config.env.deviceWidth:0;
            self.scale=weex.config.env.hasOwnProperty('scale')?weex.config.env.scale:2;
            self.setRatio();

        },
        beforeCreate(e){
            console.log("beforeCreate",this);
        },
        beforeMount(){
            console.log("beforeMount")
        },
        mount(){
            console.log("mount")
        },
        beforeUpdate(){
            console.log("beforeUpdated")
        },
        updated(){
            this.setRatio();
            console.log('UPDATED')
        },
        beforeDestroy(){
            console.log("beforeDestroyed")
        },
        destroyed(){
            console.log('destroyed')
        },
        activated(){
            console.log('activated')
        },
        deactivated(){
            console.log('deactivated')
        },
    }
</script>

<style module>
    .red{
        color:red;
    }
</style>
<style module="b">
    .red{
        color:greenyellow;
    }
</style>

<style lang="sass" rel="stylesheet/scss" >
    @import "./style/mixin";


    .root {
        margin:20px;
        /*margin:20dp;*/
    }
    .txt_else{
        /*margin-top: 20dp;*/
        /*margin-left: 10dp;*/
        /*padding-right: 20dp;*/
    }

    .txt {
        margin-top: 20px;
        margin-left: 20px;
        /*padding-right: 20dp;*/
        border-width: 10px;
        @include fontCommon(16px,#fc8);
        /*border-bottom-width: 2dp;*/
        /*font-size: dp(24);*/
        /*font-size:28dp;*/
    }
    .txt1{
        font-size: dp(28);
    }
    .indicator {
        color: #888888;
        font-size: 42px;
        text-align: center;
    }
    .panel {
        width: 600px;
        height: 250px;
        margin-left: 75px;
        margin-top: 35px;
        margin-bottom: 35px;
        flex-direction: column;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: #DDDDDD;
        background-color: #F5F5F5;
    }
    .text {
        font-size: 50px;
        text-align: center;
        color: #41B883;
    }

</style>