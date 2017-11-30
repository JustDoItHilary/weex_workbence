<template>
    <div>
        <text @click="click">{{txt}}</text>
    </div>
</template>

<script>
    module.exports={
        props:{
            txt:{
                type:String
            }
        },
        methods:{
            click(){
                let self=this;
                self.txt="better than before"
            }
        },
    }
</script>