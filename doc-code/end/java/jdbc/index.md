## JDBC 核心：四大金刚
既然你准备好要学 JDBC 了，脑子里先建立这四个概念，所有的 Java 后端框架（包括 MyBatis）都跑不出这四个对象：

- DriverManager (调度员)：负责根据你提供的 URL（比如 jdbc:mysql://localhost:3306）去找对应的驱动。

- Connection (水管)：Java 程序与数据库之间的物理通道。建立它最耗时。

- Statement (快递员)：负责把你的 SQL 语句搬运到数据库执行。

- ResultSet (货柜)：数据库执行完后，把结果塞进这个对象返还给你

```java
    // A.DriverManger.getConnection(url,user,password); 获取链接
    Connection conn = DriverManager.getConnection(url,user,password);

    // B.createStatement： 创建一个“传声筒”,用来把Sql语句发送给数据库
    Statement stmt = conn.createStatement();

    // C.执行查询语句
    ResultSet rs = stmt.executeQuery("SELECT user,host From user LIMIT 3");
```
DriverManager(调度员) 派生出 Connection(水管) 
Connection(水管) 派生出 Statement(快递员)
Statement(快递员) 执行sql语句派生出 ResultSet(货柜)