<template>
    <div append="node" >
        <cell-header tit="营销活动"></cell-header>
        <cell-error v-if="errorInfo.errorImg&&errorInfo.errorMess" :errorImg="errorInfo.errorImg" :errorMess="errorInfo.errorMess"></cell-error>
        <scroller class="scroll">
            <!--<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">-->
                <!--<text class="indicator">加载中 ...</text>-->
            <!--</refresh>-->
            <!--<div v-ratio="ratio" class="div_card" v-for="item in member">-->
            <!--&lt;!&ndash;<text v-ratio="ratio" class="txt_tit border_bottom">会员信息</text>&ndash;&gt;-->
            <!--&lt;!&ndash;<text v-ratio="ratio" class="txt_content border_bottom">{{content}}</text>&ndash;&gt;-->
            <!--&lt;!&ndash;<div v-ratio="ratio" class="div_open">&ndash;&gt;-->
            <!--&lt;!&ndash;<text v-ratio="ratio" class="txt_content" style="flex:1;">展开</text>&ndash;&gt;-->
            <!--&lt;!&ndash;<image v-ratio="ratio" class="img_open" :src="baseUrl+imgOpenUrl"></image>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<cell-justify :txtLeft="item.Extra.DESC" txtRight="折叠"></cell-justify>-->
            <!--<div v-if="item.Extra.SHOWTYPE=='CV'" v-for="data in item.List">-->
            <!--<cell-justify :txtLeft="data.tit" :txtRight="data.content" ></cell-justify>-->
            <!--</div>-->
            <!--<div v-if="item.Extra.SHOWTYPE=='TS'" v-for="data in item.List">-->
            <!--<cell-justify :txtLeft="data.tit" :txtRight="data.content" ></cell-justify>-->
            <!--</div>-->
            <!--</div>-->
            <div v-for="item in member">
                <cell-card :tit="item.Extra.DESC" :txtElse="item.showed?'折叠':'展开'" :item="item" @clickItem="clickItem"></cell-card>
            </div>
        </scroller>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');

    export default{
        components: {
            cellHeader: require('../../../components/header/apply-header.vue'),
            CellCard: require('../../../components/cell-card.vue'),
            CellJustify: require('../../../components/cell-justify.vue'),
            cellError: require('../../../components/error.vue')
        },
        data(){
            return {
                ratio: 1,
                refreshing: false,
                list: [1, 2],
            }
        },
        computed: {
            params(){
                return this.$route.params.params;
            },
            member(){
                return this.$store.getters.getMemberInfo;
            },
            ratio(){
                return this.$store.getters.ratio;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
        },
        methods: {
            onrefresh (event) {
                console.log('is refreshing');
                this.refreshing = true;
                setTimeout(() => {
                    this.refreshing = false;
                }, 2000);
            },
            //关闭界面，退出
            clickClose: function () {
                configModule.finish();
            },
            clickItem(ret){
                if(ret==="refresh"){
                    this.getData();
                }
            },
            getData(){
                let self = this;
                var par = {};
                par.ID = self.params;
//                params.ID="C-00000152";
                self.$store.dispatch('FETCH_GET_CRM', {params: JSON.stringify(par)});
//                console.log("member",self.$store.getters.getMemberInfo)
            }
        },
        created: function (e) {
            let self = this;
            self.getData();
        },
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../../style/mixin";

    .scroll {
        background-color: $wg;
        flex:1;
    }

    .div_card {
        background-color: #fff;
        border-width: 1px;
        border-color: $bc;
        border-radius: $radius;
        padding: $cl;
        @include marginRow($bl);
        @include marginColumn($sl);
    }

    .txt_tit {
        @include paddingColumn($sl);
        @include fontCommon();
    }

    .txt_content {
        @include paddingColumn($cl);
        @include fontCommon($ss);
        margin-top: $sl;
    }

    .div_open {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .img_open {
        @include wh();
    }

    .border_bottom {
        @include sideBorder(bottom, $bc);
    }
</style>