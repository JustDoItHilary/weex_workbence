<template>
    <!--<div v-ratio="ratio" class="div_card" style="margin: 16;padding: 8;border-width: 0.5;">-->
        <!--<div v-ratio="ratio" class="div_tit" style="margin-top: 4;margin-bottom: 4;border-bottom-width: 1;">-->
            <!--<text v-ratio="ratio" class="txt_tit" style="padding-top: 4;padding-bottom: 4;font-size: 12;">{{tit}}</text>-->
            <!--<text v-ratio="ratio" class="txt_else" style="padding-top: 4;padding-bottom: 4;font-size: 12;" @click="clickShow">{{txtElse}}</text>-->
        <!--</div>-->
        <!--<slot name="mess"></slot>-->
        <!--<div v-if="item.showType&&item.Extra.SHOWTYPE=='CV'" v-for="(data,index) in item.List" v-ratio="ratio" :class="['div_item',index>0?'border_bottom_grey':'']">-->
            <!--<cell-justify v-ratio="ratio" :txtLeft="data.tit" :txtRight="data.content"></cell-justify>-->
        <!--</div>-->
        <!--<div v-if="item.showType&&item.Extra.SHOWTYPE=='TS'" v-ratio="ratio">-->
            <!--<text v-ratio="ratio" class="txt_content div_item_ts">{{ts(item.Extra.TS_TITLE)}}</text>-->
            <!--<text v-ratio="ratio" class="txt_content div_item_ts">{{ts(item.Extra.TS_SUBTITLE)}}</text>-->
        <!--</div>-->
        <!--<div v-if="item.showType&&item.Extra.SHOWTYPE=='TSLR'" v-ratio="ratio" :class="['div_item',index>0?'border_bottom_grey':'']">-->
            <!--<cell-justify v-ratio="ratio" :txtLeft="ts(item.Extra.TS_TITLE)" :txtRight="item.Name!='SEGMENT_MEMBERS'?ts(item.Extra.TS_SUBTITLE):''">-->
                <!--<text  v-ratio="ratio"-->
                       <!--slot="else"-->
                       <!--v-if="item.Name=='SEGMENT_MEMBERS'"-->
                       <!--:class="['div_corner_'+(ts(item.Extra.TS_SUBTITLE)=='已签到')]"-->
                       <!--@click="clickSign"> {{ts(item.Extra.TS_SUBTITLE)}} </text>-->
            <!--</cell-justify>-->
        <!--</div>-->
        <!--<div v-if="item.showType&&item.Extra.SHOWTYPE=='CVMD'" v-for="(data,index) in item.List" v-ratio="ratio" :class="['div_item',index>0?'border_bottom_grey':'']">-->
            <!--<cell-justify v-ratio="ratio" :txtLeft="data.tit"></cell-justify>-->
            <!--<cell-justify v-ratio="ratio" :txtRight="data.content"></cell-justify>-->
        <!--</div>-->
    <!--</div>-->
    <div   class="div_card" >
        <div   class="div_tit" >
            <text   class="txt_tit" >{{tit}}</text>
            <text   class="txt_else" @click="clickShow">{{txtElse}}</text>
        </div>
        <slot name="mess"></slot>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='CV'" v-for="(data,index) in item.List"   :class="['div_item',index>0?'border_bottom_grey':'']">
            <cell-justify   :txtLeft="data.tit" :txtRight="data.content"></cell-justify>
        </div>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='TS'"  >
            <text   class="txt_content div_item_ts">{{ts(item.Extra.TS_TITLE)}}</text>
            <text   class="txt_content div_item_ts">{{ts(item.Extra.TS_SUBTITLE)}}</text>
        </div>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='TSLR'"   :class="['div_item',index>0?'border_bottom_grey':'']">
            <cell-justify   :txtLeft="ts(item.Extra.TS_TITLE)" :txtRight="item.Name!='SEGMENT_MEMBERS'?ts(item.Extra.TS_SUBTITLE):''">
                <text   
                       slot="else"
                       v-if="item.Name=='SEGMENT_MEMBERS'"
                       :class="['div_corner_'+(ts(item.Extra.TS_SUBTITLE)=='已签到')]"
                       @click="clickSign"> {{ts(item.Extra.TS_SUBTITLE)}} </text>
            </cell-justify>
        </div>
        <div v-if="item.showed&&item.Extra.SHOWTYPE=='CVMD'" v-for="(data,index) in item.List"   :class="['div_item',index>0?'border_bottom_grey':'']">
            <cell-justify   :txtLeft="data.tit"></cell-justify>
            <cell-justify   :txtRight="data.content"></cell-justify>
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
                self.item.showType=!self.item.showType;
            },
            clickSign(){

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
        /*<!--border-color: $bc;-->*/
        /*<!--border-radius: $radius;-->*/
        padding: 2*$cl;
        @include borderCommon($borderW, $bc,$radius);
        @include marginRow(2*$bl);
        @include marginColumn(2*$bl);
    }

    .div_tit {
        flex-direction: row;
        justify-content: space-between;
        @include marginColumn(2*$sl);
        @include sideBorder(bottom,$colorCommon);
    }

    .txt_tit {
        color: $colorCommon;
        @include paddingColumn(2*$sl);
        @include fontCommon(2*$ss, $colorCommon);
    }

    .txt_else {
        color:$bc;
        @include paddingColumn(2*$sl);
        @include fontCommon(2*$ss, $bc);
    }

    .txt_content {
        @include fontCommon(2*$cs);
        @include sideBorder(bottoom);
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
        @include paddingColumn(2*$cl);
    }
    .div_item_ts {
        @include paddingColumn(2*$sl);
    }
    .div_corner_true{
        @include cornerBtn(2*$cs,#fff,$bc,0px);
    }
    .div_corner_false{
        @include cornerBtn(2*$cs,#fff,$colorCommon);
    }
</style>
