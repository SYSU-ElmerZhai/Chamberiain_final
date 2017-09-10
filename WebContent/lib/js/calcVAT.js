let $year = $('#year'),
  $month = $('#month'),
  $btn_calc = $('.J_btn_calc'),
  $method = $('#method'),
  $ifAllYear = $('#ifAllYear'),
  $taxRate = $('#taxRate'),
  $res = $('.J_res');
for (let i = 1970; i < 2100; i++) {
  if (i == 2017) {
    $year.append(`<option value="${i}" selected>${i}年</option>`);
  } else {
    $year.append(`<option value="${i}">${i}年</option>`);
  }
}
for (let i = 1; i <= 12; i++) {
  if (i == 8) {
    $month.append(`<option value="${i}" selected>${i}月</option>`);
  } else {
    $month.append(`<option value="${i}">${i}月</option>`);
  }
}
$ifAllYear.click(function(){
	if ($ifAllYear.prop("checked")) {
		$month.attr("disabled","disabled");
     }else {
    	 $month.removeAttr("disabled");
      }
})
$btn_calc.bind('click',()=>{
	//type为0时是按照年计算，为1时是按照月计算
	let obj={
			type:'0',
			year:'2017',
			month:'8'
	}
	if($ifAllYear.prop("checked")){
		obj.type='0';
		obj.year=$('#year option:selected').val();
		obj.month='0';
	}else {
		obj.type='1';
		obj.year=$('#year option:selected').val();
		obj.month=$('#month option:selected').val();
	}
	$.ajax({
		url:"CalcVAT.jsp",
		method:'get',
		data:obj,
		complete:function(XMLHttpRequest,textStatus){
			calc(eval(XMLHttpRequest.responseText));
		}
	})
	return false;
})
function calc(arr) {
	let tax_rate=Number($taxRate.val())/100;
	let dataIn=0,dataOut=0,dataResult;
	arr.forEach(function(item,index){
		if(item.classify==="1"){
			dataIn=dataIn+Number(item.money);
		}else {
			dataOut=dataOut+Number(item.money);
		}
	})
	if($('.J_ifTax:checked').val()==="1"){
		dataResult=(dataIn-dataOut)*tax_rate;
		$('.J_resultShow').val(dataResult);
		console.log("含税计算");
	}else {
		dataResult=((dataIn-dataOut)*tax_rate)/(1+tax_rate);
		$('.J_resultShow').val(dataResult);
		console.log("不含税计算");
	}
}
/*$btn_calc.bind('click', () => {
  if ($taxRate.val()) {
      if ($ifAllYear.val() == '全年') {
    	  $month.attr("disabled","disabled")
      }
      else {
    	  $month.removeAttr("disabled");
      }
  }
});*/
