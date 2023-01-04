import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ProductRepository } from './repositories/product.repository';
import { productProvider } from './providers/product.provider';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [ProductsService, ProductRepository, ...productProvider],
  controllers: [ProductsController]
})
export class ProductsModule {}
