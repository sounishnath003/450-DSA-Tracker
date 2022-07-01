import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://127.0.0.1:4200', 'https://450-dsa-tracker.netlify.app'],
  });
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ transform: true, always: true }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configuration().port || 1337);
  await app.init();
}
bootstrap();
