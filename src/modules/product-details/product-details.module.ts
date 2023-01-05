import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ProductDetailsController } from './product-details.controller';
import { ProductDetailsService } from './product-details.service';
import { productDetailProvider } from './providers/product-detail.provider';
import { ProductDetailsRepository } from './repositories/product-details.repository';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [ProductDetailsController],
  providers: [
    ProductDetailsService,
    ...productDetailProvider,
    ProductDetailsRepository,
  ],
  exports: [ProductDetailsService, ProductDetailsRepository],
})
export class ProductDetailsModule {}
