<template>
    <div>
        <text class="chart" ref="test_te" @click="click">test weex-chart</text>
        <!--<chart class="chart"></chart>-->
        <bmchart class="chart" :chartInfo="chertInfo" @finish='finish'></bmchart>
        <!--<richtext class="chart" ></richtext>-->
        <div class="chart"></div>
        <text @click="click">lalalalala</text>
    </div>
</template>

<script>
    var modal = weex.requireModule('modal');
    export default{
        data(){
            return {
                chertInfo: {
                    'tooltip': {
                        'show': true
                    },
                    'legend': {
                        'data': [
                            '数量（吨）'
                        ]
                    },
                    'xAxis': [
                        {
                            'type': 'category',
                            'data': [
                                '桔子',
                                '香蕉',
                                '苹果',
                                '西瓜'
                            ]
                        }
                    ],
                    'yAxis': [
                        {
                            'type': 'value'
                        }
                    ],
                    'series': [
                        {
                            'name': '数量（吨）',
                            'type': 'bar',
                            'data': [
                                100,
                                200,
                                300,
                                400
                            ]
                        }
                    ],
                },
                lineInfo: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                },
            }
        },
        methods: {
            finish(){
                modal.toast({message: "FINISH", duration: 3});
            },
            click(){
                console.log(123)
            },
        },
    }
</script>

<style>
    .chart {
        width: 300wx;
        height: 200wx;
        border-width: 2px;
    }
</style>