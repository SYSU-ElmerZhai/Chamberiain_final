<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    request.setCharacterEncoding("utf-8");
   	String sign_UserName=request.getParameter("inputUserName");
   	String sign_Password=request.getParameter("inputPassword")+"";
    
    //JDBC 驱动名及数据库URL
   String JDBC_DBIVER="com.mysql.jdbc.Driver";
   String DB_URL = "jdbc:mysql://127.0.0.1:3306/WebsiteUsers"
   			+ "?autoReconnect=true&useUnicode=true"
			+ "&characterEncoding=UTF-8&useSSL=true"; 
   	String user="root";
   	String password="14353384";
   	
   	//注册JDBC驱动
   	Class.forName("com.mysql.jdbc.Driver");
   	//System.out.println("连接数据库...");
   	
   	Connection con = DriverManager.getConnection(DB_URL,user,password);
   	Statement stmt = con.createStatement();
   	
   	
   	if(request.getMethod().equalsIgnoreCase("post")){
   		String sql="select * from users_total where username="+"'"+sign_UserName+"'";  		
   	   	ResultSet rs = stmt.executeQuery(sql);
   	    if(!rs.next()) {
   	    	out.print("<script language='JavaScript'>alert('该用户不存在，请注册之后再请登录');</script>"); 
   	    }else {
   	   	   		//String get_id=rs.getString("username");
   	   	   		String get_password=rs.getString("password");
   	   	   		String get_code=rs.getString("code");
   			    if(sign_Password.equals(get_password)) {
   	   	   	  		out.print("<script language='JavaScript'>alert('登录成功！~');localStorage.setItem('userName','"+sign_UserName+"'); </script>"); 
   	   	   	  		String sql_role_check="select * from users_"+get_code+" where username='"+sign_UserName+"'";
   	   	   			ResultSet rs_user_role = stmt.executeQuery(sql_role_check);
   	   	   			System.out.println(rs_user_role);
   	   	   			if(rs_user_role.next()){
   	   	   				String user_role_check=rs_user_role.getString("role");
   	   	   				String user_code=rs_user_role.getString("code");
   	   	   				out.print("<script language='JavaScript'>localStorage.setItem('user_code','"+user_code+"'); </script>"); 
   	   	   				System.out.println(user_role_check);
   	   	   				System.out.println("用户角色");
   	   	   			if(user_role_check.equals("1")){
   	   	   				out.print("<script language='JavaScript'>localStorage.setItem('user_role','1'); </script>"); 
   	   	   				
	   	   	  			//out.print("<script language='JavaScript'>$('.J_role').removeClass(f-hide)</script>");
	   	   	  		}else {
	   	   	  			out.print("<script language='JavaScript'>localStorage.setItem('user_role','0');</script>"); 
	   	   	  			
	   	   	  			//out.print("<script language='JavaScript'>$('.J_role').addClass(f-hide)</script>");
	   	   	  		}
   	   	   			}
   	   	   	 out.print("<script language='JavaScript'>window.location.href='index.html'; </script>");
   	   	   	   	}else{
   	   	  	  		out.print("<script language='JavaScript'>alert('密码错误');</script>"); 
   	   	   	   	} 
   			 
   	    }
		rs.close();
		stmt.close();
		con.close();

   	}
   
   	

    %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <title>小管家</title>
    <script src="lib/js/public/jquery.min.js"></script>
    <link rel="stylesheet" href="lib/css/public/import.css">
    <link href="lib/css/public/3.3.6/bootstrap.min.css" rel="stylesheet">
    <script src="lib/js/public/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./lib/css/firstPage_v1.css">
    <script src="lib/js/firstPage_v1.js"></script>
</head>
<body>
    <div class="content">
        <img class="title" src="lib/images/LogInLogo.png">
        <form action="" method="post">
        <div class="logIn">
            <div class=" inputInfo inputUser">
                <span><img src="lib/images/user_final.png"></span>
                <input type="text" class="input inputUserName" name="inputUserName"/>
                <a class="showUser"><span class="glyphicon glyphicon-triangle-bottom"></span> </a>
            </div>
            <div class="inputInfo inputPassword">
                <span><img src="lib/images/lock_final.png"></span>
                <input type="password" class="input inputPassword" name="inputPassword"/>
                <a class="showPassword"><span class="glyphicon glyphicon-eye-open"></span> </a>
            </div>
        </div>
        <div class="action">
            <a class="register">注册</a>
            <a class="forgetPassword">忘记密码</a>
            <button class="logIn">登录</button>
        </div>
        </form>
    </div>
	<form action="register.jsp" method="post">
	 <div class="register" >
        <div class="registerTitle">
            <span>注册账户</span>
            <a><img src="lib/images/cancel.png"></a>
        </div>
        <div class="registerInfo">
            <span>用户名：</span>
            <input type="text" id="registerUser" name="registerUser">
        </div>
        <div class="registerInfo">
            <span>密码：</span>
            <input type="text" id="registerPassword" name="registerPassword">
        </div>
        <div class="registerInfo">
            <span>手机号：</span>
            <input type="text" id="registerPhoneNumber" name="registerPhoneNumber">
        </div>
        <div class="code">
        	<span>识别码：</span>
        	<input type="text" id="registerCode" name="registerCode">
        </div>
        <div class="registerChecked">
            <span>验证码：</span>
            <input type="text" id="registerChecked" name="registerChecked">
            <button class="getCheckedNumber" id="getCheckedNumber" >获取验证码</button>
        </div>
        <input type="submit" class="registerButton" value="注册">
        <!-- <button class="registerButton">注册</button> -->
    </div>
	</form>


    <div class="forgetPassword">
        <div class="title">
            <span>找回密码</span>
            <a><img src="lib/images/cancel.png"></a>
        </div>
        <div class="neededInfo">
            <span>手机号：</span>
            <input type="text" id="neededPhoneNumber">
            <button id="needidButton">获取验证码</button>
        </div>
        <div class="neededInfo">
            <span>验证码：</span>
            <input type="text" id="neededChecked">
            <div class="blank"></div>
        </div>
        <div class="action">
            <button id="neededCancel">取消</button>
            <button id="neededNext">下一步</button>
        </div>
    </div>
	
	<form action="ChangePassword.jsp" method="post">
    <div class="newPassword">
        <div class="title">
            <span>找回密码</span>
            <a><img src="lib/images/cancel.png"></a>
        </div>
        <div class="newInfo newPasswordInformation">
            <span>输入新密码：</span>
            <input type="text" id="inputPassword" name="inputPassword">
            <div class="glyphicon glyphicon-ok input-ok"></div>
        </div>
        <div class="newInfo confirmPassword">
            <span>确认新密码：</span>
            <input type="text" id="confirmPassword" name="confirmPassword">
            <div class="glyphicon glyphicon-ok confirm-ok"></div>
        </div>
        <div class="action">
            <!--<button id="returnLogIn">确认修改</button>  -->
            <input type="submit" id="returnLogIn" class="returnLogIn" value="确认修改">
        </div>
         <input type="text" class="userPhoneNumber" name="userPhoneNumber" value="">
    </div>
  
    </form>


    <div class="footer">
        <span>企业税收统筹及经营状况分析首选品牌，倡导行业良性发展，一体化高效服务</span>
    </div>


</body>
</html>