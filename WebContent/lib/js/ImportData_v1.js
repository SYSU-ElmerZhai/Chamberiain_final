$('.J_time').click(function () {
  $(this).blur();
  $(this).siblings('.ui-datepicker-trigger').trigger('click');
});
$('.J-datePicker').each(function () {
  let self = $(this);
  self.datepicker({
    showOn: "button",
    buttonImage: "lib/images/not_click.png",
    buttonImageOnly: true,
    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: 'yymmdd',
    onSelect: function () {
      // 在这里获取日期，打开F12的console台查看输出值
//                    console.log($('.J-datePicker').val());
      let date = self.datepicker("getDate");
      self.siblings('.time').val(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
    }
  });
});
$('.J_datain').click(function(){
	let obj={
		code:$('.moneyIn .invoiceCode').val(),
		name:$('.moneyIn .invoiceName').val(),
		category:$('.moneyIn .J_category').val(),
		detail:$('.moneyIn .remark').val(),
		year:$('.moneyIn .J_time').val().split('/')[0],
		month:$('.moneyIn .J_time').val().split('/')[1],
		day:$('.moneyIn .J_time').val().split('/')[2],
		money: $('.moneyIn .J_money').val(),
		classify:'1'
	}
	console.log(obj);
	$.ajax({
		url:'DataIn.jsp',
		method:'GET',
		data:obj,
		complete:function(XMLHttpRequest,textStatus){
			console.log(textStatus);
		}
	})
	
	return true;
})

$('.J_dataout').click(function(){
	let obj={
			code:$('.moneyOut .invoiceCode').val(),
			name:$('.moneyOut .invoiceName').val(),
			category:$('.moneyOut .J_category').val(),
			detail:$('.moneyOut .remark').val(),
			year:$('.moneyOut .J_time').val().split('/')[0],
			month:$('.moneyOut .J_time').val().split('/')[1],
			day:$('.moneyOut .J_time').val().split('/')[2],
			money: $('.moneyOut .J_money').val(),
			classify:'0'
	}
	console.log(obj);
	$.ajax({
		url:'DataIn.jsp',
		method:'GET',
		data:obj,
		complete:function(XMLHttpRequest,textStatus){
			console.log(textStatus);
		}
	})
	
	return true;
})