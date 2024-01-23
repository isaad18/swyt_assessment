import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'test',
        description: 'test',
        price: 1,
        category: 'FOOD',
        image: 'test',
      })
      .expect(201);
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        name: '',
        description: 'test',
        price: 1,
        category: 'FOOD',
        image: 'test',
      })
      .expect(400);
  });
});
