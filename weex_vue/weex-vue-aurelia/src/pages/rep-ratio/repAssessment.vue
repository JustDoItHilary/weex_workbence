<template>
    <div>
        <app-header :tit="getParams.Name+'的周报'"></app-header>
        <scroller>
            <cell-input 
                    class="div_item"
                    txtTit="本周工作总结"
                    :txtInput="repDetails.summary"
            ></cell-input>
            <cell-input 
                    class="div_item"
                    txtTit="下周工作计划"
                    :txtInput="repDetails.myPlan"
            ></cell-input>
            <cell-input 
                    class="div_item"
                    txtTit="审核评价"
                    txtHide="请输入评价（非必须）"
                    txtLines="6"
                    :txtInput="assessment"
                    @clickCellInput="clickAssessment"
            ></cell-input>
        </scroller>
        <bottom-btn 
                    class="cell_bottom_btn"
                    txtLeft="审核"
                    :left="clickLeft"
        ></bottom-btn>
    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');
    const storage = weex.requireModule('storage');
    const stream = weex.requireModule('stream');

    export default {
        components: {
            appHeader: require('../../components/header/rep-header.vue'),
            BottomBtn: require('../../components/footer/bottom-btn.vue'),
            CellInput: require('../../components/cell-input.vue'),
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            },
            getParams(){
                if (this.$route && this.$route.params) {
//                    console.log(this.$route.params)
                    return JSON.parse(this.$route.params.params)
                }
                return ''
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            repDetails(){
                let self = this;
                let details = self.$store.getters.getRepDetails;
//                console.log("assessment-repdetails: ",details)
                if (details.hasComment == 1) {
                    var body = 'code=' + self.getParams.Guid + '&CommentDate=' + details.endTime + '&Isweek=1';
//                    console.log(body)
                    self.$store.dispatch('FETCH_REP_GET_COMMENTS', {body: body});
                }
                return details;
            },
            assessment(){
                var arr=this.$store.getters.getAssessment;
                if(arr.length>0){
                   return this.replaceTransfer(arr[arr.length-1].Content);
                }
                return '';
            },
        },
        data(){
            return {
                input: '',
                name: '',
            }
        },
        methods: {
            clickAssessment(par1, par2, par3){
                let self = this;
                self.input = par2;
            },
            clickLeft(){
                var self = this;
                var body = 'code=' + self.userPlatformCode + '&reportguid=' + self.repDetails.Guid + '&reportdate='
                    + self.repDetails.endTime + '&empGuid='
                    + self.getParams.Guid + '&comment=' + self.escapeHtml(self.input) + '&type=1';
//                console.log('REPCALLBACK: ',body);
                self.$store.dispatch('FETCH_REP_AUDIT', {
                    body: body, callback: function (retdata) {
//                        console.log(retdata)
                        if (retdata == true) {
                            self.$router.go(-1)
                        } else {
                            self.toToast('审核失败：' + retdata)
                        }
                    }
                });
            },
        },
        destroyed(e){
            this.$store.commit('SET_REP_ASSESSMENT',{retdata:[]});
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin";

    .div_item {
        background-color: #fff;
        @include paddingRow;
        @include paddingColumn();
    }

    .cell_bottom_btn {
        @include paddingColumn();
        @include paddingRow($sl);
    }

</style>