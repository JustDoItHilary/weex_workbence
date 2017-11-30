<template>
    <div v-ratio="ratio"
         class="div_row">
        <div v-ratio="ratio"
             class="div_logo">
            <text v-ratio="ratio"
                  class="text_logo"
                  v-if="firName">{{firName}}</text>
            <image v-ratio="ratio"
                   class="img_logo"
                   v-if="imgLogoUrl"
                   :src="imgLogoUrl"></image>
        </div>
        <div v-ratio="ratio"
             class="div_member">
            <text v-ratio="ratio"
                  class="text_member"
                  v-if="tit">{{tit}}</text>
            <text v-ratio="ratio"
                  class="text_code"
                  v-if="content">{{content}}</text>
        </div>
        <slot v-ratio="ratio"
              class="div_member"
              name="endImg"></slot>
    </div>
</template>

<script>
    module.exports={
        props:{
            firName:{
                type:String
            },
            imgLogoUrl:{
                type:String
            },
            tit:{
                type:String
            },
            content:{
                type:String
            },
        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "../style/mixin";

    .div_row{
        flex-direction:row;
        justify-content:center;
        align-items: center;
    }

    .div_logo {
        @include wh(32px,32px);
        align-items: center;
        justify-content: center;
        border-radius: $bRadius;
    }

    .text_logo {
        @include fontCommon($bs,#fff);
    }
    .img_logo{
        @include wh();
    }

    .text_member {
        @include fontCommon($bs);
        flex:1;
    }

    .text_code {
        @include fontCommon($cs, #898989);
        flex:1;
        margin-top: $sl;
    }

    .div_member {
        flex: 1;
        margin-left: $sl;
    }
</style>
