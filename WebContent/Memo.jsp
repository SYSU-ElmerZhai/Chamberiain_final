<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    request.setCharacterEncoding("utf-8");
    String userName=request.getParameter("userName");
    String event=request.getParameter("event");
    System.out.println(event);
    
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
   	Statement stmt = con.createStatement();
   	
   	if(event.equals("0")){
    	String sql="select * from eventList where username='"+userName+"'";
    	ResultSet rs=stmt.executeQuery(sql);
    	ResultSetMetaData metaData = rs.getMetaData();
    
   		int columnCount = metaData.getColumnCount();
   	
   		JSONArray array= new JSONArray();
   	
   		while(rs.next()){
   			JSONObject jsonObj = new JSONObject();
   			for(int i=1;i<=columnCount;i++) {
   				String columnName = metaData.getColumnLabel(i);
   				String value=rs.getString(columnName);
   				jsonObj.put(columnName,value);
   			}
   			array.put(jsonObj+"\n");
   		} 
   		
   	
   		//设置将字符以“UTF-8”编码输出到客户端浏览器
   		response.setCharacterEncoding("utf-8");
   		//获取PrintWriter输出流
   		PrintWriter output  = response.getWriter();
   		response.setStatus(200, "ok");
   		output.write(array.toString());
   	}
   	if(event.equals("1")){
   		String id=request.getParameter("id");
   		String name=request.getParameter("name");
   		String month=request.getParameter("month");
   		String day=request.getParameter("day");
   		String time=request.getParameter("time");
   		String status=request.getParameter("status");
   		
   		String sql="insert into eventList values ('"+ userName+"','"+id+"','"+name+"','"+month+"','"+day+"','"+time+"','"+status+"');";
   		
   		int result = stmt.executeUpdate(sql);
   		if(result>0) {
   			System.out.println("操作成功");
   			response.setStatus(200, "ok");
   		} else {
   			System.out.println("操作失败");
   		
   		}
   	}
   	if(event.equals("2")){
   		String id=request.getParameter("id");
   		
   		String sql="delete from eventList where id = '"+id+"'";
   		int result = stmt.executeUpdate(sql);
   		if(result>0) {
   			System.out.println("删除成功");
   			response.setStatus(200, "ok");
   		} else {
   			System.out.println("操作失败");
   		
   		}
   		
   	}
   	if(event.equals("3")){
   		String id=request.getParameter("id");
   		
   		String sql = "update eventList set status='1' where id='"+id+"'";
   		
  		int result = stmt.executeUpdate(sql);
   		if(result>0) {
   			System.out.println("删除成功");
   			response.setStatus(200, "ok");
   		} else {
   			System.out.println("操作失败");
   		
   		}
   	}
   		if(event.equals("4")){

   	   		String sql = "select id,name,month,day,time,status from eventlist where username='"+userName+"' and status='0'";
   	   		ResultSet rs=stmt.executeQuery(sql);
   	    	ResultSetMetaData metaData = rs.getMetaData();
   	    
   	   		int columnCount = metaData.getColumnCount();
   	   	
   	   		JSONArray array= new JSONArray();
   	   	
   	   		while(rs.next()){
   	   			JSONObject jsonObj = new JSONObject();
   	   			for(int i=1;i<=columnCount;i++) {
   	   				String columnName = metaData.getColumnLabel(i);
   	   				String value=rs.getString(columnName);
   	   				jsonObj.put(columnName,value);
   	   			}
   	   			array.put(jsonObj);
   	   		}   	   	
   	   		//设置将字符以“UTF-8”编码输出到客户端浏览器
   	   		response.setCharacterEncoding("utf-8");
   	   		//获取PrintWriter输出流
   	   		PrintWriter output  = response.getWriter();
   	   		response.setStatus(200, "ok");
   	   		output.write(array.toString());	
   	}
   		if(event.equals("5")){
   			System.out.println("进入5");
   			String id=request.getParameter("id");
   			String name=new String(request.getParameter("name").getBytes("ISO-8859-1"),"utf-8");
   			String month=request.getParameter("month");
   			String time=request.getParameter("time");
   			String status=request.getParameter("status");
   			
   			
   			String sql="update eventlist set name='"+name+"',month='"+month+"',time='"+time+"' where username='"+userName
   					+"' and id='"+id+"'";
   			System.out.println(sql);
   			int result = stmt.executeUpdate(sql);
   	   		if(result>0) {
   	   			System.out.println("删除成功");
   	   			response.setStatus(200, "ok");
   	   		} else {
   	   			System.out.println("操作失败");
   	   		
   	   		}
   			
   		}
    %>