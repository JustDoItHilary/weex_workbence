<template>
    <div>
        <div v-ratio="ratio"
             class="div_logo">
            <text v-ratio="ratio"
                  class="text_logo">{{item.fir}}</text>
        </div>
        <div v-ratio="ratio"
             class="div_member">
            <div v-ratio="ratio"
                 style="flex:1;">
                <text v-ratio="ratio"
                      class="text_member">{{item.USERNAME}}</text>
            </div>
            <div v-ratio="ratio"
                 class="div_select"
                 v-if="getSelected(item)">
                <image v-ratio="ratio"
                       class="img_select"
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