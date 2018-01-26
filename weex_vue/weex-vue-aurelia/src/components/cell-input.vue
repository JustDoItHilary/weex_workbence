<template>
    <div>
        <div class="div-tit"
             v-if="txtTit">
            <text class="tit"
                  style="flex:1;">{{txtTit}}</text>
            <text class="tit color_active"
                  @click="clickPick">{{txtList.length>0?txtList[index].NAME:''}}</text>
            <slot name='arrow-right'
                  @click="clickPick"></slot>
            <!--<img class="img" src="../../assets/img/ic_keyboard_arrow_right_black_48dp.png" @click="clickPick"/>-->
        </div>
        <textarea v-if="txtHide"
                  ref="inputArea"
                  type="text"
                  class="content input_content"
                  :value="txtInput"
                  :rows="txtLines"
                  @input="inputContent($event)"
                  :placeholder="txtHide"></textarea>
        <text v-if="!txtHide&&txtInput"
              class="content">{{txtInput}}</text>
        <slot name="content"></slot>
    </div>
</template>

<script>
    const picker = weex.requireModule('picker');

    module.exports={
        props:{
            //标题
            txtTit:{
                type:String,
                required:false
            },
            //标题右侧 picker 选项内容
            txtList:{
                type:Array,
                required:false,
                default: function () {
                    return []
                }
            },
            //picker 初始选项，默认显示0项
            index:{
                type:Number,
                required:false,
                default:0
            },
            //textarea 输入内容
            txtInput:{
                type:String,
                required:false,
                default:''
            },
            //textarea 提示内容
            txtHide:{
                type:String,
                required:false,
                default:''
            },
            //textarea 显示的行数，默认为3行
            txtLines:{
                type:String,
                required:false,
                default:'3'
            },
            //页面中引用多个该组件的标记
            type:{
                type:String
            }
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            },
            getList:function () {
                let list=[];
                for(let key of this.txtList){
                    list.push(key.NAME)
                }
                return list;
            }
        },
        methods:{
            clickPick:function () {
                let self=this;
                picker.pick({
                    index: self.index, items: self.getList
                }, function (ret) {
                    if (ret.result == 'success') {
                        self.index=ret.data;
                        self.$emit('clickCellInput',self.txtList[self.index].GUID,self.txtInput,self.type);
//                        console.log(self.txtList[self.index].GUID)
                    }
                });
            },
            inputContent:function (e) {
                let self=this;
                self.txtInput=e.value;
                self.$emit('clickCellInput',self.txtList.length>0?self.txtList[self.index].GUID:'',self.txtInput,self.type);
//                console.log(self.txtInput,self.index)
            },
            clickBlur(){
//                console.log("clickBlur",this.$refs['inputArea']);
                if(this.txtHide){
                    this.$refs['inputArea'].blur();
                }
            },
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin";

    .div-tit{
        @include divRow;
        justify-content:center;
    }
    .tit{
    @include fontCommon;
    }
    .color_active{
        color: $colorCommon;
    }
    .img{
    @include wh();
    }
    .content{
        @include marginColumn($sl);
        @include fontCommon;
        padding:$cl;
        background-color:$wg;
    }
    .input_content{
    @include borderCommon;
    }
</style>