// 第一个图表
{
    // 基于准备好的dom，初始化echarts实例
    var primaryChart = echarts.init(document.getElementById('primaryChart'));
    // 指定图表的配置项和数据
    primaryoption = null;
    primaryoption = {
        title: {
            text: 'ECharts 入门示例',
            left: 'center',
            subtext: '副标题'
        },
        tooltip: {},
        legend: {
            data: ['销量'],
            left: 'right',
        },
        xAxis: {
            data: [
                "衬衫",
                "羊毛衫",
                "雪纺衫",
                "裤子",
                {
                    value: '高跟鞋',
                    textStyle: {
                        fontWeight: 'bolder',
                        color: '#00F',
                    }
                },
                "袜子"
            ],
            gridindex: 0,
            position: 'buttom',
            type: 'category',
            name: '类别',
            nameLocation: 'end',
            min: 0,
            axisLine: {
                symbol: ['none', 'none'],
                lineStyle: {
                    color: '#000',
                    width: 1,
                    type: 'solid',
                }
            },
            axisPointer: {
                show: 'true',
                type: 'shadow'
            }
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    if (primaryoption && typeof primaryoption === "object") {
        primaryChart.setOption(primaryoption, true);
    }
}
// 折线图
{
    var ages = new Array();
    var initAge = 32;
    for (var i = 0; i <= 10; i++) {
        ages.push((initAge + i) + '岁');
    }
    var zhexiantu = echarts.init(document.getElementById("zhexiantu"));
    zhexiantuoption = null;
    zhexiantuoption = {
        title: {
            text: '糖尿病十年发展趋势',
            left: 'center',
        },
        xAxis: {
            type: 'category',
            data: ages,
            axisPointer: {
                show: true,
            }
        },
        yAxis: {
            type: 'value',
            name: '发病率',
            axisLabel: {
                formatter: function (value) {
                    return value + '%';
                }
            }
        },
        series: [{
            data: [12, 43, 60, 73, 12, 13, 13, 14, 14, 15, 16],
            type: 'line',
            smooth: true,
        }]
    };
    if (zhexiantu && typeof zhexiantuoption === "object") {
        zhexiantu.setOption(zhexiantuoption, true);
    }
}
// 雷达图
{
    var leidatu = echarts.init(document.getElementById("leidatu"));
    leidatuoption = null;
    leidatuoption = {
        title: {
            text: '多部位情况',
            top: 'top',
        },
        tooltip: {
            trigger: 'axis'
        },
        color: ['green', 'blue', '#F00', 'yellow'],
        legend: {
            x: 'center',
            data: ['理想值', '平均值', '警戒值', '当前值'],
        },
        radar: [
            {
                indicator: [

                    { name: '总体', max: 100, color: '#00F' },
                    { name: '心脑血管', max: 100 },
                    { name: '大脑', max: 100 },
                    { name: '基因', max: 100 },
                    { name: '骨骼', max: 100 },
                    { name: '肺', max: 100 },
                ],
                shape: 'circle',
                center: ['50%', '55%'],
                radius: 80,
                startAngle: 90,
                name: {
                    color: '#F00',
                }
            }
        ],
        series: [
            {
                type: 'radar',
                radarIndex: 0,
                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                data: [
                    {
                        name: '理想值',
                        value: [90, 80, 79, 89, 95, 90],
                        symbol: 'none',
                        areaStyle: {
                            color: 'green',
                        },
                        lineStyle: {
                            color: 'green',
                        },
                    },
                    {
                        name: '平均值',
                        value: [32, 100, 36, 42, 37, 29],
                        symbol: 'none',
                        areaStyle: {
                            color: 'blue',
                        },
                        lineStyle: {
                            color: 'blue',
                        },
                    },
                    {
                        name: '警戒值',
                        value: [17, 20, 9, 12, 5, 15],
                        areaStyle: {
                            color: '#F00',
                        },
                        symbol: 'none',
                        lineStyle: {
                            color: '#F00',
                        },
                    },
                    {
                        name: '当前值',
                        value: [12, 36, 78, 23, 65, 46],
                        symbol: 'none',
                        areaStyle: {
                            color: 'yellow',
                        },
                        lineStyle: {
                            color: 'yellow',
                        },
                    }
                ]
            }
        ]
    };
    if (leidatu && typeof leidatuoption === "object") {
        leidatu.setOption(leidatuoption, true);
    }
}
// 柱状图
{
    var zhuzhuangtu = echarts.init(document.getElementById("zhuzhuangtu"));
    zhuzhuangtuoption = null;
    zhuzhuangtuoption = {
        title: {
            text: '各部分评分与等级分布',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            // formatter: function (params) {

            //     var res='<div><p>时间：'+params[0].name+'</p></div>' 
            //     for(var i=0;i<params.length;i++){
            //     res+='<p>'+params[i].seriesName+':'+params[i].data+'</p>'
            //     }
            //     return res;
            //     },
            formatter: function(params) {
                var res=params[0].name+'<br>';
                for (var i=0;i<params.length;i++)
                {
                    res +='<span style="color:'+params[i].color+';font-size:1.5em;">●</span>'+
                    params[i].seriesName+'：'+params[i].data+'<br>';
                }
                res+='<span style="color:black;font-size:1.5em;">●</span>'+
                '排名：'+12+'/'+123+'（'+(12*100/123).toFixed(1)+'%）';
                return res;
            }
        },
        legend: {
            data: ['良好', '正常', '危险'],
            selectedMode: false,
            x: 'right',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['总体', '心脑血管', '大脑', '基因', '骨骼', '肺']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '危险',
                type: 'bar',
                stack: '等级',
                data: [300, 232, 201, 154, 190, 330],
                markPoint: {
                    symbol: 'circle',
                    symbolOffset: [0, 0],
                    symbolSize: 10,
                    itemStyle: {
                        color: 'black',
                    },
                    data: [
                        {
                            name: '最大值',
                            // type: 'max',
                            coord: ['周二', 500]
                        },
                    ]
                }
            },
            {
                name: '正常',
                type: 'bar',
                stack: '等级',
                data: [200, 182, 191, 234, 290, 330]
            },
            {
                name: '良好',
                type: 'bar',
                stack: '等级',
                data: [100, 132, 101, 134, 90, 230]
            },
        ]
    };
    if (zhuzhuangtu && typeof zhuzhuangtuoption === "object") {
        zhuzhuangtu.setOption(zhuzhuangtuoption, true)
    }
}