<template>
    <div>
        <div class="div_logo">
            <text class="text_logo">{{item.fir}}</text>
        </div>
        <div class="div_member">
            <div style="flex:1;">
                <text class="text_member">{{item.USERNAME}}</text>
            </div>
            <div class="div_select"
                 v-if="getSelected(item)">
                <image class="img_select"
                       :src="baseUrl+imgUrl"></image>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports={
        props:{

        },
        computed:{
            ratio(){
                return this.$store.getters.ratio;
            }
        },
    }
</script>