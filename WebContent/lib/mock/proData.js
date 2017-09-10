/* 模拟账目数据 */
const category = [
  {
    name: '农、林、牧、渔业产品',
    sub: [
      {
        name: '农业产品',
        sub: [
          {
            name: '谷物',
            sub: [
              {
                name: '稻谷',
              },
              {
                name: '小麦',
              },
              {
                name: '玉米',
              },
              {
                name: '谷子'
              },
              {
                name: '高粱'
              },
              {
                name: '大麦'
              },
              {
                name: '燕麦'
              },
              {
                name: '黑麦'
              },
              {
                name: '荞麦'
              },
              {
                name: '其他谷物'
              }
            ]
          },
          {
            name: '薯类',
            sub: [
              {
                name: '马铃薯',
              },
              {
                name: '木薯',

              },
              {
                name: '甘薯',
              },
              {
                name: '其他薯类'
              }
            ]
          },
          {
            name: '油料作物',
            sub: [
              {
                name: '花生',
              },
              {
                name: '油菜籽',

              },
              {
                name: '芝麻',
              },
              {
                name: '其他油料'
              }
            ]
          },
          {
            name: '干豆类',
            sub: [
              {
                name: '大豆',
              },
              {
                name: '绿豆',

              },
              {
                name: '其他杂豆',
              }
            ]
          },
          {
            name: '糖料',
            sub: [
              {
                name: '甘蔗',
              },
              {
                name: '甜菜',

              },
              {
                name: '其他糖料',
              }
            ]
          },
          {
            name: '未加工烟草',
            sub: [
              {
                name: '未去梗烤烟叶',
              },
              {
                name: '其他未加工烟草',

              }
            ]
          },
          {
            name: '饲料作物',
            sub: [
              {
                name: '饲料牧草',
              },
              {
                name: '其他饲料作物',

              }
            ]
          },
          {
            name: '农作物副产品',
            sub: [
              {
                name: '作物茎叶、秆、根'
              },
              {
                name: '其他农作物副产品'
              }
            ]
          },
          {
            name: '蔬菜及食用菌',
            sub: [
              {
                name: '甘蓝类蔬菜'
              },
              {
                name: '芹菜类叶菜类蔬菜'
              },
              {
                name: '瓜类蔬菜'
              },
              {
                name: '番茄类茄果类蔬菜'
              },
              {
                name: '菜豆类豆类蔬菜'
              },
              {
                name: '莲藕类水生蔬菜'
              },
              {
                name: '竹笋类多年生及杂类蔬菜'
              },
              {
                name: '香菇类食用菌'
              },
              {
                name: '绿豆芽类芽苗菜'
              },
              {
                name: '其他蔬菜'
              }
            ]
          },
          {
            name: '花卉',
            sub: [
              {
                name: '盆栽花'
              },
              {
                name: '鲜切花及花蕾'
              },
              {
                name: '切叶'
              },
              {
                name: '切枝'
              },
              {
                name: '干燥花'
              }
            ]
          },
          {
            name: '园艺产品',
            sub: [
              {
                name: '园艺产品'
              },
              {
                name: '其他盆景及园艺产品'
              }
            ]
          },
          {
            name: '水果及坚果',
            sub: [
              {
                name: '水果(园林水果)'
              },
              {
                name: '干制水果'
              },
              {
                name: '食用坚果'
              }
            ]
          },
          {
            name: '茶及饮料原料',
            sub: [
              {
                name: '茶叶'
              },
              {
                name: '饮料原料'
              },
              {
                name: '其他未列明饮料原料'
              }
            ]
          },
          {
            name: '中草药材'
          },
          {
            name: '种子、种苗',
            sub: [
              {
                name: '种用谷物'
              },
              {
                name: '种用薯类'
              },
              {
                name: '种用油料'
              },
              {
                name: '种用饲料作物'
              },
              {
                name: '蔬菜籽'
              },
              {
                name: '花草种'
              },
              {
                name: '水果籽'
              },
              {
                name: '其他种子、种苗'
              }
            ]
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

let DataAPI = (function () {
  let proData = {
    init: function (obj) {
      let self = this;
      self.data = [];
      self.category = [];
      for (let year = obj.startYear; year <= obj.endYear; year++) {
        for (let month = 1; month <= 12; month++) {
          for (let day = 1; day <= self.calcMonthDays(year, month); day++) {
            let _obj = {
              code: self.proCode(),
              name: self.proName(),
              category: self.proCategory(),
              detail: '',
              year: year,
              month: month,
              day: day,
              money: self.proMoney(),
              classify: self.proClassify()
            };
            self.data.push(self.templete(_obj));
          }
        }
      }
    },
    templete: function (obj) {
      return {
        code: obj.code,
        name: obj.name,
        category: obj.category,
        detail: obj.detail,
        year: obj.year,
        month: obj.month,
        day: obj.day,
        money: obj.money,
        classify: obj.classify
      };
    },
    proCode: function () {
      return Math.floor(0x100000000 + Math.random() * 0x100000000).toString(16).slice(1).toUpperCase();
    },
    proName: function () {
      return Math.floor(0x100000000 + Math.random() * 0x100000000).toString(10).slice(1).toUpperCase();
    },
    proCategory: function () {
      let self = this;

      function reverse(cat) {
        for (let i = 0; i < cat.length; i++) {
          if (cat[i].sub) {
            reverse(cat[i].sub);
            self.category.push(cat[i].name);
          } else {
            return;
          }
        }
      }

      reverse(category);
      return self.category[Math.round(Math.random() * (self.category.length - 1))];
    },
    proClassify: function () {
      let seed = Math.random();
      return Math.random() > seed ? 1 : 0;
    }
    ,
    proMoney: function () {
      let self = this;
      return self.random(50000);
    }
    ,
    random: function (max) {
      return (Math.random() * max).toFixed(2);
    }
    ,
    calcMonthDays: function (year, month) {
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
    }
    ,
    getData: function (obj) {
      this.init(obj);
      return this.data;
    }
  };

  function getData(config) {
    let defaultConfig = {
      startYear: 2015,
      endYear: 2018,
      maxCount: 1000
    };
    $.extend(defaultConfig, config);
    let data = proData.getData(defaultConfig);
    return JSON.stringify(data);
  }

  function getN_Data(config) {
    let defaultConfig = {
      startYear: 2015,
      endYear: 2018,
      maxCount: 1000
    };
    $.extend(defaultConfig, config)
    let data = proData.getData(defaultConfig),
      res = new Array();
    for (let i = 0; i < config.maxCount; i++) {
      if (data.length) {
        let randomIndex = Math.floor(Math.random() * data.length);
        res.push(data[randomIndex]);
        data.splice(randomIndex, 1);
      } else {
        break;
      }
    }
    return JSON.stringify(res);
  }

  return {
    getData: getData,
    getN_Data: getN_Data
  }
})();

window.DataAPI = $.extend((window.DataAPI || {}), DataAPI);