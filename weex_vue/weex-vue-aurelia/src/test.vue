<template>
    <div class="root" @click="rootClick" bubble="true">
        <div>
            <text style="font-size: 40px;">{{rootText}}</text>
            <div class="outer" @click="parentClick">
                <div>
                    <text style="font-size: 40px;">{{parentText}}</text>
                </div>
                <text class="inner" @click="click">{{innerText}}</text>
                <!--<loading-circle class="loading" circleSize="50" circleWidth="5"></loading-circle>-->
            </div>
        </div>
        <loading-circle class="loading" circleSize="50" circleWidth="5"></loading-circle>
        <!--<tab></tab>-->
        <!--<div ref="progress-bar" class="progress-bar"></div>-->
        <!--<div ref="bar" class="bar" @click="clickBar"></div>-->
    </div>
</template>

<script>
    var animation = weex.requireModule('animation');
    import'./style/mixin.scss'

    module.exports = {
        data(){
            return {
                innerText: 'click me',
                parentText: 'p',
                rootText: 'r',
                tabs: [
                    {
                        index: 0,
                        tit: "今日任务",
                        titColor: "#000",
                        activeTitColor: "#F00",
                        imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        src: "/toTask",
                        visiable: true
                    },
                    {
                        index: 1,
                        tit: "今日完成",
                        titColor: "#000",
                        activeTitColor: "#F00",
                        imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        src: "/userInfo",
                        visiable: false
                    },
                    {
                        index: 2,
                        tit: "我的顾客",
                        titColor: "#000",
                        activeTitColor: "#F00",
                        imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        src: "",
                        visiable: false
                    },
                    {
                        index: 3,
                        tit: "销量统计",
                        titColor: "#000",
                        activeTitColor: "#F00",
                        imgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        selectedImgUrl: "http://192.168.100.120:8888/weex/drawable/apply.png",
                        src: "",
                        visiable: false
                    },
                ],
                current_rotate: 0,
                isRefresh: false,
            }
        },
        components: {
            cellTab: require('./components/footer/cell-tab.vue'),
            loadingCircle: require('./components/loading/loading-circle.vue'),
            ani: require('./vue/animation.vue'),
        },
        computed: {
            rotate(){
                return this.$refs.bar ? this.this.route() : '';
            }
        },
        methods: {
            click: function (e) {
                this.innerText = 'inner bubble'
                this.isRefresh = !this.isRefresh;
            },
            parentClick: function (e) {
                this.parentText = 'parent bubble'
            },
            rootClick: function (e) {
                this.rootText = 'root bubble'
            },
            setStyle: function (obj, css) {
                for (var i in css) {
                    obj.style[i] = css[i];
                }
            },
            percent(qty, totalQty){
                return 0.6
            },
            clickBar(){
                console.log("clickBar")
//                this.route();
            },
            route(){
                let self = this;
                console.log("route")
                this.current_rotate += 36000;
                var bar = this.$refs.bar;
                var options = {};
                options.styles = {
//                    transformOrigin:'center center',
//                    color:'#0F0',
                    transform: 'rotate(' + self.current_rotate + 'deg)'
                };
//                options.delay=1000;
//                options.needLayout=true;
                options.timingFunction = 'linear';
                options.duration = 50000;
                animation.transition(bar, options, function () {
                    self.route();
                });
            },
        },
        created(e){
            console.log(this.$getConfig())

        },
        mounted(){
//            this.route();
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    @import "./style/mixin";

    .root {
        font-size: dp();
        text-align: center;
        background-color: #7a1b9b;
        /*padding: 80px;*/
        /*justify-content: center;*/
        /*align-items: center;*/
    }

    .outer {
        /*font-size: 40px;*/
        text-align: center;
        justify-content: center;
        background-color: #9b7a1b;
        /*padding: 120px;*/

    }

    .inner {
        /*position:absolute;*/
        /*bottom:0;*/
        /*right:0;*/
        font-size: 40px;
        text-align: center;
        background-color: #7a9b1b;
        padding: 40px;
    }

    .bar {
        height: 100px;
        width: 100px;
        border-bottom-width: 10px;
        border-left-width: 10px;
        border-top-width: 10px;
        border-radius: 100px;
        border-color: red;
    }

    .loading {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-width: 10px;
    }
</style>