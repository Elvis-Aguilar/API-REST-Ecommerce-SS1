import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config path general
  app.setGlobalPrefix("electric-shop/api/v1");


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();
  //app.enableCors('/origin domain....');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
