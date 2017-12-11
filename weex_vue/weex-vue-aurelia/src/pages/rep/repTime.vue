<template>
    <div>
        <app-header :tit="getParams.Name+'的周报'"></app-header>
        <cell-txt-center 
                         :txt="year+'年'+thisMonth+'月'"
                         fontColor="#aaa"
                         class="cell_txt_center">
            <text 
                  slot="left"
                  class="div_add"
                  @click="clickLast()"> 上个月 </text>
            <text  
                   slot="right"
                   class="div_add"
                   @click="clickNext()"> 下个月 </text>
        </cell-txt-center>
        <div 
             v-if="repList.length<1"
             class="div_hide">
            <image  
                    class="img_search"
                    :src="baseUrl+imgUrl"></image>
            <text  
                   class="txt_hide">没有待审核周报</text>
        </div>
        <scroller>
            <div  
                  class="div_item cell_border"
                  v-for="(item,index) in repList"
                  @click="clickItem(index)">
                <text 
                      class="cell_txt_center "
                      :style="{color:item.AuditFlag==1?'#000':colorCommon,flex:1}">{{item.startTime+' ~ '+item.endTime}}</text>
                <text 
                      :class="['cell_txt_center','div_logo','select_bg_'+String(item.AuditFlag==1)]">{{item.AuditFlag==1?'已审核':'未审核'}}</text>
            </div>
        </scroller>
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
            appHeader: require('../../components/header/apply-header.vue'),
            CellTxtCenter: require('../../components/cell-txt-center.vue'),
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            },
            userPlatformCode(){
                return this.$store.getters.getUserPlatformCode
            },
            repList(){
                return this.$store.getters.getRepList;
            },
            getParams(){
                if (this.$route && this.$route.params) {
//                    console.log(this.$route.params)
                    return JSON.parse(this.$route.params.params)
                }
                return ''
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
            }
        },
        data(){
            return {
                name: '',
                year: '',
                date: '',
                thisMonth: '',
                firstDate: '',
                colorCommon:'#58D68D',
                imgUrl:'/drawable/no_data.png',
            }
        },
        methods: {
            clickItem(index){
                let self = this;
                self.$store.commit('SET_REP_DETAILS', {item: self.$store.getters.getRepList[index]});
                let params={};
                params.Name=self.getParams.Name;
                params.Guid=self.getParams.Guid;
                self.$router.push(`/repAssessment/${JSON.stringify(params)}`)
            },
            clickLast(){
                let self = this;
                self.date = new Date(self.firstDate - 86400000);
                self.getRepList();
            },
            clickNext(){
                let self = this;
                var day = new Date(self.year, self.thisMonth + 1, 1);
                self.date = new Date(day - 86400000);
                self.getRepList();
            },
            getRepList(){
                var self = this;
                self.year = self.date.getFullYear();
                var month = self.date.getMonth();
                self.thisMonth = month + 1;
                self.firstDate = new Date(self.year, month, 1);
                var startDate = self.formatDate(self.firstDate, 'yyyy-MM-dd');
                var endDate = self.formatDate(self.date, 'yyyy-MM-dd');
                startDate = encodeURIComponent(startDate);
                endDate = encodeURIComponent(endDate);
                var body = 'code=' + self.getParams.Guid + '&startDate=' + startDate + '&endDate=' + endDate + '&type=1&cros=';
//                console.log('REPCALLBACK: ', body);
                self.$store.dispatch('FETCH_REP_LIST', {
                    body: body, callback: function () {
                    }
                })
            },
        },
        created: function (e) {
            let self = this;
            var day = new Date();
            day = new Date(day.getFullYear(), day.getMonth() + 1, 1);
            self.date = new Date(day - 86400000);
            self.getRepList();
            console.log(self.baseUrl+self.imgUrl)
        },
        destroyed(e){
            this.$store.commit('SET_REP_LIST',{retdata:[],callback:function () {}});
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .cell_txt_center {
        @include fontCommon();
        text-align: center;
        margin-bottom: $cl;
        margin-top: $bl;
    }

    .cell_border {
        @include sideBorder(bottom,$bc);
    }

    .div_add {
        @include cornerBtn();
        @include marginRow();
    }
    .div_hide{
        justify-content:center;
        align-items: center;
        padding:$sl;
        margin-top: $cl;
    }
    .img_search{
        @include wh(140px,140px);
    }
    .txt_hide{
        @include fontCommon($bs,$css-grey);
        @include marginColumn($sl);
    }
    .div_item{
        flex-direction:row;
        align-items: center;
        @include marginRow($bl);
    }
    .div_logo {
        padding: $sl;
        border-radius: $bRadius;
        text-align: center;
        @include fontCommon($ss, #fff);
    }
    .select_bg_true {
        background-color: #aaaaaa;
    }

    .select_bg_false {
        background-color: $colorCommon;
    }

</style>