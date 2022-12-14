import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableCors();

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
