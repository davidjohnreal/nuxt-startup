# Auth API Postman Demo

本案例使用 Nuxt `server/api` + MySQL 实现注册、登录、当前用户接口。

## 0. MySQL 准备

确保 `.env` 中的 `MYSQL_URL` 和 `AUTH_TOKEN_SECRET` 已配置：

```env
MYSQL_URL=mysql://<user>:<password>@127.0.0.1:3306/<database>
AUTH_TOKEN_SECRET=<long-random-secret>
```

确保数据库存在：

```sql
CREATE DATABASE IF NOT EXISTS nuxt4 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

`auth_users` 表会在第一次注册或登录查询时自动创建。

## 1. 注册

```http
POST http://127.0.0.1:3000/api/auth/register
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "name": "Ada Chen",
  "password": "12345678"
}
```

响应：

```json
{
  "ok": true,
  "user": {
    "id": 1,
    "email": "ada@example.com",
    "name": "Ada Chen",
    "createdAt": "2026-05-19T..."
  },
  "token": "..."
}
```

## 2. 登录

```http
POST http://127.0.0.1:3000/api/auth/login
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "password": "12345678"
}
```

## 3. 当前用户

把注册或登录返回的 token 填到 Authorization：

```http
GET http://127.0.0.1:3000/api/auth/me
Authorization: Bearer <token>
```

## 安全点

- 密码不会明文入库，服务端使用 `scrypt` + salt 哈希。
- SQL 使用 `?` 参数化查询，不拼接用户输入。
- token 使用服务端 `AUTH_TOKEN_SECRET` 签名。
- `AUTH_TOKEN_SECRET` 不要放到 `runtimeConfig.public`。
- 生产项目建议使用成熟 JWT/session 库、HTTPS、限流、验证码、刷新 token、登录失败次数限制。
