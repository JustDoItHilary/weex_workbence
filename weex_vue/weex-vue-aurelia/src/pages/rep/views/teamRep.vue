<template>
    <!--团队汇报-->
    <div class="cell_member"
         @click="clickReview(item)">
        <div class="div_member">
            <text class="text_member">{{item.Name}}</text>
        </div>
        <text :class="['div_logo','select_bg_'+item.isAudited]">{{item.isAudited?'全部审核':'有未审核'}}</text>
    </div>
</template>

<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    const configModule = weex.requireModule('configModule');

    export default{
        components: {
            DateLogo: require('../../../components/cell-date-logo.vue'),
            CellError: require('../../../components/error.vue'),
            CellTxtCenter: require('../../../components/cell-txt-center.vue'),
        },
        props: {
            item: {},
            index: {},
        },
        data(){
            return {
                typeName: '',
                itemGuid: '',
                token: '',
                searchMess: '',
                selectedList: [],
                imgLogoUrl: '/drawable/review.png',
                imgAddUrl: '/drawable/ic_add_white_48dp.png',
                imgShowUp: '/drawable/arrow_up.png',
                imgShowDown: '/drawable/arrow_down.png',
                imgCalendarUrl: '/drawable/calendar_white.png',
                imgCalendarUrl_ios: '/drawable/calendar_green.png',
                date: '',
            }
        },
        computed: {
            errorInfo(){
//                console.log(this.$store.getters.errorInfo)
                return this.$store.getters.errorInfo;
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            reviewList(){/*所有可审核的人员名单*/
//                console.log("reviewList",this.$store.getters.getReviewList)
                if (this.searchMess) {
                    return this.searchMemberList(this.$store.getters.getReviewList)
                }
                return this.$store.getters.getReviewList
            },
            baseUrl(){
//                console.log(this.$store.getters.baseUrl);
                return this.$store.getters.baseUrl;
            },
        },
        methods: {
            clickReview(item){
                let self = this;
                let params = {};
                params.Name = item.Name;
                params.Guid = item.Guid;
                self.$router.push(`/repTime/${JSON.stringify(params)}`);
                self.$store.commit('SET_REP_LIST', {
                    retdata: [], callback: function () {

                    }
                });
            },
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../../style/mixin";

    .select_bg_true {
        background-color: $css-grey;
    }

    .select_bg_false {
        background-color: $colorCommon;
    }

    .text_tit {
        @include fontCommon;
        @include marginRow($ss);
        margin-top: $sl;
        @include fontLines;
    }

    .input {
        @include searchBox();
        @include marginColumn();
        @include marginRow($bl);
    }

    .cell_member {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom-width: $borderW;
        border-color: #bbbbbb;
    }

    .div_logo {
        padding: $sl;
        border-radius: $bRadius;
        text-align: center;
        @include fontCommon($ss, #fff);
    }

    .text_member {
        font-size: $bs;
        margin-left: $cl;
        margin-top: $bs;
        margin-bottom: $cl;
    }

    .div_member {
        flex: 1;
        flex-direction: row;
        margin-left: $ss;
        align-items: center;
    }

</style>
