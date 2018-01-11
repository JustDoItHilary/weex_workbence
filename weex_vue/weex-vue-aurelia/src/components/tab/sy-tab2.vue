<template>
    <div class="border_bottom">
            <div v-for="(item,index) in list"
                 :class="['flex_center',getStyle(index), 'div_select_' + (selected==index)] "
                 @click="clickTab(index)"
            >
                <text :class="['text_center', 'txt_select_' + (selected==index)]">{{item}}</text>
            </div>
    </div>
</template>

<script>
    export default  {
        props: {
            list: {},
            selected: {
                default: 0
            },
        },
        components: {},
        computed: {},
        data(){
            return {}
        },
        methods: {
            getStyle(index){
                return index == 0 ? 'div_tab_left' : (index == this.list.length - 1 ? 'div_tab_right' : 'div_tab')
            },
            clickTab(index){
                this.selected = index;
                this.$emit('clickTabPar', index);
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .border_bottom {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-width: 1wx;
        border-radius: $radius;
        border-color: $colorCommon;
    }
    .flex_center {
        flex: 1;
        justify-content: center;
        align-items: center;
        @include paddingColumn($slw);
    }
    .text_center {
        flex:1;
        text-align: center;
        lines:1;
        @include fontCommon();
    }
    .txt_select_false {
        color: $colorCommon;
    }
    .txt_select_true {
        color: $fc;
    }
    .div_select_true {
        background-color: $colorCommon;
    }
    .div_select_false {
        background-color: $fc;
    }

    .div_tab {
        border-color: $colorCommon;
        border-left-width: $borderW;
        /*border-top-width: 2;*/
        /*border-bottom-width: 2;*/
        border-right-width: $borderW;
        /*border-width: 2px;*/
    }
    .div_tab_left {
        border-top-left-radius: $radius;
        border-bottom-left-radius: $radius;
        border-color: $colorCommon;
        /*border-top-width: 2;*/
        /*border-bottom-width: 2;*/
        /*border-left-width: 2;*/
        border-right-width:$borderW;
        /*border-width: 2px;*/
    }
    .div_tab_right {
        border-top-right-radius: $radius;
        border-bottom-right-radius: $radius;
        border-color: $colorCommon;
        /*border-width: 2;*/
        border-left-width: $borderW;
        /*border-top-width: 2;*/
        /*border-bottom-width: 2;*/
        /*border-right-width: 2;*/
    }
</style>