import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://127.0.0.1:4200'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, always: true }));
  await app.listen(configuration().port || 1337);
}
bootstrap();
