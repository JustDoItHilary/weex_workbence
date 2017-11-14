<template>
    <div>
        <text class="class_txt" ref="mark">{{txt}}</text>
    </div>
</template>

<script>
    module.exports={
        props:{
            txt:{
                type:String,
                required:true
            }
        }
    }
</script>

<style scoped>
    .class_txt{
        font-size: 18px;
        text-align: left;
        color:red;
    }
</style>