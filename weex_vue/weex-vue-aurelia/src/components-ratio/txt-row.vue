<template>
    <div v-ratio="ratio"
         class="div_select">
        <slot v-ratio="ratio"
              name="ahead"></slot>

        <text v-ratio="ratio"
              class="text_value"
              v-if="txt">{{txt}}</text>
        <text v-ratio="ratio"
              class="text_value"
              v-if="content">{{content}}</text>

        <slot v-ratio="ratio"
              name="behind"></slot>
    </div>
</template>

<script>
    module.exports = {
        props: [
            "txt","content"
        ],
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div_select {
        flex-direction: row;
        align-items: center;
        margin-top: $sl;
        margin-left: $bl;
        margin-right: $sl;
    }

    .text_value {
        @include fontCommon($ss);
        text-align: left;
    }

</style>