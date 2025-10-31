import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../src/users/user.entity';
import { Category } from './../src/categories/category.entity';
import { Product } from './../src/products/product.entity';

describe('App e2e', () => {
  let app: INestApplication;
  let server: any;
  let moduleFixture: TestingModule; 

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    server = app.getHttpServer();
  });

  beforeEach(async () => {
    const userRepo = moduleFixture.get(getRepositoryToken(User));
    const categoryRepo = moduleFixture.get(getRepositoryToken(Category));
    const productRepo = moduleFixture.get(getRepositoryToken(Product));

    await productRepo.clear();
    await categoryRepo.clear();
    await userRepo.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('register -> login -> create category -> create product -> list products', async () => {
    // 1️⃣ Register
    const email = 'test@example.com';
    const password = '123456';
    await request(server)
      .post('/api/auth/register')
      .send({ email, password })
      .expect(201);

    // 2️⃣ Login
    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ email, password })
      .expect(201);

    const token = loginRes.body.access_token;
    expect(token).toBeDefined();

    // 3️⃣ Create category (protected)
    const catRes = await request(server)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics' })
      .expect(201);

    const categoryId = catRes.body.id;
    expect(categoryId).toBeDefined();

    // 4️⃣ Create product (protected)
    const prodRes = await request(server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Laptop', categoryId })
      .expect(201);

    expect(prodRes.body.id).toBeDefined();

    // 5️⃣ Get products (public)
    const list = await request(server).get('/api/products').expect(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBeGreaterThanOrEqual(1);
  });
});