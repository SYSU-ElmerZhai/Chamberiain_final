/*
  memo.1.0.0.js
  anthor: 李素薇
  接口须知：
    页面初始化：init
    调试专用：调用setData可以查看修改数据效果, clear可以清空所有数据
    若接入数据库：
      每次点击【完成】【删除】【新加数据】，都要用getData()获取最新数据更新到数据库中
*/

const DONE = 1,
  NOT_DONE = 0,
  PAST = -1,
  NOT_PAST = 0,
  TODAY = 1,
  REWRITE = 1;
let $readyList = $('.J_list_ready'),
  $todayList = $('.J_list_today'),
  $historyList = $('.J_list_history'),
  $date = $('#thingDate'),
  $time = $('#thingTime'),
  $name = $('#thingName'),
  $btn_sure = $('.J_btn_sure'),
  $btn_add = $('.J_btn_add'),
  $pop = $('.J_pop'),
  $readyCount = $('#readyCount'),
  $todayCount = $('#todayCount'),
  $historyCount = $('#historyCount'),
  $popUpdate = $('.J_pop_update'),
  $popAdd = $('.J_pop_add'),
  $date2 = $('#thingDate2'),
  $time2 = $('#thingTime2'),
  $name2 = $('#thingName2'),
  $id2 = $('#thingId2'),
  $status2 = $('#thingStatus2'),
  $btn_sure2 = $('.J_btn_sure2'),
  $btn_close = $('.J_btn_close');
  

let MemoAPI = (() => {
  let onPage = {
    init: function(data)  {
      let self = this;
      self.$updateDom = null;
      self._today = new Date();
      self.things = [];
      self.view(data);
      self.listen();
    },
    view: function(data)  {
      let self = this;
      data.forEach((thing) => {
    	let json_thing=JSON.parse(thing);
    	console.log(json_thing);
        self.addNewItem(json_thing)
      });
    },
    listen: function()  {
	$btn_sure2.click(function () {
	    if ($name2.val() && $date2.val() && $time2.val()) {
	        let _thing = {
	            id: $id2.val(),
	            name: $name2.val(),
	            month: (new Date($date2.val())).getMonth() + 1,
	            day: (new Date($date2.val())).getDate(),
	            time: $time2.val(),
	            status: $status2.val(),
	            userName:localStorage.getItem('userName'),
	            event:"5"
	        };
	        // 事件分类
	        self.eventClass(_thing);
	        // 更新数据库
	        $.ajax({
	        	url:"Memo.jsp",
	        	method:"GET",
	        	data:_thing,
	        	complete:function(XMLHttpRequest,textStatus){
	        		window.location.reload();
	  				console.log(textStatus);
	        	 }
	        });
	        
	    }
	    return false;
	});
      let self = this;
      $(window).bind('click', function(el) {
        if (!el.target.classList.contains('J_btn_more')) {
          $('.u-more').addClass('f-hide');
        }
      });
      $btn_close.bind('click', function()  {
        $pop.addClass('f-hide');
      });
      $btn_sure.bind('click', function()   {
        if ($time.val() && $date.val() && $name.val()) {
          let thing = {
            id: self.randomID(),
            name: $name.val(),
            month: (new Date($date.val())).getMonth() + 1,
            day: (new Date($date.val())).getDate(),
            time: $time.val(),
            status: NOT_DONE
          };
          let event_target=thing;
          event_target.event="1";
          event_target.userName="elmer";
          $.ajax({
        	  method:"post",
        	  url:"Memo.jsp",
        	  data:event_target,
        	  complete:function(XMLHttpRequest,textStatus){
  				console.log(textStatus);
        	  }
          })
          self.addNewItem(thing);
          $pop.addClass('f-hide');
          return false;
        }
      });
      $btn_add.bind('click', function()   {
        $pop.removeClass('f-hide');
        $popAdd.removeClass('f-hide');
        $popUpdate.addClass('f-hide');
      });
      // 给初始化的DOM添加click监听事件
      self.moreOperation();
    },
    randomID: function() {
      return Math.floor(0x1000000 + Math.random() * 0x1000000).toString(16).slice(1).toUpperCase();
    },
    // 渲染模板
    templete: function(thing, iconClass) {
      //thing=JSON.parse(thing);
      let self = this,
        _time = self.timeParese(thing.month, thing.day, thing.time).resString()();
      return `<li class="u-list-item" data-id="${thing.id}">
        <span class="u-letter J_letter">${thing.name.toString().charAt(0)}</span>
         <div class="u-info">
              <p class="u-name J_name">${thing.name}</p>
              <p class="u-time ${iconClass} J_time">${_time}</p>
         </div>
         <span class="icon-more J_btn_more"></span>
         <div class="u-more f-hide">
              <div class="u-finish J_finish">完成</div>
              <div class="u-delete J_delete">删除</div>
              <div class="u-update J_update">修改</div>
         </div>
      </li>`
    },
    // 时间转格式
    timeParese: function(month, day, time) {
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
    },
    // 更多操作
    moreOperation: function()  {
      let self = this;
      $('.J_btn_more').click(function(){
        $(this).siblings('.u-more').removeClass('f-hide');
      });
      $('.J_finish').bind('click', function()  {
        $('.u-more').addClass('f-hide');
        self.finishItem($(this).closest('.u-list-item'));
      });
      $('.J_delete').bind('click', function()  {
        self.deleteItem($(this).closest('.u-list-item'));
      });
      $('.J_update').click(function () {
  		    let self = this,
  		    	_parent = $(this).closest('.u-more');
  		    self.$updateDom = _parent.closest('.u-list-item');
  		    $pop.removeClass('f-hide');
  		    $popUpdate.removeClass('f-hide');
  		    $popAdd.addClass('f-hide');
  		    let _time = _parent.siblings('.u-info').find('.J_time').text(),
  		            month = _time.split('月')[0],
  		            day = _time.split('月')[1].split('日')[0],
  		            time = _time.split(' ')[1],
  		            id = self.$updateDom.data('id');
  		    let classList = _parent.siblings('.u-info').find('.J_time').attr('class'),
  		            status = (classList.indexOf('icon-finished') > -1) ? DONE : NOT_DONE;
		    $name2.val(_parent.siblings('.u-info').find('.J_name').text());
  		$date2.val((new Date()).getFullYear() + '-' + (month<10?('0'+month):month) + '-' + (day<10?('0'+day):day));
  		    $time2.val(time);
  		    $id2.val(id);
  		    $status2.val(status);
  		});
    },
    // 检查事件状态
    checkStatus: function (thing) {
      /* 待办：
       1. 之前月
       2. 这个月，之前天
       今天：
       1. 这个月，这个天，之前时间
       已过期：
       1. 其他
       */
      let self = this;
      if (thing.month > self._today.getMonth() + 1
        || thing.month == self._today.getMonth() + 1 && thing.day > self._today.getDate()) {
        return NOT_PAST; // 待办
      } else if (thing.month == self._today.getMonth() + 1 && thing.day == self._today.getDate() && thing.time >= self._today.getHours() + ':' + self._today.getMinutes()) {
        return TODAY; // 今天
      } else {
        return PAST; // 过期
      }
    },
    // 对事件分类
    eventClass: function(thing, ifRewrite) {
      /* 检查事件状态插入对应位置：过期，未过期，今天
       1. 未完成 {
       未过期： 待办
       今天： 今天
       }
       2. 已过期 {
       已完成
       已过期
       }
       */
      let self = this;
      
      timeStatus = self.checkStatus(thing);

      if (thing.status == NOT_DONE && (timeStatus == NOT_PAST || timeStatus == TODAY)) {// 未完成
        $readyList.append(self.templete(thing,'icon-timer'));
        if (timeStatus == TODAY) {// 今天
          $todayList.append(self.templete(thing,'icon-timer'));
        }
      } else {
        // 已过期 || 已完成
        $historyList.append(self.templete(thing, (thing.status == DONE ? 'icon-finished' : 'icon-delete')));
      }
      // 给新插入的DOM节点绑定click事件
      self.moreOperation();
    },
    updateItem: function(thing) {
    	let self = this;
    	self.$updateDom.empty().append()
    },
    // 计算事件数量
    calcCount: function() {
      $readyCount.text($readyList.children().length);
      $historyCount.text($historyList.children().length);
      $todayCount.text($todayList.children().length);
    },
    finishItem: function(dom) {
      let self = this,
        targetID = dom.data('id');
      dom.find('.J_time').addClass('icon-finished').removeClass('icon-timer');
      dom.appendTo($historyList);
      self.things.forEach((thing) => {
        if (thing.id == targetID) {
          thing.status = DONE;
        }
      });
      $readyList.find(`.u-list-item[data-id=${targetID}]`).remove();
      $todayList.find(`.u-list-item[data-id=${targetID}]`).remove();
      self.calcCount();// 统计数量
      $.ajax({
    	  method:"post",
    	  url:"Memo.jsp",
    	  data:{id:targetID,event:"3"}
      })
    },
    addNewItem: function(thing) {
      let self = this;
      self.eventClass(thing);
      self.things.push(thing);
      self.calcCount();// 统计数量
    },
    deleteItem: function(dom) {
      let self = this,
        targetID = dom.data('id');
      console.log(targetID)
      self.things = $.grep(self.things, (thing) => {
        return thing.id != targetID;
      });
      dom.remove();
      self.calcCount();// 统计数量
      $.ajax({
    	  method:"post",
    	  url:"Memo.jsp",
    	  data:{id:targetID,event:"2"}
      })
    },
    setData: function(data, ifRewrite) {
      let self = this;
      if (ifRewrite == REWRITE) {
        self.clear();
        self.init(data);
      } else {
        self.things.forEach((thing) => {
          self.addNewItem(thing);
        });
      }
    },
    getData: function() {
      return this.things;
    },
    clear: function() {
      let self = this;
      $readyList.empty();
      $todayList.empty();
      $historyList.empty();
      self.things = [];
    }
  };
  function init() {
	  $.ajax(
	    		{
	    			type:"GET",
	    			data:{userName:localStorage.getItem('userName'),event:0},
	    			url:"Memo.jsp",
	    			dataType:"text",
	    			complete:function(XMLHttpRequest,textStatus){
	    				let str=XMLHttpRequest.responseText.replace(',','');
	    				console.log(str);
	    				let new_data=eval(XMLHttpRequest.responseText);
	    				
	    				onPage.init(new_data);
	    			
	    			}
	    			
	    		})
//    onPage.init(data);
  }
  function setData(data, ifRewrite) {
    onPage.setData(data, ifRewrite);
  }
  function getData() {
	  return onPage.getData();
  }
  function clear() {
    onPage.clear();
  }

  return {
    init: init,
    setData: setData,
    getData: getData,
    clear: clear
  }
})();
window.MemoAPI = $.extend((window.MemoAPI || {}), MemoAPI);

// 模拟数据
let init_data = [
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
];
// 初始化页面
MemoAPI.init();



