import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RedisIoAdapter } from './adatpters/redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add redis adapter 

  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();

  // app.useWebSocketAdapter(redisIoAdapter);

  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: ['http://localhost:5102'],
    credentials: true,
    // 'methods': ['POST', 'GET', 'PUT', 'PATCH', 'DELETE','OPTIONS']
  });
  app.use(cookieParser());
  const config = new ConfigService();
  app.useGlobalPipes(new ValidationPipe());
  const port = config.get('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo example')
    .setDescription('The demo API description')
    .setVersion('1.0')
    .addTag('demo')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-api', app, document);

  await app
    .listen(port)
    .then((res) => console.log('app listen in port:', port));
}
bootstrap();
