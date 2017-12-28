<template>
    <div class="div_root">
        <cell-error :errorMess="errorInfo.errorMess"></cell-error>
    </div>
</template>

<script>
    const configModule = weex.requireModule('configModule');
    const modal = weex.requireModule('modal');
    const navigator = weex.requireModule('navigator');

    module.exports = {
        components: {
            CellError: require('../../components/error.vue'),
        },
        computed: {
            errorInfo(){
                return this.$store.getters.errorInfo;
            },
            params(){
                return this.$route.params.params;
            },
        },
        data(){
            return {
                baseUrl: '',
            }
        },
        methods: {
            repairMember(){
                let self=this;
                var params={};
                params.MEMBERID=JSON.parse(self.params).memberID;
                self.$store.dispatch('FETCH_SY_REPAIR_MEMBER',{params: JSON.stringify(params),callback:function () {
                    self.$router.back();
                }})
            }
        },
        created(e){
            let self = this;
            self.$store.commit('SET_ERROR', {showType:2 ,mess: "会员信息修复中..."});
            self.repairMember();
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .div_root {
        background-color: $wg;
    }
</style>