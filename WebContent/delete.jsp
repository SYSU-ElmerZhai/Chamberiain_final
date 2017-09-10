<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    String name=request.getParameter("name");
    System.out.println(name);
    
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
	   	JSONArray array= new JSONArray();
	   	
	   	String sql="delete from datalist where name = '"+name+"'";
	   	int result = stmt.executeUpdate(sql);
   		if(result>0) {
   			System.out.println("删除成功");
   			response.setStatus(200, "ok");
   		} else {
   			System.out.println("操作失败");
   		
   		}
    %>
