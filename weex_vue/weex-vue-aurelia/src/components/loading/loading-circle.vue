<template>
    <div class="root">
        <div ref="circle"
             :style="{ borderColor: circleColor,opacity:opa,height:circleSize+'px',width:circleSize+'px',borderRadius:circleSize+'px',borderBottomWidth:circleWidth+'px',borderLeftWidth:circleWidth+'px'}"
        ></div>
    </div>
</template>

<script>
    var animation = weex.requireModule('animation');

    module.exports = {
        props: {
            circleColor: {
                type: String,
                default: '#f00'
            },
            circleSize: {
                type: String,
                default: '100'
            },
            circleWidth: {
                type: String,
                default: '10'
            },
        },
        data(){
            return {
                current_rotate: 0,
                opa: 0.005,
                timeRecorder: null,
            }
        },
        methods: {
            rotate(){
                let self = this;
                this.current_rotate += 36000;
                var bar = self.$refs.circle;
                var options = {};
                options.styles = {
//                    transformOrigin: 'center center',
                    transform: 'rotate(' + self.current_rotate + 'deg)'
                };
//                options.delay=1000;
//                options.needLayout = true;
                options.timingFunction = 'linear';//动画速度从头到尾一致
                options.duration = 60000;
                animation.transition(bar, options, function () {
                    self.rotate();
                });
            },
        },
        created(){
            //延迟0.3s显示，初始透明度为0.003（隐藏该视图）防止border转换为圆形的过程显示出来
            this.timeRecorder = setInterval(() => {
                this.opa = '1';//透明度为1；
                clearInterval(this.timeRecorder)
            }, 300);
        },
        mounted(){
            this.rotate();
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>

    .root {
        align-items: center;
        justify-content: center;
    }
</style>