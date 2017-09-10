const TYPE_ALL = 0,
  TYPE_YEAR = 1,
  TYPE_WEEK = 2,
  TYPE_DAY = 3,
  TYPE_LAST_WEEK = 4,
  DATA_IN = 1,
  DATA_OUT = 0,
  FIXED = 2,
  START_YEAR = 2015,
  END_YEAR = 2018,
  CATEGORY = [
    {
      name: '农、林、牧、渔业产品',
      sub: [
        {
          name: '农业产品',
          sub: [
            {
              name: '谷物',
            },
            {
              name: '薯类',
            },
            {
              name: '油料作物',
            },
            {
              name: '干豆类',
            },
            {
              name: '糖料',
            },
            {
              name: '未加工烟草',
            },
            {
              name: '饲料作物',
            },
            {
              name: '农作物副产品',
            },
            {
              name: '蔬菜及食用菌',
            },
            {
              name: '花卉',
            },
            {
              name: '园艺产品类',
            },
            {
              name: '水果及坚果',
            },
            {
              name: '茶及饮料原料',
            },
            {
              name: '中草药材'
            },
            {
              name: '种子、种苗',
            }
          ]
        },
        {
          name: '林业产品'
        },
        {
          name: '饲养动物、野生动物及其产品'
        },
        {
          name: '海水养殖、捕捞产品'
        },
        {
          name: '淡水养殖产品、捕捞产品'
        }
      ],
    },
    {
      name: '矿产品',
    },
    {
      name: '食品、饮料、烟、酒类产品',
    },
    {
      name: '纺织、服装、皮革类产品',
    },
    {
      name: '木质品、家具类产品',
    },
    {
      name: '纸、印刷品、软件、文教、工艺类产品',
    },
    {
      name: '石油、化工、医药产品',
    },
    {
      name: '金属及非金属制品',
    },
    {
      name: '机械、设备类产品',
    },
    {
      name: '电力、热力、水、燃气类产品',
    }
  ];
let _EchartsAPI = (function () {
  let EchartsArea = {
    init: function ($dom, config) {
      let self = this;
      // 数据相关
      self.mock = [];
      self.date = [];
      self.category = [];
      self.unit = '';
      // 用于计算日期与金额映射关系
      self.dataInMap = [];
      self.dataOutMap = [];
      self.catInMap = [];
      self.catOutMap = [];
      // 计算好的对象数组
      self.dataIn = [];
      self.dataOut = [];
      self.dataProfit = [];
      self.catIn = [];
      self.catOut = [];
      self.catProfit = [];
      // 图表相关
      self.$chart = [];
      self.$option = null;
      self.$dom = $dom;
      let defaultConfig = {
        type: TYPE_YEAR,
        year: 2017,
      };
      $.extend(defaultConfig, config);
      self.setModel(defaultConfig);
    },
    initEcharts: function () {
      let self = this;
      $(self.$dom).each((index, el) => {
        self.$chart[index] = echarts.init(el, 'walden');
        self.view($(el).data('type'), index);
      });
    },
    view: function (_type, index) {
      let self = this;
      self.$chart[index].showLoading();
      switch (_type) {
        // 录入数据页面
        case 0:
          self.c0_onebrokenLineChart($(self.$dom).eq(index).data('name'));
          break;
        // 数据分析页面
        case 1:
          self.c1_barChart();
          break;
        case 2:
          self.c2_barChart();
          break;
        case 3:
          self.c3_pieChart();
          break;
        case 4:
          self.c4_brokenLineChart();
          break;
        // 主页
        case 5:
          self.c5_pieChart();
          break;
        case 6:
          self.c6_barChart();
          break;
        default:
          self.$option = null;
          break;
      }
      if (self.$option && typeof self.$option == "object") {
        self.$chart[index].setOption(self.$option, true);
        self.$chart[index].hideLoading();
      }
    },
    resizeCharts: function () {
      let self = this;
      for (let i in self.$chart) {
        self.$chart[i].resize();
      }
    },
    c0_onebrokenLineChart: function (_name) {
      let self = this;
      self.$option = null;
      self.$option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            show: 'true',
            type: 'cross',
            label: {
              formatter: self.unit == '周' ? (self.unit + '{value}') : ('{value}' + self.unit)
            }
          },
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          show: true,
          type: 'category',
          boundaryGap: false,
          data: self.date
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: _name,
            type: 'line',
            stack: '总额',
            areaStyle: {normal: {}},
            data: _name == '进项' ? self.dataIn : self.dataOut
          }
        ]
      }
    },
    c1_barChart: function () {
      let self = this;
      self.$option = null;
      self.$option = {
        title: {
          text: '进销项数据对比图',
          left: '35%',
          top: '10px'
        },
        legend: {
          data: ['进项', '销项', '利润'],
          left: '56%',
          top: '14px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              formatter: self.unit == '周' ? (self.unit + '{value}') : ('{value}' + self.unit)
            }
          }
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
            dataView: {readOnly: false}
          }
        },
        grid: {
          left: '8%',
          right: '10%',
          bottom: '10%',
          top: '20%',
          containLabel: true
        },
        dataZoom: [
          {
            id: 'dataZoomY',
            type: 'slider',
            filterMode: 'filter',
            right: '3%',
            yAxisIndex: [0],
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        xAxis: [{
          type: 'value'
        }],
        yAxis: [{
          type: 'category',
          axisTick: {show: false},
          data: self.date
        }],
        series: [
          {
            name: '销项',
            type: 'bar',
            stack: '总额',
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            data: self.dataOut
          },
          {
            name: '进项',
            type: 'bar',
            stack: '总额',
            label: {
              normal: {
                show: true,
                position: 'left'
              }
            },
            data: self.minumOperation(self.dataIn)
          },
          {
            name: '利润',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside',
              }
            },
            data: self.dataProfit
          }
        ]
      }
    },
    c2_barChart: function () {
      let self = this;
      self.$option = null;
      self.$option = {
        title: {
          text: '进销项数据对比图',
          left: 'center',
          top: '10px'
        },
        legend: {
          data: ['进项', '销项'],
          left: '60%',
          top: '15px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            show: 'true',
            type: 'cross',
            label: {
              formatter: function (params) {
                return params.seriesData[0] ? `${self.unit == '周' ? (self.unit + params.value) : (params.value + self.unit)} 利润：${self.dataProfit[params.seriesData[0].dataIndex]}` : `${self.unit == '周' ? (self.unit + params.value) : (params.value + self.unit)}`
              }
            }
          },
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {readOnly: false}
          }
        },
        grid: {
          left: '8%',
          right: '6%',
          top: '15%',
          bottom: '21%',
          containLabel: false,
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            bottom: '5%',
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        xAxis: {
          show: true,
          type: 'category',
          splitLine: {
            show: true
          },
          data: self.date
        },
        yAxis: {
          type: 'value',
          max: 'dataMax',
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: '进项',
            type: 'bar',
            stack: '总额',
            areaStyle: {normal: {}},
            data: self.dataIn,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '进项平均值'}
              ]
            }
          },
          {
            name: '销项',
            type: 'bar',
            stack: '总额',
            areaStyle: {normal: {}},
            data: self.dataOut,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '进项平均值'}
              ]
            }
          },
        ]
      }
    },
    c3_pieChart: function () {
      let self = this;
      self.$option = null;
      self.$option = {
        title: [
          {
            text: '进销项数据对比图',
            left: 'center',
            top: '10px'
          },
          {
            subtext: '进项数据',
            subtextStyle: {
              fontSize: '12px',
              fontWeight: 'normal'
            },
            left: '20%',
            bottom: '60px'
          },
          {
            subtext: '销项数据',
            subtextStyle: {
              fontSize: '12px',
              fontWeight: 'normal'
            },
            left: '70%',
            bottom: '60px'
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b0} {a0}：{c0}元<br/>({d0}%)'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
            dataView: {readOnly: false}
          }
        },
        /*legend: {
        	  type: 'scroll',
        	  y: 'bottom',
        	  data: self.category,
        	  formatter: function (name) {
        	    return echarts.format.truncateText(name, 10, '14px Microsoft Yahei', '…');
        	  },
        	  tooltip: {
        	    show: true
        	  }
        	},*/
        series: [
          {
            name: '进项',
            type: 'pie',
            radius: '45%',
            center: ['25%', '45%'],
            data: self.catIn
          },
          {
            name: '销项',
            type: 'pie',
            radius: '45%',
            center: ['75%', '45%'],
            data: self.catOut
          }
        ]
      }
    },
    c4_brokenLineChart: function () {
      let self = this;
      self.$option = null;
      self.$option = {
        title: {
          text: '进销项数据对比图',
          left: 'center',
          top: '10px'
        },
        legend: {
          data: ['进项', '销项'],
          left: '60%',
          top: '15px'
        },
        axisPointer: {
          show: 'true',
          type: 'line'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            show: 'true',
            label: {
              formatter: function (params) {
                return params.seriesData[0] ? `${self.unit == '周' ? (self.unit + params.value) : (params.value + self.unit)} 利润：${self.dataProfit[params.seriesData[0].dataIndex]}` : `${self.unit == '周' ? (self.unit + params.value) : (params.value + self.unit)}`
              }
            }
          },
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
            dataView: {readOnly: false}
          }
        },
        grid: {
          left: '8%',
          right: '6%',
          top: '15%',
          bottom: '21%',
          containLabel: false
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            bottom: '5%',
            startValue: 0,
            endValue: 11,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        xAxis: {
          show: true,
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: true
          },
          data: self.date
        },
        yAxis: {
          type: 'value',
          max: 'dataMax',
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: '进项',
            type: 'line',
            stack: '总额',
            areaStyle: {normal: {}},
            data: self.dataIn,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '进项平均值'}
              ]
            }
          },
          {
            name: '销项',
            type: 'line',
            stack: '总额',
            areaStyle: {normal: {}},
            data: self.dataOut,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '进项平均值'}
              ]
            }
          }
        ]
      }
    },
    c5_pieChart: function () {
      let self = this;
      self.$option = null;
      self.$option = {
        title: [
          {
            text: '本月进项数据图',
            left: '22%',
            top: '15%'
          },
          {
            text: '本月销项数据图',
            right: '22%',
            top: '15%'
          },
        ],
        series: [
          {
            name: '进项：',
            type: 'pie',
            radius: '40%',
            center: ['30%', '60%'],
            data: self.catIn,
            label: {
              normal: {
                formatter: '{b}'
              }
            }
          },
          {
            name: '销项：',
            type: 'pie',
            roseType: 'radius',
            radius: '40%',
            center: ['70%', '60%'],
            data: self.catOut,
            label: {
              normal: {
                formatter: '{b}：{d}%',
              }
            },
          }
        ],
        legend: {
        	  type: 'scroll',
        	  orient: 'vertical',
        	  height: '400px',
        	  x: 'right',
        	  data: self.category,
        	  formatter: function (name) {
        	    return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
        	  },
        	  tooltip: {
        	    show: true
        	  }
        	},
        tooltip: {
          trigger: 'item',
          formatter: '{a0}{c0}元<br/>({d0}%)',
          position: 'right',
          padding: 5
        }
      }
    },
    c6_barChart: function () {
      let self = this;
      self.$option = null;
      self.$option = {
        title: {
          text: '本月进销项对比图',
          left: 'center',
          bottom: '20px'
        },
        legend: {
          data: ['进项', '销项'],
          left: '60%',
          bottom: '20px'
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              formatter: function (params) {
                return params.seriesData[0] ? `${self.unit == '周' ? (self.unit + params.value) : (params.value + self.unit)} 利润：${self.dataProfit[params.seriesData[0].dataIndex]}` : `${self.unit == '周' ? (self.unit + params.value) : (params.value + self.unit)}`
              }
            }
          },
        },
        grid: {
          left: '8%',
          right: '6%',
          top: '15%',
          bottom: '21%',
          containLabel: false
        },
        xAxis: {
          show: true,
          type: 'category',
          splitLine: {
            show: true
          },
          data: self.date
        },
        yAxis: {
          type: 'value',
          max: 'dataMax',
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: '进项',
            type: 'bar',
            stack: '总额',
            areaStyle: {normal: {}},
            data: self.dataIn,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '进项平均值'}
              ]
            }
          },
          {
            name: '销项',
            type: 'bar',
            stack: '总额',
            areaStyle: {normal: {}},
            data: self.dataOut,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '进项平均值'}
              ]
            }
          }
        ]
      }
    },
    /***** 数据模拟生成  ******/
    setModel: function (config) {
      let self = this,
        defaultConfig = {
          type: TYPE_YEAR
        };
      $.extend(defaultConfig, config);
      // 初始化类型
      self.proCategory();
      // 初始化日期
      self.proDate(config);
      switch (defaultConfig.type) {
        case TYPE_ALL:
        	$.ajax({
                url: 'analysisData.jsp',
                type: 'GET',
                dataType: 'json',
                data:{type:'0',year:'0',month:'0'},
                success: function (res) {
                  self.mock = eval(res);
                  console.log(self.mock);
                  self.initData(defaultConfig.type);
                  if (!self.$chart.length) {
                    self.initEcharts();
                  } else {
                    for(let index = 0; index < self.$chart.length; index++) {
                      self.view(self.$dom.eq(index).data('type'), index);
                    }
                  }
                }
              });
          /*$.ajax({
            url: 'lib/mock/mock.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
              self.mock = res;
              console.log(self.mock);
              self.initData(defaultConfig.type);
              if (!self.$chart.length) {
                self.initEcharts();
              } else {
                for (let index = 0; index < self.$chart.length; index++) {
                  self.view(self.$dom.eq(index).data('type'), index);
                }
              }
            }
          });*/
          break;
        case TYPE_YEAR:
        	$.ajax({
                url: 'analysisData.jsp',
                type: 'GET',
                dataType: 'text',
                data:{type:'1',year:defaultConfig.year,month:'0'},
                success: function (res) {
                	self.mock=eval(res);               
                	console.log(self.mock);
                  self.initData(defaultConfig.type);
                  if (!self.$chart.length) {
                    self.initEcharts();
                  } else {
                    for(let index = 0; index < self.$chart.length; index++) {
                      self.view(self.$dom.eq(index).data('type'), index);
                    }
                  }
                }
              });
          /*$.ajax({
            url: 'lib/mock/mock.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
              self.mock = $.grep(res, function (item) {
                return item.year == defaultConfig.year;
              });
              self.initData(defaultConfig.type);
              if (!self.$chart.length) {
                self.initEcharts();
              } else {
                for (let index = 0; index < self.$chart.length; index++) {
                  self.view(self.$dom.eq(index).data('type'), index);
                }
              }
            }
          });*/
          break;
        case TYPE_WEEK:
        case TYPE_DAY:
        	$.ajax({
                url: 'analysisData.jsp',
                type: 'GET',
                dataType: 'text',
                data:{type:'2',year:defaultConfig.year,month:defaultConfig.month},
                success: function (res) {
                	self.mock=eval(res);
                	
                  self.initData(defaultConfig.type);
                  if (!self.$chart.length) {
                	  console.log('新建');
                    self.initEcharts();
                  } else {
                	  console.log('刷新');
                    for(let index = 0; index < self.$chart.length; index++) {
                      self.view(self.$dom.eq(index).data('type'), index);
                    }
                  }
                }
              });
          /*$.ajax({
            url: 'lib/mock/mock.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
              self.mock = $.grep(res, function (item) {
                return item.year == defaultConfig.year && item.month == defaultConfig.month;
              });
              self.initData(defaultConfig.type);
              if (!self.$chart.length) {
                self.initEcharts();
              } else {
                for (let index = 0; index < self.$chart.length; index++) {
                  self.view(self.$dom.eq(index).data('type'), index);
                }
              }
            }
          });*/
          break;
        case TYPE_LAST_WEEK:
          $.ajax({
            url: 'lib/mock/mock.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
              let curDate = new Date(defaultConfig.year + '/' + defaultConfig.month + '/' + defaultConfig.day),
                lastWeekDay = new Date();
              lastWeekDay.setDate(curDate.getDate() - config.lastDay);
              self.mock = $.grep(res, function (item) {
                return new Date(item.year + '/' + item.month + '/' + item.day) >= lastWeekDay && new Date(item.year + '/' + item.month + '/' + item.day) <= curDate;
              });
              self.initData(defaultConfig.type);
              if (!self.$chart.length) {
                self.initEcharts();
              } else {
                for (let index = 0; index < self.$chart.length; index++) {
                  self.view(self.$dom.eq(index).data('type'), index);
                }
              }
            }
          });
          break;
        default:
          break;
      }
    },
    initData: function (type) {
      let self = this;
      self.reset();
      let date = '';
      
      self.mock.forEach((item) => {
    	  console.log('mock-------', item);
        // 按时间计算金额
        switch (type) {
          case TYPE_ALL:
            date = item.year;
            break;
          case TYPE_YEAR:
            date = item.month;
            break;
          case TYPE_WEEK:
            date = (new Date(item.year + '/' + item.month + '/' + item.day)).getDay();
            date = date == 0 ? 7 : date;
            break;
          case TYPE_DAY:
            date = item.day;
            break;
          case TYPE_LAST_WEEK:
            date = item.month + '.' + item.day;
            break;
          default:
            break;
        }
        self.mapDate_Money(type, item, date);
        // 按类型计算金额
        self.mapCategory_Money(item);
      });
      let _datain = 0, _dataout = 0;
      self.date.forEach((date) => {
        _datain = self.dataOutMap[date] ? self.dataOutMap[date].money : 0;
        _dataout = self.dataInMap[date] ? self.dataInMap[date].money : 0;
        self.dataOut.push(parseFloat(_dataout).toFixed(FIXED));
        self.dataIn.push(parseFloat(_datain).toFixed(FIXED));
        self.dataProfit.push((parseFloat(_dataout) - parseFloat(_datain)).toFixed(FIXED));
      });
      console.log('类型', self.category)
      self.category.forEach((category) => {
        _datain = self.catOutMap[category] ? self.catOutMap[category].money : 0;
        _dataout = self.catInMap[category] ? self.catInMap[category].money : 0;
        if (_datain) {
        	self.catIn.push({value: parseFloat(_datain).toFixed(FIXED), name: category});
        }
        if (_dataout) {
        	 self.catOut.push({value: parseFloat(_dataout).toFixed(FIXED), name: category});
        }
        if (_datain || _dataout) {
        	self.catProfit.push({value: (parseFloat(_dataout) - parseFloat(_datain)).toFixed(FIXED), name: category});
        }    
      });
      console.log('进项map',self.dataInMap)
      console.log('进项item', self.dataIn)
    },
    mapCategory_Money: function (item) {
      let self = this;
      if (item.classify == DATA_IN) {
        self.catInMap[item.category] = {
          category: item.category,
          money: typeof self.catInMap[item.category] == 'undefined' ? parseFloat(item.money) : parseFloat(self.catInMap[item.category].money) + parseFloat(item.money)
        };
      } else if (item.classify == DATA_OUT) {
        self.catOutMap[item.category] = {
          category: item.category,
          money: typeof self.catOutMap[item.category] == 'undefined' ? parseFloat(item.money) : parseFloat(self.catOutMap[item.category].money) + parseFloat(item.money)
        };
      }
    },
    mapDate_Money: function (type, item, date) {
      let self = this;
      // 按天显示，可查询更多信息
      console.log('map填充', item, date)
      if (type != TYPE_DAY && type != TYPE_LAST_WEEK) {
        if (item.classify == DATA_IN) {
          self.dataInMap[date] = {
            date: date,
            money: (typeof self.dataInMap[date] == 'undefined' ? parseFloat(item.money) : parseFloat(self.dataInMap[date].money) + parseFloat(item.money))
          };
        } else if (item.classify == DATA_OUT) {
          self.dataOutMap[date] = {
            date: date,
            money: (typeof self.dataOutMap[date] == 'undefined' ? parseFloat(item.money) : parseFloat(self.dataOutMap[date].money) + parseFloat(item.money))
          };
        }
      } else {
        if (item.classify == DATA_IN) {
          self.dataInMap[date] = {
            date: date,
            money: (typeof self.dataInMap[date] == 'undefined' ? parseFloat(item.money) : parseFloat(self.dataInMap[date].money) + parseFloat(item.money)),
            other: {
              category: item.category,
              detail: item.detail,
              code: item.code,
              name: item.name
            }
          };
        } else if (item.classify == DATA_OUT) {
          self.dataOutMap[date] = {
            date: date,
            money: (typeof self.dataOutMap[date] == 'undefined' ? parseFloat(item.money) : parseFloat(self.dataOutMap[date].money) + parseFloat(item.money)),
            other: {
              category: item.category,
              detail: item.detail,
              code: item.code,
              name: item.name
            }
          };
        }
      }
    },
    minumOperation: function (data) {
      let res = [];
      data.forEach((item) => {
        res.push(-item);
      });
      return res;
    },
    proDate: function (config) {
      let self = this;
      self.date = [];
      if (config.type == TYPE_ALL) {
        for (let i = START_YEAR, j = 0; i <= END_YEAR; i++, j++) {
          self.date[j] = i;
        }
        self.unit = '年';
      } else if (config.type == TYPE_YEAR) {
        for (let i = 0; i < 12; i++) {
          self.date[i] = i + 1;
        }
        self.unit = '月'
      } else if (config.type == TYPE_WEEK) {
        for (let i = 0; i < 7; i++) {
          self.date[i] = i + 1;
        }
        self.unit = '周'
      } else if (config.type == TYPE_DAY) {
        let maxDay = self.calcMonthDay(config.year, config.month);
        for (let i = 0; i < maxDay; i++) {
          self.date[i] = i + 1;
        }
        self.unit = '号'
      } else if (config.type == TYPE_LAST_WEEK) {
        let curDate = new Date(config.year + '/' + config.month + '/' + config.day),
          lastWeekDay = new Date();
        lastWeekDay.setDate(curDate.getDate() - config.lastDay);
        for (let i = 0; i < config.lastDay; i++) {
          lastWeekDay.setDate(lastWeekDay.getDate() + 1);
          self.date[i] = (lastWeekDay.getMonth() + 1) + '.' + lastWeekDay.getDate();
        }
        self.unit = '';
      }
    },
    proCategory: function () {
      let self = this;
      self.category = [];
      function reverse(cat) {
        for (let i = 0; i < cat.length; i++) {
          if (cat[i].sub) {
            reverse(cat[i].sub);
          } else {
        	  self.category.push(cat[i].name);
          }
        }
      }
      reverse(CATEGORY);
    },
    calcMonthDay: function (year, month) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 29;
          } else {
            return 28;
          }
        default:
          return 30;
      }
    },
    reset: function () {
      let self = this;
      // 用于计算日期与金额映射关系
      self.dataInMap = [];
      self.dataOutMap = [];
      self.catInMap = [];
      self.catOutMap = [];
      // 计算好的对象数组
      self.dataIn = [];
      self.dataOut = [];
      self.dataProfit = [];
      self.catIn = [];
      self.catOut = [];
      self.catProfit = [];
    }
  };

  function EchartsHandle(_echartsDom, config) {
    EchartsArea.init(_echartsDom, config);
  }

  function ajaxEcharts(type, index, config) {
    if (config) {
      EchartsArea.setModel(config)
    } else {
      EchartsArea.view(type, index);
    }
  }

  function resizeCharts() {
    EchartsArea.resizeCharts();
  }

  return {
    EchartsHandle: EchartsHandle,
    ajaxEcharts: ajaxEcharts,
    resizeCharts: resizeCharts,
  }
})();
window.EchartsAPI = $.extend((window.EchartsAPI || {}), _EchartsAPI);
