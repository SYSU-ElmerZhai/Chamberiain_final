const $modelAll = $('.J_model_all'),
  $modelYear = $('.J_model_year'),
  $modelMonth = $('.J_model_month'),
  $modelWeek = $('.J_model_week'),
  $modelDay = $('.J_model_day'),
  $selectYear = $('.J_btn_year'),
  $selectMonth = $('.J_btn_month'),
  $selectMonthDp = $('.J_model_month_dp'),
  $choice = $('.J_choice'),
  $imgChoice = $('.J_img_choice'),
  $btnSearch = $('.J_btn_search'),
  $echartArea = $('.J-chart');
const onPage = {
  init: function () {
    let self = this;
    self.view();
    self.listen();
  },
  view: function () {
    let self = this;
    for (let i = 1970; i < 2100; i++) {
      if (i == 2017) {
        $selectYear.append(`<option value="${i}" selected>${i}年</option>`);
      } else {
        $selectYear.append(`<option value="${i}">${i}年</option>`);
      }
    }
    for (let i = 1; i <= 12; i++) {
      if (i == 8) {
        $selectMonth.append(`<option value="${i}" selected>${i}月</option>`);
      } else {
        $selectMonth.append(`<option value="${i}">${i}月</option>`);
      }
    }
    window.EchartsAPI.EchartsHandle($echartArea);
  },
  listen: function () {
    let self = this;
    $imgChoice.click(function () {
      window.EchartsAPI.ajaxEcharts($(this).index()+1, 0);
    });
    $modelAll.on('click', function() {
      if (!$(this).hasClass('f-active')) {
        window.EchartsAPI.ajaxEcharts(0, 0, {
          type: TYPE_ALL
        });
      }
      $(this).addClass('f-active').siblings().removeClass('f-active');
      $selectMonthDp.addClass('f-hide');
      $choice.addClass('f-hide');
    });
    $modelYear.on('click', function() {
      $(this).addClass('f-active').siblings().removeClass('f-active');
      $selectMonthDp.addClass('f-hide');
      $choice.removeClass('f-hide');
      $selectYear.removeClass('f-hide');
      $selectMonth.addClass('f-hide');
    });
    $modelMonth.on('click', function() {
      $(this).addClass('f-active').siblings().removeClass('f-active');
      $selectMonthDp.removeClass('f-hide');
      $selectYear.removeClass('f-hide');
      $selectMonth.removeClass('f-hide');
      $choice.removeClass('f-hide');
    });
    $imgChoice.on('click', function () {
      $echartArea.eq(0).data('type', $(this).index()+1);
      window.EchartsAPI.ajaxEcharts($echartArea.eq(0).data('type'), 0);
    });
    let config = null;
    $btnSearch.on('click', function() {
      let classList = $('.f-active').attr('class');
      if (classList.indexOf('J_model_year') != -1) {
        config = {
          type: TYPE_YEAR,
          year: $selectYear.val()
        }
      } else if (classList.indexOf('J_model_month') != -1) {
        config = {
          type: ($selectMonthDp.val() == $modelWeek.val()) ? TYPE_WEEK : TYPE_DAY,
          year: $selectYear.val(),
          month: $selectMonth.val()
        }
      }
      window.EchartsAPI.ajaxEcharts(0, 0, config);
    });
  }
};
onPage.init();