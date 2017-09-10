<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
   	String userName=request.getParameter("userName");
    String userTel=request.getParameter("userTel");
    String userPassword=request.getParameter("userPassword");
    String userCode=request.getParameter("userCode");
    String userRole=request.getParameter("userRole");
    String event=request.getParameter("event");
    System.out.println(event);
    System.out.println(userCode);
	
    //JDBC驱动名及数据库URL
    String JDBC_DBIVER="com.mysql.jdbc.Driver";
    String DB_URL = "jdbc:mysql://127.0.0.1:3306/WebsiteUsers"
   			+ "?autoReconnect=true&useUnicode=true"
			+ "&characterEncoding=UTF-8&useSSL=true"; 
   	String user="root";
   	String password="14353384";
   	
   	//注册JDBC驱动
   	Class.forName("com.mysql.jdbc.Driver");
   	
   	Connection con = DriverManager.getConnection(DB_URL,user,password);
   	Statement stmt_add_user = con.createStatement();
   	
   	if(event.equals("add")){
   	   	String sql="insert into users_"+userCode+" values ('"+userRole+"','"+userName+"','"
   			   +userPassword+"','"+userTel+"','"+userCode+"');";
   			   System.out.println(sql);
   			  
   		 int result = stmt_add_user.executeUpdate(sql);
   		 sql="insert into users_total values ('"+userName+"','"+userPassword+"','"+userTel+"','"+userCode+"');";
   		 int result2=stmt_add_user.executeUpdate(sql);
   		 if(result>0 && result2>0){
   			 response.setStatus(200, "ok");
   		 }else {
   			 System.out.println("操作失败");
   		 }
   	}else if(event.equals("edit")){
   		String sql="update users_"+userCode+" set username='"+userName+"',password='"+userPassword+"' where phoneNumber='"+userTel+"'";
		System.out.println(sql);
   		int result = stmt_add_user.executeUpdate(sql);
   		sql="update users_total set username='"+userName+"' and password='"+userPassword+"' where phoneNumber='"+userTel+"'";
   		System.out.println(sql);
   		int result2=stmt_add_user.executeUpdate(sql);
  		 if(result>0 && result2>0){
   			 response.setStatus(200, "ok");
   		 }else {
   			 System.out.println("操作失败");
   		 }
   	}

    %>
    