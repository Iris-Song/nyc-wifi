$(function () {

    ceshis();
    ceshis1();
    ceshis2();
    // ceshis3();
    // ceshis4();
    ceshis6();

    //散点图
    function ceshis() {
        var myChart = echarts.init(document.getElementById('chart1'));
        var location = []
        var option = {
            color: ['green'],
            xAxis: { scale: true, name: 'longitute', axisLabel: {
                "color": "#fff","fontSize": 16
            }, nameTextStyle: {
                "color": "#fff","fontSize": 16
            },},
            yAxis: { scale: true, name: 'latitude', axisLabel: {
                "color": "#fff","fontSize": 16
            }, nameTextStyle: {
                "color": "#fff","fontSize": 16
            },},
            series: [{
                type: 'scatter', 
                data: location,
            }],
        };
        $.ajax({
            url: "https://data.cityofnewyork.us/resource/yjub-udmw.json?$where=within_circle(location_lat_long, 40.69324, -73.96282, 5000000)",
            type: "GET",
            data: {
              "$limit" : 1000000,
              "$$app_token" : 'XSsZaomgpDdviVNxAbA1UeDXV'
            }
        }).done(function(data) {
        //   console.log(data);
          data.forEach(element => {
            let tmp = [element.location_lat_long.longitude,element.location_lat_long.latitude,]
            location.push(tmp)
          });
        //   console.log(location)
          myChart.setOption(option);
        });


        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function ceshis6() {
        var myChart = echarts.init(document.getElementById('chart6'));

        // Define options for the pie chart
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
        textStyle: {
            color: '#fff'
        }
            },
            color: ["#8d7fec", "#5085f2", "#e75fc3"],
            series: [
                {
                    name: 'Category',
                    type: 'pie',
                    radius: '50%',
                    data: [], // Data will be populated later
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(5, 0, 0, 0.5)'
                        }
                    },
                    textStyle: {
                        color: '#fff'
                    }
                }
            ]
        };

        // AJAX request to fetch data
        $.ajax({
            url: "https://data.cityofnewyork.us/resource/yjub-udmw.json",
            type: "GET",
            data: {
                "$limit": 10000000,
                "$$app_token": "XSsZaomgpDdviVNxAbA1UeDXV"
            }
        }).done(function(data) {
            // console.log(data)
            var categoryCounts = {};
            data.forEach(function(item) {
                var category = item.type;
                if (categoryCounts[category]) {
                    categoryCounts[category]++;
                } else {
                    categoryCounts[category] = 1;
                }
            });

            // Convert processed data into a format suitable for ECharts
            var pieData = [];
            for (var category in categoryCounts) {
                pieData.push({ value: categoryCounts[category], name: category });
            }
            // console.log(pieData)
            // Update pie chart data
            option.series[0].data = pieData;
            myChart.setOption(option);
        });

        // Resize chart on window resize
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }

    
    // This function is used to create data for the 2nd pie chart at the right
    function ceshis1() {
        var myChart = echarts.init(document.getElementById('chart2'));

        //     name: '财务管理决策实训',
        //     value: 18
        // },
        //     {
        //         name: '商品流通业实训',
        //         value: 16
        //     },
        //     {
        //         name: '暖心陪伴（津乐园20cm定制蛋糕）',
        //         value: 15
        //     },
        //     {
        //         name: '嘉果荟萃（津乐园20cm定制蛋糕）',
        //         value: 14
        //     },
        //     {
        //         name: '优雅圆舞曲（津乐园20cm）',
        //         value: 10
        //     },
        //     {
        //         name: '巧克力之夏（津乐园20cm定制蛋糕）',
        //         value: 7.9
        //     },
        //     {
        //         name: '财税宝4G',
        //         value: 6.7
        //     },
        //     {
        //         name: '成本会计',
        //         value: 6
        //     },
        //     {
        //         name: '纳税会计与筹划',
        //         value: 4.5
        //     },
        //     {
        //         name: '金融担保业实训',
        //         value: 3
        //     }
        // ];
        var color = ["#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a"]
        var ydata = [];
        var xdata = ['Brooklyn', 'Queens', 'Staten Island', 'Manhattan', 'Bronx'];

        option = {
            color: color,
            legend: {
                orient: "vartical",
                x: "left",
                top: "center",
                left: "53%",
                bottom: "0%",
                data: xdata,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#fff'
                },
                formatter: function(name) {
                    return '' + name
                }
            },
            series: [{
                type: 'pie',
                clockwise: false, //饼图的扇区是否是顺时针排布
                minAngle: 2, //最小的扇区角度（0 ~ 360）
                radius: ["20%", "60%"],
                center: ["30%", "45%"],
                avoidLabelOverlap: false,
                itemStyle: { //图形样式
                    normal: {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                    },
                },
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: '{text|{b}}\n{c} ({d}%)',
                        rich: {
                            text: {
                                color: "#fff",
                                fontSize: 14,
                                align: 'center',
                                verticalAlign: 'middle',
                                padding: 8
                            },
                            value: {
                                color: "#8693F3",
                                fontSize: 24,
                                align: 'center',
                                verticalAlign: 'middle',
                            },
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 24,
                        }
                    }
                },
                data: ydata
            }]
        };

        $.ajax({
            url: 'https://data.cityofnewyork.us/resource/yjub-udmw.json?$select=boroname,COUNT(OBJECTID)&$group=boroname',
            type: 'GET',
            data: {
                "$limit": 10000000,
                "$$app_token": "XSsZaomgpDdviVNxAbA1UeDXV"
            }
        }).done(function (data) {
            console.log(data);
            data.forEach(element => {
                ydata.push({ name: element['boroname'], value: Number(element['COUNT_OBJECTID']) })
            });
            console.log(ydata);
            myChart.setOption(option);
        }).fail({
            function() {
            console.log("fail");
        }
        });

        setTimeout(function() {
            myChart.on('mouseover', function(params) {
                if (params.name == ydata[0].name) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                } else {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                }
            });

            myChart.on('mouseout', function(params) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        }, 1000);

        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function ceshis2() {
        var myChart = echarts.init(document.getElementById('chart3'));

        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Category',
                    type: 'pie',
                    radius: '50%',
                    data: [], // Data will be populated later
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(5, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // AJAX request to fetch data
        $.ajax({
            url: "https://data.cityofnewyork.us/resource/yjub-udmw.json",
            type: "GET",
            data: {
                "$limit": 10000000,
                "$$app_token": "XSsZaomgpDdviVNxAbA1UeDXV"
            }
        }).done(function(data) {
            // console.log(data)
            var categoryCounts = {};
            data.forEach(function(item) {
                var category = item.provider;
                if (categoryCounts[category]) {
                    categoryCounts[category]++;
                } else {
                    categoryCounts[category] = 1;
                }
            });

            // Convert processed data into a format suitable for ECharts
            var pieData = [];
            for (var category in categoryCounts) {
                pieData.push({ value: categoryCounts[category], name: category });
            }
            // console.log(pieData)
            // Update pie chart data
            option.series[0].data = pieData;
            myChart.setOption(option);
        });

        // Resize chart on window resize
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }
    function ceshis3() {
        var myChart = echarts.init(document.getElementById('chart4'));

        var colors = ['rgb(46, 199, 201)', 'rgb(90, 177, 239)', 'rgb(255, 185, 128)'];

        option = {
            color: colors,

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function(params) {
                    // 系列
                    let html = params[0].name + "<br>";

                    for (var i = 0; i < params.length; i++) {

                        // 获取每个系列对应的颜色值
                        html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';

                        // 通过判断指定系列增加 % 符号
                        if (option.series[params[i].seriesIndex].type == "line") {
                            html += params[i].seriesName + ": " + params[i].value + "%<br>";
                        } else {
                            html += params[i].seriesName + ": " + params[i].value + "<br>";
                        }
                    }
                    return html;
                }
            },
            grid: {
                right: '20%'
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            legend: {
                textStyle: {
                    color: '#fff'
                },
                data: ['蒸发量', '降水量', '平均温度']
            },
            // 缩放组件
            /*dataZoom: {
                type: 'slider'
            },*/
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: '{value} ',
                    textStyle: {
                        color: "#ffffff" //X轴文字颜色
                    }
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }],
            yAxis: [{
                type: 'value',
                name: '蒸发量',
                min: 0,
                max: 250,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
                {
                    type: 'value',
                    name: '降水量',
                    min: 0,
                    max: 250,
                    position: 'right',
                    offset: 80,
                    axisLine: {
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [{
                name: '蒸发量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                itemStyle: {
                    normal: {
                        barBorderRadius: 2
                    }
                }
            },
                {
                    barGap: '-50%', // 增加偏移量使重叠显示
                    name: '降水量',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 2
                        }
                    }
                },
                {
                    name: '平均温度',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function ceshis4() {
        var myChart = echarts.init(document.getElementById('chart5'));

        var labelimg = "/asset/get/s/data-1575019476644-Rak5eXt1.png";

        option = {
            /*backgroundColor: "#0E233E",*/
            "grid": {
                "left": "6%",
                "top": "10%",
                "right": "3%",
                "bottom": "15%"
            },
            "legend": {
                "data": [
                    "信息",
                    "往下场所",
                    "关系",
                    "关联",
                    "人",
                    "物",
                    "组织"
                ],
                "top": "92%",
                "icon": "circle",
                "textStyle": {
                    "color": "#0DCAD2"
                }
            },
            "color": [
                "#534EE1",
                "#ECD64F",
                "#00E4F0",
                "#44D16D",
                "#124E91",
                "#BDC414",
                "#C8CCA5"
            ],
            "tooltip": {
                "position": "top",
            },
            "xAxis": {
                "type": "category",
                "data": [
                    "信息",
                    "往下场所",
                    "关系",
                    "关联",
                    "人",
                    "物",
                    "组织"
                ],
                "axisLabel": {
                    "show": false,
                    "color": "#999999",
                    "fontSize": 16
                },
                "axisTick": {
                    "show": false
                },
                "axisLine": {
                    "show": false
                },
                "splitLine": {
                    "show": false
                }
            },
            "yAxis": {
                "type": "value",
                "axisLabel": {
                    "show": false,
                    "color": "#999999",
                    "fontSize": 16
                },
                "axisTick": {
                    "show": false
                },
                "axisLine": {
                    "show": false
                },
                "splitLine": {
                    "show": false
                }
            },
            "series": [{
                "name": "信息",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "stack": "a",
                "type": "bar"
            },
                {
                    "name": "往下场所",
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "stack": "a",
                    "type": "bar"
                },
                {
                    "name": "关系",
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "stack": "a",
                    "type": "bar"
                },
                {
                    "name": "关联",
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "stack": "a",
                    "type": "bar"
                },
                {
                    "name": "人",
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "stack": "a",
                    "type": "bar"
                },
                {
                    "name": "物",
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "stack": "a",
                    "type": "bar"
                },
                {
                    "name": "组织",
                    "data": [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "stack": "a",
                    "type": "bar"
                },
                {
                    "type": "pictorialBar",
                    "name": "提示框值",
                    "data": [{
                        "name": "",
                        "value": 868,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(params) {
                                var index = params.dataIndex;
                                var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                return str;
                            },
                            "rich": {
                                "a": {
                                    "fontSize": 18,
                                    "color": "#534EE1",
                                    "align": "center",
                                    "height": 40
                                },
                                "c": {
                                    "fontSize": 18,
                                    "color": "#fff",
                                    "padding": [
                                        -2,
                                        0,
                                        2,
                                        0
                                    ],
                                    "backgroundColor": {
                                        "image": labelimg
                                    },
                                    "align": "center",
                                    "verticalAlign": "bottom",
                                    "height": 50,
                                    "lineHeight": 40,
                                    "width": 100
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "rgba(83,78,225,1)"
                                    },
                                        {
                                            "offset": 1,
                                            "color": "rgba(83,78,225,0)"
                                        }
                                    ],
                                    "global": false
                                }
                            }
                        }
                    },
                        {
                            "name": "",
                            "value": 306,
                            "label": {
                                "show": true,
                                "position": "top",
                                formatter: function(params) {
                                    var index = params.dataIndex;
                                    var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                    return str;
                                },
                                "rich": {
                                    "a": {
                                        "fontSize": 18,
                                        "color": "#ECD64F",
                                        "align": "center",
                                        "height": 40
                                    },
                                    "c": {
                                        "fontSize": 18,
                                        "color": "#fff",
                                        "padding": [
                                            -4,
                                            0,
                                            8,
                                            0
                                        ],
                                        "backgroundColor": {
                                            "image": labelimg
                                        },
                                        "align": "center",
                                        "verticalAlign": "bottom",
                                        "height": 45,
                                        "lineHeight": 40,
                                        "width": 100
                                    }
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "rgba(236,214,79,1)"
                                        },
                                            {
                                                "offset": 1,
                                                "color": "rgba(236,214,79,0)"
                                            }
                                        ],
                                        "global": false
                                    }
                                }
                            }
                        },
                        {
                            "name": "",
                            "value": 162,
                            "label": {
                                "show": true,
                                "position": "top",
                                formatter: function(params) {
                                    var index = params.dataIndex;
                                    var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                    return str;
                                },
                                "rich": {
                                    "a": {
                                        "fontSize": 18,
                                        "color": "#00E4F0",
                                        "align": "center",
                                        "height": 40
                                    },
                                    "c": {
                                        "fontSize": 18,
                                        "color": "#fff",
                                        "padding": [
                                            -4,
                                            0,
                                            8,
                                            0
                                        ],
                                        "backgroundColor": {
                                            "image": labelimg
                                        },
                                        "align": "center",
                                        "verticalAlign": "bottom",
                                        "height": 45,
                                        "lineHeight": 40,
                                        "width": 100
                                    }
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "rgba(0,228,240,1)"
                                        },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,228,240,0)"
                                            }
                                        ],
                                        "global": false
                                    }
                                }
                            }
                        },
                        {
                            "name": "",
                            "value": 362,
                            "label": {
                                "show": true,
                                formatter: function(params) {
                                    var index = params.dataIndex;
                                    var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                    return str;
                                },
                                "position": "top",
                                "rich": {
                                    "a": {
                                        "fontSize": 18,
                                        "color": "#44D16D",
                                        "align": "center",
                                        "height": 40
                                    },
                                    "c": {
                                        "fontSize": 18,
                                        "color": "#fff",
                                        "padding": [
                                            -4,
                                            0,
                                            8,
                                            0
                                        ],
                                        "backgroundColor": {
                                            "image": labelimg
                                        },
                                        "align": "center",
                                        "verticalAlign": "bottom",
                                        "height": 45,
                                        "lineHeight": 40,
                                        "width": 100
                                    }
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "rgba(68,209,109,1)"
                                        },
                                            {
                                                "offset": 1,
                                                "color": "rgba(68,209,109,0)"
                                            }
                                        ],
                                        "global": false
                                    }
                                }
                            }
                        },
                        {
                            "name": "",
                            "value": 460,
                            "label": {
                                "show": true,
                                "position": "top",
                                formatter: function(params) {
                                    var index = params.dataIndex;
                                    var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                    return str;
                                },
                                "rich": {
                                    "a": {
                                        "fontSize": 18,
                                        "color": "#124E91",
                                        "align": "center",
                                        "height": 30
                                    },
                                    "c": {
                                        "fontSize": 18,
                                        "color": "#fff",
                                        "padding": [
                                            -4,
                                            0,
                                            8,
                                            0
                                        ],
                                        "backgroundColor": {
                                            "image": labelimg
                                        },
                                        "align": "center",
                                        "verticalAlign": "bottom",
                                        "height": 45,
                                        "lineHeight": 40,
                                        "width": 100
                                    }
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "rgba(18,78,145,1)"
                                        },
                                            {
                                                "offset": 1,
                                                "color": "rgba(18,78,145,0)"
                                            }
                                        ],
                                        "global": false
                                    }
                                }
                            }
                        },
                        {
                            "name": "",
                            "value": 606,
                            "label": {
                                "show": true,
                                "position": "top",
                                formatter: function(params) {
                                    var index = params.dataIndex;
                                    var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                    return str;
                                },
                                "rich": {
                                    "a": {
                                        "fontSize": 18,
                                        "color": "#BDC414",
                                        "align": "center",
                                        "height": 30
                                    },
                                    "c": {
                                        "fontSize": 18,
                                        "color": "#fff",
                                        "padding": [
                                            -4,
                                            0,
                                            8,
                                            0
                                        ],
                                        "backgroundColor": {
                                            "image": labelimg
                                        },
                                        "align": "center",
                                        "verticalAlign": "bottom",
                                        "height": 45,
                                        "lineHeight": 40,
                                        "width": 100
                                    }
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "rgba(189,196,20,1)"
                                        },
                                            {
                                                "offset": 1,
                                                "color": "rgba(189,196,20,0)"
                                            }
                                        ],
                                        "global": false
                                    }
                                }
                            }
                        },
                        {
                            "name": "",
                            "value": 506,
                            "label": {
                                "show": true,
                                "position": "top",
                                formatter: function(params) {
                                    var index = params.dataIndex;
                                    var str = "{a|" + params.value + "}\n{c|" + params.value + "个}";
                                    return str;
                                },
                                "rich": {
                                    "a": {
                                        "fontSize": 18,
                                        "color": "#C8CCA5",
                                        "align": "center",
                                        "height": 30
                                    },
                                    "c": {
                                        "fontSize": 18,
                                        "color": "#fff",
                                        "padding": [
                                            -4,
                                            0,
                                            8,
                                            0
                                        ],
                                        "backgroundColor": {
                                            "image": labelimg
                                        },
                                        "align": "center",
                                        "verticalAlign": "bottom",
                                        "height": 45,
                                        "lineHeight": 40,
                                        "width": 100
                                    }
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [{
                                            "offset": 0,
                                            "color": "rgba(200,204,165,1)"
                                        },
                                            {
                                                "offset": 1,
                                                "color": "rgba(200,204,165,0)"
                                            }
                                        ],
                                        "global": false
                                    }
                                }
                            }
                        }
                    ],
                    "stack": "a",
                    "symbol": "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z"
                }
            ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function ceshis5() {
        var myChart = echarts.init(document.getElementById('chart_1'));


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }


});