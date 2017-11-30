<template>
    <div v-ratio="ratio"
         class="div-time"
         :style="{'borderBottomWidth':bottomBorder}">
        <text v-ratio="ratio"
              style="font-size: 14;"
              class="txt-left">{{txtLeft}}</text>
        <div v-ratio="ratio"
             class="div_right">
            <text v-ratio="ratio"
                  :class="['txt-right','txt-actived-'+active]"
                  v-if="txtRight"
                  @click="clickRight">{{txtRight}}</text>
            <text v-if="txtRightElse"
                  v-ratio="ratio"
                  :class="['txt-right','txt-actived-'+active]">{{txtRightElse}}</text>
        </div>
        <image v-ratio="ratio" class="img_open" :src="baseUrl+imgUrl" v-if="imgUrl"></image>
        <slot name="else"></slot>
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
                required:false,
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
            },
            imgUrl:{
                type:String
            }
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            },
            baseUrl(){
                return this.$store.getters.baseUrl;
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
        flex-direction:row;
        justify-content:space-between;
        /*align-items:center;*/
        border-color: $bc;
    }
    .txt-left{
//    @include fontCommon;
    }
    .txt-right{
    @include fontCommon;
        text-align: right;
    }
    .txt-actived-true{
        color:$colorCommon;
    }
    .txt-actived-false{
        color:$css-grey;
    }
    .div_right{
        flex:1;
        margin-left:$cl;
        justify-content: center;
    }
    .img_open{
        @include wh();
    }
</style>