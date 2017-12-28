<template>
    <div
            :style="{ backgroundColor: backgroundColor }"
            class="container"
            @click="onclickitem">
        <div
                :style="{backgroundColor:lineColor}"
                class="top-line"></div>
        <image
                :src="icon"
                class="tab-icon"></image>
        <text
                :style="{ color: titleColor }"
                class="tab-text">{{title}}</text>
    </div>
</template>

<script>
    module.exports = {
        props: {
            index: {default: 0},
            title: {default: ''},
            titleColor: {default: '#000000'},
            icon: {default: ''},
            backgroundColor: {default: '#ffffff'},
            lineColor: {default: '#d9d9d9'}
        },
        methods: {
            onclickitem: function (e) {
                var params = {
                    index: this.index
                };
                this.$emit('tabItemOnClick', params);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .container {
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 88;
    }

    .top-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2;
    }

    .tab-icon {
        margin-top: 5;
        width: 40;
        height: 40
    }

    .tab-text {
        margin-top: 5;
        text-align: center;
        font-size: 20;
    }
</style>
