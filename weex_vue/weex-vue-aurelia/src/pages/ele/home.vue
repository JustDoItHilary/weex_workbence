<template>
    <div>
        <head-top signin-up="home">
            <span slot="logo" class="head_logo">ele.me</span>
        </head-top>
        <cell-logo-text tit="会员信息" content="test" :imgLogoUrl="baseUrl+'/drawable/ic_perm_identity_white_48dp.png'">
            <img slot="endImg" class="img_end" :src="baseUrl+'/drawable/ic_keyboard_arrow_down_black_48dp.png'"/>
        </cell-logo-text>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>选择</span>
            </div>
            <router-link :to="'/elm-city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <svg class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
        </nav>
        <section id="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link tag="li" class="li_city" v-for="item in hotcity" :to="'/elm-city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <scroller class="letter_classify">
                <!--<li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">-->
                    <!--<h4 class="city_title">{{key}}-->
                        <!--<span v-if="index == 0">（按字母排序）</span>-->
                    <!--</h4>-->
                    <!--<ul class="groupcity_name_container citylistul clear">-->
                        <!--<router-link tag="li" v-for="item in value" :to="'/elm-city/' + item.id" :key="item.id"-->
                                     <!--class="ellipsis">-->
                            <!--{{item.name}}-->

                        <!--</router-link>-->
                    <!--</ul>-->
                <!--</li>-->
            </scroller>
        </section>
    </div>
</template>

<script>
    import {cityGuess, hotcity, groupcity} from '../../service/getData'

    export default {
        data(){
            return {
                baseUrl:'http://192.168.100.120:8888/weex',
                guessCity: '青岛',   //当前城市
                guessCityid: '1', //当前城市id
                hotcity: [{
                    "pinyin": "shanghai",
                    "is_map": true,
                    "longitude": 121.473701,
                    "latitude": 31.23037,
                    "sort": 1,
                    "area_code": "021",
                    "abbr": "SH",
                    "name": "上海",
                    "id": 1
                }, {
                    "pinyin": "haerbin",
                    "is_map": true,
                    "longitude": 126.535797,
                    "latitude": 45.802158,
                    "sort": 4,
                    "area_code": "0451",
                    "abbr": "HEB",
                    "name": "哈尔滨",
                    "id": 10
                }, {
                    "pinyin": "nanjing",
                    "is_map": true,
                    "longitude": 118.504669,
                    "latitude": 31.84178,
                    "sort": 5,
                    "area_code": "025",
                    "abbr": "NJ",
                    "name": "南京",
                    "id": 6
                }, {
                    "pinyin": "guangzhou",
                    "is_map": true,
                    "longitude": 113.264359,
                    "latitude": 23.12908,
                    "sort": 6,
                    "area_code": "020",
                    "abbr": "GZ",
                    "name": "广州",
                    "id": 4
                }, {
                    "pinyin": "xiamen",
                    "is_map": true,
                    "longitude": 118.089478,
                    "latitude": 24.479509,
                    "sort": 7,
                    "area_code": "0592",
                    "abbr": "XM",
                    "name": "厦门",
                    "id": 13
                }, {
                    "pinyin": "hangzhou",
                    "is_map": true,
                    "longitude": 120.155151,
                    "latitude": 30.274151,
                    "sort": 8,
                    "area_code": "0571",
                    "abbr": "HZ",
                    "name": "杭州",
                    "id": 2
                }, {
                    "pinyin": "tianjin",
                    "is_map": true,
                    "longitude": 117.199371,
                    "latitude": 39.085098,
                    "sort": 14,
                    "area_code": "022",
                    "abbr": "TJ",
                    "name": "天津",
                    "id": 5
                }, {
                    "pinyin": "qingdao",
                    "is_map": true,
                    "longitude": 120.382988,
                    "latitude": 36.066231,
                    "sort": 15,
                    "area_code": "0532",
                    "abbr": "QD",
                    "name": "青岛",
                    "id": 28
                }],     //热门城市列表
                groupcity: {
                    "E": [{
                        "pinyin": "ezhou",
                        "is_map": true,
                        "longitude": 114.894951,
                        "latitude": 30.39085,
                        "sort": 2000,
                        "area_code": "0711",
                        "abbr": "EZ",
                        "name": "鄂州",
                        "id": 184
                    }, {
                        "pinyin": "emeishan",
                        "is_map": true,
                        "longitude": 103.484467,
                        "latitude": 29.60125,
                        "sort": 2000,
                        "area_code": "440100",
                        "abbr": "EMS",
                        "name": "峨眉山",
                        "id": 213
                    }, {
                        "pinyin": "enshi",
                        "is_map": true,
                        "longitude": 109.479179,
                        "latitude": 30.29504,
                        "sort": 2000,
                        "area_code": "0718",
                        "abbr": "ES",
                        "name": "恩施",
                        "id": 229
                    }],
                    "B": [{
                        "pinyin": "ezhou",
                        "is_map": true,
                        "longitude": 114.894951,
                        "latitude": 30.39085,
                        "sort": 2000,
                        "area_code": "0711",
                        "abbr": "EZ",
                        "name": "北京",
                        "id": 184
                    }],
                    "A": [{
                        "pinyin": "ezhou",
                        "is_map": true,
                        "longitude": 114.894951,
                        "latitude": 30.39085,
                        "sort": 2000,
                        "area_code": "0711",
                        "abbr": "EZ",
                        "name": "安宁",
                        "id": 70
                    }, {
                        "pinyin": "emeishan",
                        "is_map": true,
                        "longitude": 103.484467,
                        "latitude": 29.60125,
                        "sort": 2000,
                        "area_code": "440100",
                        "abbr": "EMS",
                        "name": "安阳",
                        "id": 261
                    }, {
                        "pinyin": "enshi",
                        "is_map": true,
                        "longitude": 109.479179,
                        "latitude": 30.29504,
                        "sort": 2000,
                        "area_code": "0718",
                        "abbr": "ES",
                        "name": "安庆",
                        "id": 229
                    }]
                },   //所有城市列表
            }
        },

        mounted(){
//            // 获取当前城市
//            cityGuess().then(res => {
//                this.guessCity = res.name;
//                this.guessCityid = res.id;
//            })
//
//            //获取热门城市
//            hotcity().then(res => {
//                this.hotcity = res;
//            })
//
//            //获取所有城市
//            groupcity().then(res => {
//                this.groupcity = res;
//            })
        },

        components: {
            HeadTop: require('../../components/header/ele-header.vue'),
            CellLogoText:require('../../components/cell-logo-text.vue')
        },

        computed: {
            //将获取的数据按照A-Z字母开头排序
            sortgroupcity(){
                let sortobj = {};
                for (let i = 65; i <= 90; i++) {
                    if (this.groupcity[String.fromCharCode(i)]) {
                        sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                    }
                }
                return sortobj
            }
        },

        methods: {
            //点击图标刷新页面
            reload(){
                window.location.reload();
            }
        },
    }

</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import '../../style/mixin';

    .img_end{
        height:56px;
        width:56px;
        fill:red;
    }

    .t_nav {
        background-color: #e6c3c7;
        line-height: 2rem;
        .t_tip {
            flex-direction: row;
            font-size: 1.4rem;
            span:nth-of-type(1) {
                color: #000;
            }
            span:nth-of-type(2) {
                color: #f00;
            }
        }
    }

    .head_logo {
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }

    .city_nav {
        align-items: center;
        background-color: #fff;
        border-bottom: 6px solid $bg;
        margin-bottom: .4rem;

        .city_tip {
            flex-direction: row;
            @include fj;
            padding: 0 .4rem;

            span:nth-of-type(1) {
                @include sc(.55rem, #666);
                line-height: 1.4rem;
            }
            span:nth-of-type(2) {
                @include sc(.45rem, #f00);
                line-height: 1.4rem;
            }
        }
        .guess_city {
            flex-direction: row;
            border-top: 2px solid $bg;
            align-items: center;
            padding: 0 .4rem;
            @include fj;

            span:nth-of-type(1) {
                @include font(.75rem, 1.6rem);
                color: $blue;
            }
            .arrow_right {
                @include wh(.6rem, .6rem);
                fill: #999;
            }
        }
    }

    #hot_city_container {
        background-color: #fff;
        margin-bottom: .4rem;
        border-bottom: 2px solid $bg;
    }

    .citylistul {

        li {
            float: left; //浮动（排列）顺序
            text-align: center;
            color: $blue;
            /*border-right: 0.025rem solid $bg;
            border-bottom: .025rem solid $bg;*/
            border-width:1px;
            @include wh(25%, 1.75rem);
            @include font(0.6rem, 1.75rem);
        }

        li:nth-of-type(4n) {
            border-right: none;
        }

    }
    .li_city{
        float: left; //浮动（排列）顺序
        text-align: center;
        color: $blue;
        /*border-right: 0.025rem solid $bg;
        border-bottom: .025rem solid $bg;*/
        border-width:1px;
        @include wh(300px, 100.75rem);
        @include font(0.6rem, 1.75rem);
    }

    .city_title {
        color: #666;
        font-weight: 400; //文本粗细
        text-indent: 0.5rem; //首行缩进
        border-top: 6px solid $bg;
        border-bottom: 2px solid $bg;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");

        span {
            @include sc(0.475rem, #999);
        }

    }

    .letter_classify_li {
        margin-bottom: 0.4rem;
        background-color: #fff;
        border-bottom: 2px solid $bg;

        .groupcity_name_container {

            li {
                color: #666;
            }

        }
    }
</style>
