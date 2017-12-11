<template>
    <div  class="div_card" >
        <div   class="div_tit"  @click="clickShow">
            <text   class="txt_tit" >{{tit}}</text>
            <text   class="txt_else">{{txtElse}}</text>
        </div>
        <slot name="mess"></slot>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='CV'" v-for="(data,index) in item.List"   :class="['div_item',index>0?'border_bottom_grey':'']">
            <cell-justify   :txtLeft="data.tit" :txtRight="data.content"></cell-justify>
        </div>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='TS'"  >
            <text v-if="ts(item.Extra.TS_TITLE)"  class="txt_content div_item_ts">{{ts(item.Extra.TS_TITLE)}}</text>
            <text v-if="ts(item.Extra.TS_SUBTITLE)"  class="txt_content div_item_ts">{{ts(item.Extra.TS_SUBTITLE)}}</text>
        </div>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='TSLR'"   :class="['div_item',index>0?'border_bottom_grey':'']">
            <cell-justify   :txtLeft="ts(item.Extra.TS_TITLE)" :txtRight="item.Name!='SEGMENT_MEMBERS'?ts(item.Extra.TS_SUBTITLE):''">
                <text   
                       slot="else"
                       v-if="item.Name=='SEGMENT_MEMBERS'"
                       :class="['div_corner_'+(ts(item.Extra.TS_SUBTITLE)=='已签到')]"
                       @click="clickSign(ts(item.Extra.TS_SUBTITLE)=='已签到',item.Data[0])"> {{ts(item.Extra.TS_SUBTITLE)}} </text>
            </cell-justify>
        </div>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='CVMD'" v-for="(data,index) in item.List"   :class="['div_item',index>0?'border_bottom_grey':'']">
            <!--<cell-justify   :txtLeft="data.tit"></cell-justify>-->
            <!--<cell-justify   :txtLeft="data.content"></cell-justify>-->
            <text v-if="data.tit" class="txt_content">{{data.tit}}</text>
            <text v-if="data.content" class="txt_grey">{{data.content}}</text>
            <!--<text class="txt_common">{{data.tit}}</text>-->
            <!--<text class="txt_grey">{{data.content}}</text>-->
        </div>
    </div>
</template>

<script>
    export default{
        props: {
            tit: {
                type: String,
            },
            txtElse: {
                type: String,
            },
            content: {
                type: String,
            },
            name: {
                type: String,
            },
            item: {},

        },
        components: {
            cellJustify: require('./cell-justify.vue'),
        },
        computed: {
            baseUrl(){
                return this.$store.getters.baseUrl;
            },
            ratio(){
                return this.$store.getters.ratio;
            },
        },
        data(){
            return {
            }
        },
        methods: {
            clickShow(){
                let self=this;
                self.item.showed=!self.item.showed;
            },
            clickSign(bol,data){
                let self=this;
                if(!bol&&data.hasOwnProperty("GUID")){
                    var params={};
                    params.GUID=data.GUID;
                    self.$store.dispatch('FETCH_SIGN_IN',{params:params,callback:function () {
                        self.$emit('clickItem',"refresh");
                    }});
                }
            },
            ts(str){
                let self = this;
                var arr = self.toArr(str);
                if (self.item.Data && self.item.Data.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        for (var key in self.item.Data[0]) {
                            var key2=key.split(' ').join('');
                            arr[i]=arr[i].split(' ').join('');
                            if (key2 == arr[i]) {
                                str=str.replace(new RegExp('{'+arr[i]+'}' , 'g'), self.item.Data[0][key]);
                            }
                        }
                    }
                }
                return str
            },
        }
    }
</script>


<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../style/mixin";

    .div_card {
        background-color: #fff;
        padding: $cl;
        margin:$bl;
        @include borderCommon($borderW, $bc,$radius);
    }

    .div_tit {
        flex-direction: row;
        justify-content: space-between;
        @include marginColumn($sl);
        @include sideBorder(bottom,$colorCommon);
    }

    .txt_tit {
        color: $colorCommon;
        @include paddingColumn($sl);
        @include fontCommon($ss, $colorCommon);
    }

    .txt_else {
        color:$bc;
        @include paddingColumn($sl);
        @include fontCommon($ss, $bc);
    }

    .txt_content {
        @include fontCommon();
        @include sideBorder(bottoom);
    }
    .txt_grey{
        @include fontCommon($cs,$css-grey);
        margin-top: $cl;
    }

    .div_open {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .border_bottom {
        @include sideBorder(bottom, $colorCommon);
    }

    .border_bottom_grey {
        @include sideBorder(top, $bc);
    }

    .div_item {
        @include paddingColumn($cl);
    }
    .div_item_ts {
        @include paddingColumn($sl);
    }
    .div_corner_true{
        @include cornerBtn($cs,#fff,$bc,0px);
    }
    .div_corner_false{
        @include cornerBtn($cs,#fff,$colorCommon);
    }
</style>
