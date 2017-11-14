<template>
    <div>
        <scroller>
            <div v-for="(item,index) in memberOperatorList" class="div_bottom">
                <cell-justify style="padding: 10px;" :txtLeft="item.Name" :txtRight="item.Value"></cell-justify>
            </div>
        </scroller>
    </div>
</template>


<script>
    var storage = weex.requireModule('storage');

    export default{
        components: {
            CellJustify: require('../../../components/cell-justify.vue'),
        },
        data(){
            return {
                baseUrl: '',
                nextUrl: '',
            }
        },
        computed: {
            memberOperatorList(){
//                console.log(this.$store.getters.getMemberOperatorList[0]);
                return this.$store.getters.getMemberOperatorList;
            },
        },
        methods: {
            queryMemberOperator(tokens){
                let self = this;
                var accessType = tokens.tokenType;
                var accessToken = tokens.accessToken;
//                var body="COMPANYCODE=999999";
                var body = {"COMPANYCODE": "999999"};
                var header = {
                    "content-type": "application/json",
                    "authorization": accessType + ' ' + accessToken
                };
                self.$store.dispatch('FETCH_QUERY_MEMBER_OPERATOR', {
                    body: body, header: header, callback: function (data) {

                    }
                })
            },
            getStorage(){
                let self = this;
                var tokens;
                storage.getItem("sy_token", function (e) {
                    if (e.result == "success" && e.data != "undefind") {
                        tokens = JSON.parse(e.data);
                        console.log(tokens);
                        self.queryMemberOperator(tokens)
                    } else {
                        self.$router.back();
                    }
                })
            },
        },
        created: function (e) {
            let self = this;
            self.getStorage();
        }
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../../style/mixin";

    .div_bottom {
        /*border-bottom-width: 10px;*/
        @include paddingRow(16px);
        @include paddingColumn(10px);
        border-bottom-width: 2px;
        border-color: $bg;

    }
</style>