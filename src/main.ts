import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Challenge - Arrimo Pro')
    .setDescription(
      'A famous tech blogger would like to have an API where readers can sign up for his weekly newsletter, the blog owner also want to be able to fetch the list of interested readers')
    .setVersion('1.0')
    .addTag('Arrimo Pro')
    .build();

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true}));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
