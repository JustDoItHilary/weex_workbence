<template>
    <div class="root" bubble="true">
        <scroller>
            <div class="root">
                <text class="txt">{{getSize(28)+',,,'+width+',,,'+scale}}心若在梦就在迟到、早退时间大于 30 分钟，且提供合理解释的，按事假半天处理;无合理解释的' +
                    '，按旷工半天 处理。 研发部门弹性工作制要求: 研发</text>
            </div>
            <text v-ratio="ratio()" class="txt">{{rootText}}</text>
        </scroller>
    </div>
</template>

<script>
    var animation = weex.requireModule('animation');
    var modal = weex.requireModule('modal');
    module.exports = {
        data(){
            return {
                size: '58px',
                rootText: '迟到、早退时间大于 30 分钟，且提供合理解释的，按事假半天处理;无合理解释的' +
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
            }
        },
        components: {},
        computed: {
            toDpw(){
                return '48px';
            },
        },
        methods: {
            getSize(size){
                var tt=Math.round(size* 750 / ( this.width / this.scale ));
                console.log(tt+',,,'+this.width+',,,'+this.scale );
//                this.toAlert(tt+',,,'+this.width+',,,'+this.scale,'',function () {
//
//                });
                return tt+'px';
            },
            ratio(){
                return 750 / ( this.width / this.scale );
            },
        },
        created(e){
            console.log(this.$getConfig())
            let self = this;
            self.width=self.$getConfig().env.hasOwnProperty('deviceWidth')?self.$getConfig().env.deviceWidth:0;
            self.scale=self.$getConfig().env.hasOwnProperty('scale')?self.$getConfig().env.scale:2;

        },
        beforeCreate(e){
//            console.log("beforeCreate")
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "./style/mixin";


    .root {
        /*margin:20px;*/
    }

    .txt {
        margin-top: 20px;
        margin-left: 10px;
        padding-right: 20px;
        border-width: 10px;
        @include fontCommon($bs,#fc8);
        border-bottom-width: 2px;
        /*font-size: dp(24);*/
        /*font-size:28px;*/
    }

</style>