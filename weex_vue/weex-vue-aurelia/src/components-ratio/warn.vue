<template>
    <div>
        <text v-ratio="ratio" class="class_txt" ref="mark">{{txt}}</text>
    </div>
</template>

<script>
    module.exports={
        props:{
            txt:{
                type:String,
                required:true
            }
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

    .class_txt{
        @include fontCommon($ss,#f00);
        text-align: left;
    }
</style>