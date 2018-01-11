<template>
    <div class="div_root" append="tree" >
        <cell-header tit="营销活动"></cell-header>
        <cell-error v-if="errorInfo.errorMess" :errorImg="errorInfo.errorImg" :errorMess="errorInfo.errorMess"></cell-error>
        <scroller class="scroll">
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
            cellHeader: require('../../components/header/yyzs-header.vue'),
            CellCard: require('../../components/cell-card.vue'),
            cellError: require('../../components/error.vue')
        },
        data(){
            return {
                ratio: 1,
                refreshing: false,
            }
        },
        computed: {
            params(){
                return this.$route.params.params;
            },
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
            member(){
                return this.$store.getters.getMemberInfo;
            },
//            ratio(){
//                return this.$store.getters.ratio;
//            },
        },
        methods: {
//            onrefresh (event) {
//                console.log('is refreshing');
//                this.refreshing = true;
//                setTimeout(() => {
//                    this.refreshing = false;
//                }, 2000);
//            },
            clickItem(ret){
                if(ret==="refresh"){
                    this.getData();
                }
            },
            getData(){
                let self = this;
                var par = {};
                par.ID = self.params;
                self.$store.dispatch('FETCH_GET_CRM', {params: JSON.stringify(par)});
            }
        },
        created: function (e) {
            let self = this;
            self.getData();
        },
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_root{
        background-color:$wg;
    }
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