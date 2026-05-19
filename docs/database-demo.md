# Database Demo

本示例用于学习 Nuxt server API 如何安全访问 MySQL 与 PostgreSQL。

## MySQL

```sql
CREATE DATABASE nuxt_lab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nuxt_lab_app'@'localhost' IDENTIFIED BY 'change_me';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE ON nuxt_lab.* TO 'nuxt_lab_app'@'localhost';
FLUSH PRIVILEGES;
```

```bash
MYSQL_URL="mysql://nuxt_lab_app:change_me@127.0.0.1:3306/nuxt_lab"
```

## PostgreSQL

```sql
CREATE DATABASE nuxt_lab;
CREATE USER nuxt_lab_app WITH PASSWORD 'change_me';
GRANT CONNECT ON DATABASE nuxt_lab TO nuxt_lab_app;
\c nuxt_lab
GRANT USAGE, CREATE ON SCHEMA public TO nuxt_lab_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO nuxt_lab_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO nuxt_lab_app;
```

```bash
POSTGRES_URL="postgresql://nuxt_lab_app:change_me@127.0.0.1:5432/nuxt_lab"
```

## 安全重点

- 不拼接用户输入到 SQL 字符串里。
- MySQL 使用 `?` 参数占位符。
- PostgreSQL 使用 `$1`、`$2` 参数占位符。
- 数据库账号使用最小权限，不要用 root/postgres 超级管理员账号跑应用。
- 服务端错误不要把完整数据库错误和连接串返回给浏览器。
