<template>
    <div class="border_bottom">
            <div v-for="(item,index) in list"
                 :class="['flex_center',getClass(index), 'div_select_' + (selected==index)] "
                 :style="getWidth()"
                 @click="clickTab(index)"
            >
                <text :class="['text_center', 'txt_select_' + (selected==index)]">{{item[name]}}</text>
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
            tabMargin:{
                require:true,
            },
            name:{
            }
        },
        components: {},
        computed: {},
        data(){
            return {}
        },
        methods: {
            getClass(index){
                return index == 0 ? 'div_tab_left' : (index == this.list.length - 1 ? 'div_tab_right' : 'div_tab')
            },
            getWidth(){
                var style={};
                style.width=parseInt((750 - 2 * this.tabMargin) / this.list.length);
//                console.log(style);
                return style;
            },
//            getStyle(){
//                var style = {};
//                var lenElse = 750 - parseInt((750 - 2 * this.tabMargin) / this.list.length) * this.list.length;
//                style.marginLeft = parseInt(lenElse / 2);
//                style.marginRight = lenElse - style.marginLeft;
////                console.log(style);
//                return style;
//            },
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
    }
    .flex_center {
        /*flex: 1;*/
        flex-direction: row;
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
        border-top-width: 2*$borderW;
        border-bottom-width: 2*$borderW;
        border-left-width: 2*$borderW;
    }
    .div_tab_left {
        border-top-left-radius: $radius;
        border-bottom-left-radius: $radius;
        border-color: $colorCommon;
        border-top-width: 2*$borderW;
        border-bottom-width: 2*$borderW;
        border-left-width: 2*$borderW;
    }
    .div_tab_right {
        border-top-right-radius: $radius;
        border-bottom-right-radius: $radius;
        border-color: $colorCommon;
        border-width: 2*$borderW;
    }
</style>