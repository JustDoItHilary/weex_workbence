<template>
    <div class="root">
        <scroller scroll-direction="horizontal"
                  style="flex-direction: row;"
                  :class="[isiOS? 'scroll':'' ]">
            <div v-for="(item,index) in tabs"
                 :class="['div_tab',showBorderBottom&&item.visiable?'border_selected':'',showBorderBottom&&(!item.visiable)?'border_selected_false':'']"
                 :style="{width:tabWidth+'px'}"
                 @click="clickTab(item)">
                <image v-if="item.imgUrl"
                       class="img_logo"
                       :src="item.visiable?item.selectedImgUrl:item.imgUrl"
                ></image>
                <text class="txt_tit"
                      :style="{ color:item.visiable?item.activeTitColor:item.titColor,fontSize:fontSize+'px' }"
                >{{item.tit}}</text>
            </div>
        </scroller>
    </div>
</template>

<script>
    export default{
        props: {
            tabs: {
                type: Array,
                required: true,
            },
            fontSize:{
                type:String,
                default:28
            },
            showBorderBottom:{
                type:Boolean,
                default:false,
            }
        },
        computed: {
            tabWidth(){
                return 750 / this.tabs.length
            },
        },
        data(){
            return {
                isiOS: false,
            }
        },
        methods: {
            clickTab(item){
                let self = this;
//                self.$router.push(item.src)
                for (var i = 0; i < self.tabs.length; i++) {
                    self.tabs[i].visiable = false;
                }
                item.visiable = true;
            }
        },
        created: function (e) {
            let self = this;
            self.isiOS = self.$getConfig().env.platform == 'iOS';
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .root {
        /*position: fixed;*/
        /*z-index:100;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        justify-content: center;
    }

    .div_tab {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .img_logo {
        width: 48px;
        height: 48px;
        background-color: $colorCommon;
    }

    .txt_tit {
        lines:1;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .scroll {
        height: 80px;
    }
    .border_selected{
        border-bottom-width: 6px;
        border-color: $colorCommon;
        padding-bottom:18px;
    }
    .border_selected_false{
        border-bottom-width: 1px;
        border-color: $bc;
        padding-bottom:24px;
    }
</style>