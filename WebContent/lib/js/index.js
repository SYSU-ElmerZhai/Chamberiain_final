$('.J_content_iframe').attr('src', 'home.html');
$('.J_list_item').on('click', function() {
  $(this).addClass('f-active').siblings().removeClass('f-active');
  if ($(this).hasClass('u-menu')) {
    if (!$(this).find('.icon-down_menu').hasClass('f-hide')) {
      $(this).find('.icon-down_menu').addClass('f-hide');
      $(this).siblings('.u-xs-item').addClass('f-hide');
    } else {
      $(this).find('.icon-down_menu').removeClass('f-hide');
      $(this).siblings('.u-xs-item').removeClass('f-hide');
    }
  } else if (!$(this).hasClass('u-xs-item')) {
    $('.u-xs-item').addClass('f-hide');
    $('.icon-down_menu').addClass('f-hide');
  }
  $('.J_content_iframe').attr('src', $(this).attr('href'));
});
$('.J_exit').on('click', function() {
	//$('.f-login-in').addClass('f-login-out').removeClass('f-login-in');
	window.location.href='FirstPage_v1.jsp';
});
$('.J_user').text(localStorage.getItem('userName'));
if(localStorage.getItem('user_role')=='1'){
	$('.J_role').removeClass('f-hide');
	console.log("管理者");
}else {
	$('.J_role').addClass('f-hide');
	console.log("使用者");
}

let $timeCur = $('.J_cur_time'),
timer = setInterval(() => {
    let _date = new Date();
    $timeCur.text(_date.getFullYear() + '年'
        + (_date.getMonth() + 1) + '月'
        + (_date.getDate() + '日 ')
        + _date.getHours() + ':' + _date.getMinutes());
}, 1000);

