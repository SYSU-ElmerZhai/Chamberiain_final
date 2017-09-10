const category =  [
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

let $select_1 = $('.J_select_1'),
  $select_2 = $('.J_select_2'),
  $select_3 = $('.J_select_3'),
  $select_4 = $('.J_select_4'),
  $btn_sure = $('.J_btn_sure_category'),
  $txt_res = $('.J_txt_res'),
  $category = $('.J_category'),
  $pop = $('.J_pop'),
  $btn_close = $('.J_btn_close'),
  $popCategory = $('.m-pop-category');

let onPge = {
  init: function () {
    let self = this;
    self.$dom = null;
    self.resCategory = '';
    self.category1_name = '';
    self.category2_name = '';
    self.category3_name = '';
    self.category4_name = '';
    self.view();
    self.listen();
  },
  view: function () {
    let self = this;
    category.forEach((item) => {
      if (item.name) {
        $select_1.append(self.templete(item.name));
      }
    });
  },
  listen: function () {
    let self = this, category1, category2, category3;
    $select_1.change(function () {
      let name = $(this).val();
      self.category1_name = name;
      category1 = self.findSub(category, name);
      self.updateDropList($select_2, category1, 2);
      $txt_res.text(self.lastCategory());
    });
    $select_2.change(function () {
      let name = $(this).val();
      self.category2_name = name;
      category2 = self.findSub(category1.sub, name);
      self.updateDropList($select_3, category2, 3);
      $txt_res.text(self.lastCategory());
    });
    $select_3.change(function () {
    	let name = $(this).val();
        self.category3_name = name;
        $txt_res.text(self.lastCategory());
    });
    $btn_sure.click(function () {
      if (($select_1.val() || $select_1.hasClass('f-hide'))
        && ($select_2.val() || $select_2.hasClass('f-hide'))
        && ($select_3.val() || $select_3.hasClass('f-hide'))
        && ($select_4.val() || $select_4.hasClass('f-hide'))) {
        self.$dom.data('category', self.resCategory);
        self.$dom.val(self.lastCategory());
        if (self.$dom.hasClass('J_pop_category')) {
          $popCategory.addClass('f-hide');
        } else {
          $pop.addClass('f-hide');
          $popCategory.addClass('f-hide');
        }
        return false;
      }
    });
    $category.click(function () {
      $(this).blur();
      $pop.removeClass('f-hide');
      $popCategory.removeClass('f-hide');
      self.resCategory = $(this).val();
      self.$dom = $(this);
    });
    $btn_close.click(function () {
        $popCategory.addClass('f-hide');
        if (self.$dom && self.$dom.hasClass('J_pop_category')) {
          if (!$(this).hasClass('f-not-allClose')) {
            $popEdit.addClass('f-hide');
            $pop.addClass('f-hide');
          }
        } else {
          $pop.addClass('f-hide');
        }
    });
  },
  findSub: function (arr, _name) {
    return $.grep(arr, function (item) {
      return item.name == _name;
    })[0];
  },
  updateDropList: function (el, cat, index) {
    let self = this;
    el.empty().append(self.templete(''));
    if (cat.sub) {
      el.removeClass('f-hide');
      $(el).attr('required','required');
      cat.sub.forEach((item) => {
        el.append(self.templete(item.name));
      });
    } else {
      self[`category${index}_name`] = '';
      el.addClass('f-hide');
      $(el).removeAttr('required');
    }
  },
  templete: function (name, ifSelected) {
    return `<option value="${name}" ${ifSelected ? 'selected' : ''}>${name}</option>`;
  },
  // getCategory: function () {
  //   let self = this;
  //   console.log(self.category2_name)
  //   return self.category1_name
  //   + (self.category2_name ? ('/' + self.category2_name) : '')
  //   + (self.category3_name ? ('/' + self.category3_name) : '');
  // },
  lastCategory: function () {
    let self = this;
    if (self.category4_name) {
      return self.category4_name;
    } else if (self.category3_name) {
      return self.category3_name;
    } else if (self.category2_name) {
      return self.category2_name;
    } else {
      return self.category1_name;
    }
  }
};
onPge.init();