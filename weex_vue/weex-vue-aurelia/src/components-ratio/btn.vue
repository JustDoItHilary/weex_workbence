<template>
    <div v-ratio="ratio"  class="div_bottom">
        <div v-ratio="ratio"
             v-if="btnHeight"
             class="div_item_bottom"
             :style="{height: btnHeight}"
             @click="click">
            <text v-ratio="ratio" class="text_bottom">{{name}}</text>
        </div>
        <div v-else
             v-ratio="ratio"
             class="div_item_bottom"
             @click="click">
            <text v-ratio="ratio"   class="text_bottom">{{name}}</text>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            name: {
                type: String,
                required: true,
                default: 'LEFT'
            },
            btnHeight: {
                type: String,
                required: false,
                default: ''
            },
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
        methods:{
            click(){
                this.$emit('clickBtn');
            },
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";

    .div_bottom {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: $bgColor;
    }

    .div_item_bottom {
        @include marginRow();
        @include paddingColumn();
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: $colorCommon;
        flex-direction: row;
        flex:0.8;
    }

    .text_bottom {
        @include fontCommon($bs);
        text-align: center;
        color: #fff;
    }
</style>