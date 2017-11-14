<template>
    <div>
        <head-top goBack="true" :headTitle="cityName">
            <router-link slot="changecity" to="/home" class="change_city">切换城市</router-link>
        </head-top>
        <form class="city_form">
            <div>
                <input placeholder="输入学校、商务楼、地址" @input="input" class="style_input input_style"/>
            </div>
            <div>
                <input value="提交" class="style_sub input_style"/>
            </div>
        </form>
        <span class="his_span">搜索历史</span>
        <ul class="his_list">
            <li v-for="item in searchHistories">
                <h4 class="his_name">{{item.name}}</h4>
                <p class="his_address">{{item.address}}</p>
            </li>
        </ul>
        <footer class="foot_clear">清空所有</footer>
    </div>
</template>

<script>
    module.exports = {
        components: {
            headTop: require('../../components/header/ele-header.vue')
        },
        data(){
            return {
                cityName: '青岛',
                searchHistories:[
                    {name:'青岛软件园',address:'山东省青岛市市南区宁夏路288号'},
                ]
            }
        },
        methods:{
            input:function (e) {

            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "../../style/mixin";

    .change_city {
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
    }

    .city_form {
        margin-top: .4rem;
        padding-top: .4rem;
        background-color: #fff;
        border-top: 2px solid $bg;
        border-bottom: 6px solid $bg;
        align-items: center;
        justify-content: center;

        div{
            width: 90%;
            margin:0 auto;

            .input_style{
                border-radius: .1rem;
                margin-bottom: .4rem;
                @include wh(100%, 1rem);
            }
            .style_input{
                border:2px solid $bg;
                padding: .4rem;
                @include sc(0.5rem, #333);
            }
            .style_sub{
                background-color: $blue;
                @include sc(0.5rem, $fc);
                text-align: center;
            }
        }
    }
    .his_span{
        padding-left: .4rem;
        @include font(0.4rem, .8rem);
    }
    .his_list{
        border-top: 6px solid $bg;
        background-color: #fff;

        li{
            flex-direction:column;
            padding-left: .6rem;
            padding-top:.4rem;
            padding-bottom:.4rem;
            border-bottom: 2px solid $bg;

            .his_name{
                padding-bottom: .3rem;
                line-height: 1rem;
                @include sc(.6rem,#333);
            }
            .his_address{
                @include sc(.4rem,#999);
            }
        }
    }
    .foot_clear{
        background-color:#fff;
        text-align: center;
        @include sc(.6rem,#666);
        padding:.4rem;
    }
</style>