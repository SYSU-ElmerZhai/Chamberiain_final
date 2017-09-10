function render(){
	$.ajax({
		url:'userRender.jsp',
		method:'GET',
		data:{userCode:localStorage.getItem('user_code')},
		complete:function(XMLHttpRequest,textStatus){
			renderTable(eval(XMLHttpRequest.responseText));
		}
	})
	function renderTable(arr){
		arr.forEach(function(item,index){
			//item=JSON.parse(item);
			 $userList.append(`
				        <tr>
				            <td class = "userName">${item.username}</td>
				            <td class = "userTell">${item.phoneNumber}</td>
				            <td class = "userPassword">${item.password}</td>
				            <td class = "operation">
				                <span class = "icon-update" onclick="update(this)"></span>
				                <span class = "icon-delete-list" onclick="deleteItem(this)"></span>
				            </td>
				        </tr>
				    `);
		})
	}
}
render();
let $num = $('.J_num'),
    $userList = $('.J_user_list'),
    $opeAdd = $('.J_add'),
    $pop = $('.J_pop'),
    $popEdit = $('.m-pop-edit'),
    $popAdd = $('.m-pop-add'),
    $btnClose = $('.J_btn_close'),
    $btnSureAdd = $('.J_btn_sure1'),
    $btnSureEdit = $('.J_btn_sure2'),
    $form1 = $('.J_form1'),
    $name1 = $form1.find('.userName'),
    $tell1 = $form1.find('.userTell'),
    $password1 = $form1.find('.userPassword'),
    $againPassword1 = $form1.find('.againPassword'),
    $form2 = $('.J_form2'),
    $name2 = $form2.find('.userName'),
    $tell2 = $form2.find('.userTell'),
    $password2 = $form2.find('.userPassword'),
    $againPassword2 = $form2.find('.againPassword');

function deleteItem(el) {
    $(el).closest('tr').remove();
}
function update(el) {
    let self = $(el),
        _parent = self.closest('td');
    $pop.removeClass('f-hide');
    $popEdit.removeClass('f-hide');
    $popAdd.addClass('f-hide');
    $name2.val(_parent.siblings('.userName').text());
    $tell2.val(_parent.siblings('.userTell').text());
    $password2.val(_parent.siblings('.userPassword').text());
    $againPassword2.val(_parent.siblings('.userPassword').text());
}
$opeAdd.on('click', function () {
    $pop.removeClass('f-hide');
    $popAdd.removeClass('f-hide');
    $popEdit.addClass('f-hide');
});
$btnClose.on('click', function () {
    $pop.addClass('f-hide');
});
$btnSureAdd.on('click', function () {
    if ($name1.val() && $tell1.val() && ($password1.val() == $againPassword1.val()) && $password1.val()) {
        $userList.append(`
        <tr>
            <td class = "userName">${$name1.val()}</td>
            <td class = "userTell">${$tell1.val()}</td>
            <td class = "userPassword">${$password1.val()}</td>
            <td class = "operation">
                <span class = "icon-update" onclick="update(this)"></span>
                <span class = "icon-delete-list" onclick="deleteItem(this)"></span>
            </td>
        </tr>
    `);
        $pop.addClass('f-hide');
        // 更新数据库
        let obj={
        		userName:$name1.val(),
        		userTel:$tell1.val(),
        		userPassword:$password1.val(),
        		userCode:localStorage.getItem('user_code'),
        		userRole:'0' ,
        		event:"add"
        }
        $.ajax({
        	url:'addUser.jsp',
        	method:'GET',
        	data:obj,
        	complete:function(XMLHttpRequest,textStatus){
				console.log("添加用户：",textStatus);
			}
        })
        return false;
    } else if ($password1.val() != $againPassword1.val()) {
        alert('两次密码输入不一致');
        return false;
    }

});
$btnSureEdit.on('click', function () {
    if ($name2.val() && $tell2.val() && ($password2.val() == $againPassword2.val()) && $password2.val()) {
        // 更新数据库
    	let obj={
    			userName:$name2.val(),
        		userTel:$tell2.val(),
        		userPassword:$password2.val(),
        		userCode:localStorage.getItem('user_code'),
        		userRole:'0' ,
        		event:"edit"
    	}
    	$.ajax({
        	url:'addUser.jsp',
        	method:'GET',
        	data:obj,
        	complete:function(XMLHttpRequest,textStatus){
				console.log("修改用户：",textStatus);
			}
        })
    	
        $pop.addClass('f-hide');
        return false;
    } else if ($password2.val() != $againPassword2.val()) {
        alert('两次密码输入不一致');
        return false;
    }
});
$('.m-header').empty().html("Hi~"+ localStorage.getItem("userName")+"，您的识别码："+localStorage.getItem("user_code"));


