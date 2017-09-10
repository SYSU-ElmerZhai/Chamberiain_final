<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    request.setCharacterEncoding("UTF-8");
    String classify=request.getParameter("classify");
    String conditionType=request.getParameter("condition");
    String category=new String(request.getParameter("category").getBytes("ISO-8859-1"),"utf-8");
    String year=request.getParameter("year");
    String month=request.getParameter("month");
    System.out.println(conditionType);
    
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
	   	
	   	//按照类型查找
	   	if(conditionType.equals("cate")){
	   		System.out.println("进入");
	   		System.out.println(category);
	   		String sql="sql语句";
	   			sql="select code,name,category,money,year,month,day,detail from datalist where category='"+category+"' and classify='"+classify+"'";
	   			System.out.println(sql);
	   			ResultSet rs = stmt.executeQuery(sql);
	   	    	ResultSetMetaData metaData = rs.getMetaData();
	   	     
	   	   		int columnCount = metaData.getColumnCount();
	   			//JSONArray array= new JSONArray();
	   	   		while(rs.next()){
	   	   			JSONObject jsonObj = new JSONObject();
	   	   			for(int i=1;i<=columnCount;i++) {
	   	   				String columnName = metaData.getColumnLabel(i);
	   	   				String value=rs.getString(columnName);
	   	   				jsonObj.put(columnName,value);
	   	   			}
	   	   			array.put(jsonObj);
	   	   		} 
	   	}else if(conditionType.equals("time")){
	   		String sql="";
	   		sql="select code,name,category,money,year,month,day,detail from datalist where year='"+year+"' and month='"+month+"' and classify='"+classify+"'";
	   		System.out.println(sql);
	   		ResultSet rs= stmt.executeQuery(sql);
	   		ResultSetMetaData metaData = rs.getMetaData();
	 
	   		int columnCount = metaData.getColumnCount();
	    	      
	   		
	   		//JSONArray array= new JSONArray();
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
	   		output.write(array.toString());
	   		System.out.println(array);
	   		response.setStatus(200, "ok");	 
    %>