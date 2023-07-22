import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const documentation = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentation);

  await app.listen(3000);
}
bootstrap();
