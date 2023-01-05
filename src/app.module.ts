import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';
import * as Joi from '@hapi/joi';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './modules/mailer/mailer.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductDetailsModule } from './modules/product-details/product-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
    LoggerModule,
    MailModule,
    ProductsModule,
    ProductDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
