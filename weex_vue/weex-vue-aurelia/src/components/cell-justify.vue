<template>
    <div class="div-time" :style="{'borderBottomWidth':bottomBorder+'px'}">
        <text class="txt-left">{{txtLeft}}</text>
        <div style="margin-left: 20px;justify-content: center;">
            <text :class="['txt-right','txt-actived-'+active]" @click="clickRight">{{txtRight}}</text>
            <text v-if="txtRightElse" :class="['txt-right','txt-actived-'+active]">{{txtRightElse}}</text>
        </div>
    </div>
</template>

<script>
    const picker = weex.requireModule('picker');
    module.exports={
        props:{
            txtLeft:{
                type:String,
                required:true,
                default:''
            },
            txtRight:{
                type:String,
                required:true,
                default:''
            },
            txtRightElse:{
                type:String,
                required:false,
                default:''
            },
            active:{
                type:Boolean,
                required:false,
                default:false
            },
            bottomBorder:{
                type:String,
                required:false,
                default:'0'
            },
            type:{
                type:String,
                required:false
            }
        },
        methods:{
            clickRight:function () {
                let self = this;
                if (self.active) {
                    let date = new Date();
                    picker.pickDate({
                        value: self.txtRight,
                        max: self.formatDate(new Date(date.getFullYear() + 10, date.getMonth(), date.getDay()), 'yyyy-MM-dd'),
                        min: self.formatDate(new Date(date.getFullYear() - 10, date.getMonth(), date.getDay()), 'yyyy-MM-dd')
                    }, function (event) {
                        if (event.result === 'success') {
                            self.txtRight=event.data;
                            self.$emit('clickCellTime',event.data,self.type)
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin.scss";

    .div-time{
    /*@include paddingRow;*/
    /*@include paddingColumn;*/
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        border-color: $bc;
    }
    .txt-left{
    @include fontCommon;
    }
    .txt-right{
    @include fontCommon;
        flex:1;
        text-align: right;
    }
    .txt-actived-true{
        color:$colorCommon;
    }
    .txt-actived-false{
        color:$css-grey;
    }
</style>