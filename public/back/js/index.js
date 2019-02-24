var chartLeft = echarts.init(document.getElementById('chartLeft'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2019年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['销量', '人数']
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
            name: '销量',
            type: 'bar',
            data: [500, 203, 362, 400, 300, 560]
        },
        {
            name: '人数',
            type: 'bar',
            data: [123, 459, 360, 100, 100, 290]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
chartLeft.setOption(option);



var chartRight = echarts.init(document.getElementById('chartRight'));// 使用刚指定的配置项和数据显示图表。
var option = {
    title : {
        text: '热门品牌销售',
        subtext: '2019年2月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','老北京','回力','贵人鸟']
    },
    series : [
        {
            name: '品牌热销',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'老北京'},
                {value:135, name:'回力'},
                {value:1548, name:'贵人鸟'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


chartRight.setOption(option);