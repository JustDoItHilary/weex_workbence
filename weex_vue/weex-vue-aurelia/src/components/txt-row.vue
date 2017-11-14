<template>
    <div class="div_select">
        <slot name="ahead"></slot>

        <text class="text_value" v-if="txt">{{txt}}</text>
        <text class="text_value" v-if="content">{{content}}</text>

        <slot name="behind"></slot>
    </div>
</template>

<script>
    module.exports = {
        props: [
            "txt","content"
        ],
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div_select {
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
        margin-left: 50px;
        margin-right: 10px;
    }

    .text_value {
        font-size: 18px;
        text-align: left;
    }

</style>