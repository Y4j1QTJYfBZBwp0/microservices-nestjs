import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';
import { FileToCopy } from 'testcontainers/dist/src/docker/types';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let pg: StartedPostgreSqlContainer;

  beforeAll(async () => {
    const createDataBaseFile: FileToCopy = {
      source: `${__dirname}/../db/base/01-create_tables.sql`,
      target: 'docker-entrypoint-initdb.d/01-create_tables.sql',
    };

    const loadData: FileToCopy = {
      source: `${__dirname}/../db/base/02-load-data.sql`,
      target: 'docker-entrypoint-initdb.d/02-load-data.sql',
    };

    pg = await new PostgreSqlContainer('postgres:latest')
      .withExposedPorts(5432)
      .withDatabase('development')
      .withUsername('root')
      .withPassword('123456')
      .withCopyFilesToContainer([createDataBaseFile, loadData])
      .start();

    process.env.DB_PORT = pg.getMappedPort(5432).toString();

    console.log('DB_PORT', process.env.DB_PORT);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await pg.stop();
    await app.close();
  });

  it('Create User', () => {
    const payload = {
      name: 'New New User',
      email: 'new_my_user@domain.com',
      password: 'ultimate_hard_password',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect(201);
  });

  it('Get All Users', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('Get User By ID', () => {
    return request(app.getHttpServer())
      .get('/users/050ee2df-fcfd-476d-9610-04f3b491126e')
      .expect(200);
  });

  it('Update User', () => {
    const payload = {
      name: 'User Updated',
      email: 'user_updated@domain.com',
      password: 'complex_Password',
    };
    return request(app.getHttpServer())
      .put('/users/050ee2df-fcfd-476d-9610-04f3b491126e')
      .send(payload)
      .expect(200);
  });

  it('Delete User by ID', () => {
    return request(app.getHttpServer())
      .delete('/users/050ee2df-fcfd-476d-9610-04f3b491126e')
      .expect(200);
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });
});
