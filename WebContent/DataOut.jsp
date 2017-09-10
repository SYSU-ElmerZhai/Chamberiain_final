<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    //参数提取
   request.setCharacterEncoding("UTF-8");
    String classify=request.getParameter("classify");
    String code=request.getParameter("code");
    String name=request.getParameter("name");
    String category=new String(request.getParameter("category").getBytes("ISO-8859-1"),"utf-8");
    String detail=new String(request.getParameter("detail").getBytes("ISO-8859-1"),"utf-8");
    String year=request.getParameter("year");
    String month=request.getParameter("month");
    String day=request.getParameter("day");
    String money=request.getParameter("money");
	//日期格式化

	
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
	   	
	   	String sql="select * from datalist where name ='"+name+"'";
		ResultSet rs = stmt.executeQuery(sql);
		if(!rs.next()){
			sql="insert into datalist values ('"+code+"','"+name+"','"+category+"','"+detail+"','"+
				year+"','"+month+"','"+day+"','"+money+"','"+classify+"')";
			System.out.println(sql);
			int result = stmt.executeUpdate(sql);
			
		}else {
			sql="update datalist set money='"+money+"' where name='"+name+"'";
			System.out.println(sql);
			int result= stmt.executeUpdate(sql);
		}
		rs.close();
		stmt.close();
		con.close();
 
    %>