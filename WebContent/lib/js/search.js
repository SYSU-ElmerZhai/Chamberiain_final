let $popEdit = $('.m-pop-edit'),
    $popClassify = $('.J_pop_classify'),
    $popCode = $('.J_pop_invoiceCode'),
    $popName = $('.J_pop_invoiceName'),
    $popDetail = $('.J_pop_detail'),
    $popTime = $('.J_pop_time'),
    $popMoney = $('.J_pop_money'),
    $editCategory = $('.J_pop_category'),
    $btnClose = $('.J_btn_close'),
    $btnSearch = $('.J_btn_search'),
    $btnSubmit = $('.J_btn_submit'),
    $selCondition = $('.J_condition'),
    $selectTime = $('.J_select_time'),
    $selectCategory = $('.J_category');

let onPage = {
    init: function () {
        let self = this;
        self.view();
        self.listen();
    },
    view: function () {
    },
    listen: function () {
        $btnSubmit.click(function () {
            let dateStr = $popTime.val();
            let selectYear = dateStr.split("/")[0];
            let selectMonth = dateStr.split("/")[1];
            let selectDay = dateStr.split("/")[2];
            let obj = {
                classify: $popClassify.val(),
                code: $popCode.val(),
                name: $popName.val(),
                category: $('.J_category').eq(0).val(),
                detail: $popDetail.val(),
                year: selectYear,
                month: selectMonth,
                day: selectDay,
                money: $popMoney.val()
            };
            console.log(obj);
            // obj为弹窗的所有信息
            $.ajax({
                url: "updateData.jsp",
                method: "get",
                data: obj,
                complete: function (XMLHttpRequest, textStatus) {
                    console.log(textStatus);
                    $('.J_pop').addClass('f-hide');
                    $btnSearch.click();
                }
            })
            
            return false;
        });
        $selCondition.change(function () {
            let condition = $(this).val();
            if (condition == 'time') {
                $selectTime.removeClass('f-hide');
                $selectCategory.addClass('f-hide');
            } else {
                $selectTime.addClass('f-hide');
                $selectCategory.removeClass('f-hide');
            }
        });
        $btnSearch.click(function () {
                let selectClassify = $('.J_select_classify option:selected').val();
                let selectCondition = $('.J_condition option:selected').val();
                let selectCategory = $('.J_category').eq(1).val();
                let dateStr = $('.J_select_time').val();
                if (dateStr.includes('-0')) {
                    dateStr = dateStr.replace('-0', '/');
                } else {
                    dateStr = dateStr.replace('-', '/');
                }
                let selectYear = dateStr.split('/')[0];
                let selectMonth = dateStr.split('/')[1];
                console.log(selectYear);
                if (selectClassify === "input") {
                    selectClassify = "1"
                } else {
                    selectClassify = "0"
                }
                console.log(selectClassify, selectCondition, selectCategory, selectYear, selectMonth);

                //渲染表格
                function renderTable(str) {
                    console.log(str);
                    let arr = new Array(str);
                    let data_arr = arr[0];
                    console.log(data_arr);
                    let html = ` <tr>
            <th>发票代码</th>
            <th>发票号码</th>
            <th>类型</th>
            <th>金额</th>
            <th>开票时间</th>
            <th>操作</th>
        </tr>`;
                    data_arr.forEach(function (item, index) {
                        var date = item.year + "/" + item.month + "/" + item.day;
                        html = html + "<tr><td name='code'>" + item.code + "</td><td name='name'>" + item.name + "</td><td name='category'>" + item.category + "</td><td name='money'>" + item.money +
                            "</td><td name='date'>" + date + "</td><td><span class='J_opt_delete icon-delete-list' onclick='onPage.deletePop(this)'></span><span class='J_btn_edit icon-update' onclick='onPage.showPop(this)'></span></td>" +
                            "<td class='f-hide J_remark' name='detail'>" + item.detail + "</td></tr>";
                    })
                    $('.J_table').html(html);
                }

                $.ajax({
                    url: "Search.jsp",
                    method: "get",
                    data: {
                        classify: selectClassify,
                        condition: selectCondition,
                        category: selectCategory,
                        year: selectYear,
                        month: selectMonth
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        renderTable(eval(XMLHttpRequest.responseText));
                    }
                });
            }
        )
    },
    showPop: function (el) {
        let self = this,
            item = $(el).closest('td');
        let queryObj = {
            code: item.siblings('td[name="code"]').text(),
            name: item.siblings('td[name="name"]').text()
        }; // 获取要修改的数据的唯一id，用这两个字段查询数据库
        let obj = {
            classify: item.siblings('td[name="classify"]').text(),
            code: item.siblings('td[name="code"]').text(),
            name: item.siblings('td[name="name"]').text(),
            category: item.siblings('td[name="category"]').text(),
            detail: item.siblings('td[name="detail"]').text(),
            date: item.siblings('td[name="date"]').text(),
            money: item.siblings('td[name="money"]').text()
        };
        self.setPopData(obj);
        $pop.removeClass('f-hide');
        $popEdit.removeClass('f-hide');
    },
    setPopData: function (obj) {
        $popClassify.text(obj.classify);
        $popCode.val(obj.code);
        $popName.val(obj.name);
        $editCategory.val(obj.category);
        $popDetail.val(obj.detail);
        $popTime.val(obj.date);
        $popMoney.val(obj.money);

    },
    deletePop: function (el) {
        let self = this,
            item = $(el).closest('td');
        let queryObj = {
            code: item.siblings('td[name="code"]').text(),
            name: item.siblings('td[name="name"]').text()
        }; // 获取要修改的数据的唯一id，用这两个字段查询数据库
        let obj = {
            classify: item.siblings('td[name="classify"]').text(),
            code: item.siblings('td[name="code"]').text(),
            name: item.siblings('td[name="name"]').text(),
            category: item.siblings('td[name="category"]').text(),
            detail: item.siblings('td[name="detail"]').text(),
            date: item.siblings('td[name="date"]').text(),
            money: item.siblings('td[name="money"]').text()
        };
        $.ajax({
            url: 'delete.jsp',
            method: 'GET',
            data: obj,
            complete: function (XMLHttpRequest, textStatus) {
                console.log(textStatus);
                $btnSearch.click();
            }

        })
        console.log(obj);
        console.log("已经删除");
    }
};
onPage.init();


/*$('.J_condition').change(function() {
 let condition = $(this).val();
 if (condition == 'time') {
 $('.J_select_time').removeClass('f-hide');
 $('.J_select_cotegory').addClass('f-hide');
 } else {
 $('.J_select_time').addClass('f-hide');
 $('.J_select_cotegory').removeClass('f-hide');
 }
 });

 $('.J_btn_search').click(function(){
 var selectClassify=$('.J_classify option:selected').val();
 var selectCondition=$('.J_condition option:selected').val();
 var selectCategory=$('.J_select_cotegory option:selected').val();
 var dateStr=$('.J_select_time').val();
 if(dateStr.includes(0)) {
 dateStr=dateStr.replace('-0','');
 }else {
 dateStr=dateStr.replace('-','');
 }
 var selectDate=dateStr;
 //渲染表格
 function renderTable(str){
 var arr=new Array(str);
 var data_arr=arr[0];
 console.log(data_arr);
 var html="";
 if(data_arr[0].dataIn){
 data_arr.forEach(function(item,index){
 html=html+"<tr><td>"+item.code+"</td><td>"+item.name+"</td><td>"+item.type+"</td><td>"+item.dataIn+"</td><td>"+item.date+"</td><td>删除</td></tr>";
 })
 }else {
 data_arr.forEach(function(item,index){

 html=html+"<tr><td>"+item.code+"</td><td>"+item.name+"</td><td>"+item.type+"</td><td>"+item.dataOut+"</td><td>"+item.date+"</td><td></tr>";
 })
 }

 $('.J_table').html(html);
 }

 console.log(selectClassify,selectCondition,selectCategory,selectDate);
 $.ajax({
 url:"Search.jsp",
 method:"get",
 data:{classify:selectClassify,condition:selectCondition,category:selectCategory,date:selectDate},
 complete:function(XMLHttpRequest,textStatus){
 renderTable(eval(XMLHttpRequest.responseText));
 }
 })
 }
 )*/

