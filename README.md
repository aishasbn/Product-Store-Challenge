# 🧩 Product Store API — NestJS + TypeScript

A simple REST API built using **NestJS** and **TypeScript**, implementing authentication with **JWT**, database integration with **SQL**, and **CRUD operations** with E2E testing.

---

## 🚀 Features

✅ REST API with NestJS + TypeScript  
✅ Authentication using **JWT**  
✅ CRUD operations for **Categories** and **Products** (one-to-many relation)  
✅ SQL database using **TypeORM** (SQLite by default, can switch to PostgreSQL/MySQL)  
✅ E2E testing using **Jest** and **Supertest**  
✅ Modular & structured project with **MVC pattern**

---

## 🧱 Project Structure (Pattern: MVC)

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
│
├── users/
│   ├── user.entity.ts
│   └── users.service.ts
│
├── categories/
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── category.entity.ts
│
├── products/
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── product.entity.ts
│
├── app.module.ts
└── main.ts
```

---

## 🎯 Why MVC Pattern?

Saya menggunakan **pattern MVC (Model–View–Controller)** karena:

1. **Familiar & Konsisten** — Saya sudah terbiasa menggunakan Laravel yang menerapkan pola MVC, sehingga lebih mudah memahami alur data dan logika aplikasinya.  
2. **Struktur Jelas** — MVC memisahkan kode berdasarkan tanggung jawabnya:  
   - *Model* mengatur data dan interaksi database  
   - *Controller* menangani permintaan HTTP  
   - *Service* atau *Business logic layer* berfungsi sebagai penghubung antara model dan controller  
3. **Mudah Dimaintain dan Diperluas** — Ketika proyek berkembang, struktur MVC membuat penambahan fitur atau debugging lebih cepat.  

---

## 🗄️ Database

Menggunakan **TypeORM** dengan **SQLite** untuk pengujian.

Relasi antar tabel:
- **Category** ↔️ **Product** (One-to-Many)
- **User** digunakan untuk autentikasi JWT.

---

## 🔐 Authentication

Aplikasi menggunakan **JWT Token Authentication**.

### Endpoints:
| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user & get JWT token |

JWT Token dikirim melalui header:
```
Authorization: Bearer <token>
```

---

## 📦 CRUD Endpoints

### Categories
| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| `POST` | `/api/categories` | Create new category *(Protected)* |
| `GET` | `/api/categories` | Get all categories |
| `PATCH` | `/api/categories/:id` | Update category *(Protected)* |
| `DELETE` | `/api/categories/:id` | Delete category *(Protected)* |

### Products
| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| `POST` | `/api/products` | Create new product *(Protected)* |
| `GET` | `/api/products` | Get all products |
| `PATCH` | `/api/products/:id` | Update product *(Protected)* |
| `DELETE` | `/api/products/:id` | Delete product *(Protected)* |

---

## 🧪 E2E Testing

Proyek ini dilengkapi **end-to-end (E2E)** testing menggunakan **Jest** dan **Supertest**.  
Test akan menjalankan alur lengkap:

1. Register user  
2. Login user dan ambil JWT token  
3. Create category  
4. Create product  
5. Get all products  

Untuk menjalankan E2E test:
```bash
npm run test:e2e
```

---

## 🔧 Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<username>/product-store-challenge.git
cd product-store-challenge
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Server
```bash
npm run start:dev
```

Server berjalan di:
```
http://localhost:3000/api
```

---

## 🧰 Tools & Technologies

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [SQLite / PostgreSQL]
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest)

---

## 📜 API Documentation

Dokumentasi API tersedia dalam format **Postman Collection**, yang dapat digunakan untuk menguji semua endpoint (Auth, Categories, Products).

---
