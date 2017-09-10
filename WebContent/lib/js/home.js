const DONE = 1,
  NOT_DONE = 0,
  PAST = -1,
  NOT_PAST = 0,
  TODAY = 1,
  REWRITE = 1;


/*let init_data = [
  {
    id: '719A33',
    name: '买牛奶',
    month: '8',
    day: '26',
    time: '12:00',
    status: NOT_DONE // 进行中
  },
  {
    id: 'BF4616',
    name: '录入七月进销项发票数据',
    month: '8',
    day: '25',
    time: '9:00',
    status: DONE // 已完成
  },
  {
    id: '782E06',
    name: '检查二月销项数据',
    month: '1',
    day: '17',
    time: '12:00',
    status: NOT_DONE
  },
  {
    id: 'EB693B',
    name: '买车',
    month: '8',
    day: '30',
    time: '13:00',
    status: NOT_DONE
  },
  {
    id: 'EAF402',
    name: '逛街',
    month: '8',
    day: '25',
    time: '14:00',
    status: NOT_DONE
  },
  {
    id: 'AAF302',
    name: '大促需求会',
    month: '8',
    day: '26',
    time: '23:00',
    status: NOT_DONE
  }
];*/
let init_data=[];
$.ajax({
	url:'Memo.jsp',
	method:"GET",
	data:{userName:localStorage.getItem('userName'),event:"4"},
	complete:function(XMLHttpRequest,textStstus){
		init_data=eval(XMLHttpRequest.responseText);
		console.log(init_data);
		render();
	}
})
let $list = $('.J_list');
function timeParese(month, day, time) {
  return {
    month: month,
    day: day,
    time: time,
    resString: function()  {
      let _this = this;
      return function()  {
        return _this.month + '月' + _this.day + '日 ' + _this.time;
      }
    }
  }
}
function addActive(el) {
  $(el).addClass('f-active').siblings().removeClass('f-active');
}
function render(){
	init_data.forEach((thing) => {
  let _time = timeParese(thing.month, thing.day, thing.time).resString()();
  console.log(_time);
  $list.append(
    `<li class="u-list-item J_things_item" onclick="addActive(this)">
          <span class="u-circle"></span>
          <p class="time">${_time}</p>
          <div class="u-txt">
              <div class="name">${thing.name}</div>
          </div>
      </li>`
  );
});
}


