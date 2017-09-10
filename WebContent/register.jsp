<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
        <%
    request.setCharacterEncoding("utf-8");
    //注册部分请求
    String register_userName=request.getParameter("registerUser");
    String register_password=request.getParameter("registerPassword");
    String register_phoneNumber=request.getParameter("registerPhoneNumber");
    String register_checked=request.getParameter("registerChecked");
    String register_code=request.getParameter("registerCode");
    
    //JDBC 驱动名及数据库URL
   String JDBC_DBIVER="com.mysql.jdbc.Driver";
   String DB_URL = "jdbc:mysql://127.0.0.1:3306/WebsiteUsers"
   			+ "?autoReconnect=true&useUnicode=true"
			+ "&characterEncoding=UTF-8"; 
   	String user="root";
   	String password="14353384";
   	
   	//注册JDBC驱动
   	Class.forName("com.mysql.jdbc.Driver");
   	System.out.println("连接数据库...");
   	
   	Connection con_register = DriverManager.getConnection(DB_URL,user,password);
   	Statement stmt_register = con_register.createStatement();
   	
   	if(request.getMethod().equalsIgnoreCase("post")) {
   		/*if(register_userName.equals("")) {
   			out.print("<script language='javascript'> alert('用户名输入不能为空')</script> ");
   			System.out.println("没有输入用户名");
   		}
   		if(register_password.equals("")) {
   			out.print("<script language='javascript'> alert('密码不能为空')</script> ");
   		}
   		if(register_phoneNumber.equals("")) {
   			out.print("<script language='javascript'> alert('手机号码不能为空')</script> ");
   		}
   		if(register_checked.equals("")) {
   			out.print("<script language='javascript'> alert('请输入正确的验证码')</script> ");
   		}*/
   		//String fmt = "insert into users(username,password,phoneNumber values ('%s','%s','%s')";
   		//String sql = String.format(register_userName,register_password,register_phoneNumber);
   		
   		String sql_select_register="select * from users_total where phoneNumber="+"'"+register_phoneNumber+"' and username='"
   				+register_userName+"'";
   		System.out.println(sql_select_register);
   		ResultSet rs_register = stmt_register.executeQuery(sql_select_register);
   		if(rs_register.next()){
   			out.print("<script language='JavaScript'>alert('该手机号和该用户名已被绑定注册，请检查您的信息');window.location.href='FirstPage_v1.jsp';</script>"); 
   			return ;
   		} else {
   			int cnt=stmt_register.executeUpdate("insert  into  users_"+register_code+" values('1','"+register_userName+"','"+register_password+"','"+register_phoneNumber+"','"
   					+register_code+"')") ;
   			cnt=stmt_register.executeUpdate("insert  into  users_total values('"+register_userName+"','"+register_password+"','"+register_phoneNumber+"','"+register_code+"')") ;
   	   		System.out.println(cnt);
   	   		out.print("<script language='JavaScript'>window.location.href='FirstPage_v1.jsp';</script>"); 
   		}
   		rs_register.close();
   		stmt_register.close();
   		con_register.close();
   	}
   	%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
