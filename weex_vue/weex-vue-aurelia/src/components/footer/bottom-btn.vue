<template>
    <div  class="div_bottom">
        <cell-btn
                  class="style_btn"
                  :btnHeight="btnHeight"
                  :name="txtLeft"
                  @clickBtn="left"></cell-btn>
        <cell-btn
                  v-if="txtRight"
                  class="style_btn"
                  :btnHeight="btnHeight"
                  :name="txtRight"
                  @clickBtn="right"></cell-btn>
    </div>
</template>

<script>
    module.exports = {
        props: {
            txtLeft: {
                type: String,
                required: true,
                default: 'LEFT'
            },
            txtRight: {
                type: String,
                required: false,
                default: ''
            },
            btnHeight: {
                type: String,
                required: false,
                default: ''
            },
            left: {
                type: Function
            },
            right: {
                type: Function
            },
        },
        components: {
            cellBtn: require('../btn.vue'),
        },
        computed: {
            ratio(){
                return this.$store.getters.ratio;
            }
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../../style/mixin.scss";

    .div_bottom {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: $fc;
    }

    .style_btn {
        flex:1;
    }

</style>