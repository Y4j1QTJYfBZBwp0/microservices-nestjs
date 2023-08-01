import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
} from 'testcontainers';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let environment: StartedDockerComposeEnvironment;

  beforeAll(async () => {
    const composeFilePath = '';
    const composeFile = 'docker-compose.yaml';

    environment = await new DockerComposeEnvironment(
      composeFilePath,
      composeFile,
    ).up();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await environment.down();
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
    return request(app.getHttpServer()).get('/users/1').expect(200);
  });

  it('Update User', () => {
    const payload = {
      name: 'User Updated',
      email: 'user_updated@domain.com',
      password: 'complex_Password',
    };
    return request(app.getHttpServer())
      .put('/users/1')
      .send(payload)
      .expect(200);
  });

  it('Delete User by ID', () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });
});
