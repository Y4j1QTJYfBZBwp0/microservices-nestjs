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

  it('Get All Users', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('Get User By ID', () => {
    return request(app.getHttpServer()).get('/users/1').expect(200);
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });
});
