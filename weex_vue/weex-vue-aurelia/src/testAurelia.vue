<template>
    <div class="div_root">
        <input class="input" @input="input($event)"/>
        <text class="search" @click="search">search</text>
    </div>
</template>

<script>
    var event = weex.requireModule('event');
    var navigator=weex.requireModule('navigator');

    export default{
        data(){
            return {
                data:''
            }
        },
        methods:{
            input(e){
                let self=this;
                self.data=e.value;
                console.log(self.data);
            },
            search(){
                var url='http://192.168.100.120:8888/weex/'+this.data+'.js';
                console.log(url);
                var option={
                    url:url,
                    animated:true
                };
                navigator.push(option,function () {

                });
//                event.openURL(url);
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "./style/mixin";

    .div_root{
    }
    .input{
        border-width: 1px;
        margin:20px;
        padding:20px;
    }
    .search{
        margin:20px;
        padding:20px;
        text-align:center;
    }
</style>