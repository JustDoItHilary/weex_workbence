
<template>
    <div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "./style/mixin";

    .item {
        flex: 1;
        justify-content: center;
        align-items: center;
        border-width: 1;
    }

    .row {
        flex-direction: row;
    }
    .item2{
        flex:1;
        justify-content: center;
        align-items:center;
        border-width:1;
    }
    .row2{
        flex-direction: row;
        height:80px;
    }
</style>
<script>
    module.exports = {
        components: {
            CellTab: require('./components/tab/sy-tab.vue')
        },
        data: function () {
            return {
                list: ["全部", "重点商品", "重点孕婴", "重点糖sdfsdfs尿病", "重点商品", "重点孕婴", "重点糖sdfsdfs尿病"],
            }
        },
        methods:{
        },
    }
</script>