<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    request.setCharacterEncoding("UTF-8");
    String type=request.getParameter("type");
    String year=request.getParameter("year");
    String month=request.getParameter("month");
    System.out.println(type);
    
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
	   
	   	if(type.equals("0")){
	   		String sql="select * from datalist where year='"+year+"'";
	   		ResultSet rs=stmt.executeQuery(sql);
	    	ResultSetMetaData metaData = rs.getMetaData();
	    
	   		int columnCount = metaData.getColumnCount();
	   		while(rs.next()){
	   			JSONObject jsonObj = new JSONObject();
	   			for(int i=1;i<=columnCount;i++) {
	   				String columnName = metaData.getColumnLabel(i);
	   				String value=rs.getString(columnName);
	   				jsonObj.put(columnName,value);
	   			}
	   			array.put(jsonObj);
	   		} 	   		
	   	}else {
	   		String sql="select * from datalist where year='"+year+"' and month='"+month+"'";
	   		ResultSet rs=stmt.executeQuery(sql);
	    	ResultSetMetaData metaData = rs.getMetaData();
	    
	   		int columnCount = metaData.getColumnCount();
	   		while(rs.next()){
	   			JSONObject jsonObj = new JSONObject();
	   			for(int i=1;i<=columnCount;i++) {
	   				String columnName = metaData.getColumnLabel(i);
	   				String value=rs.getString(columnName);
	   				jsonObj.put(columnName,value);
	   			}
	   			array.put(jsonObj);
	   		} 	 
	   		
	   	}

   	
   		//设置将字符以“UTF-8”编码输出到客户端浏览器
   		response.setCharacterEncoding("utf-8");
   		//获取PrintWriter输出流
   		PrintWriter output  = response.getWriter();
   		response.setStatus(200, "ok");
   		output.write(array.toString());
    	 
    %>