import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ProductRepository } from './repositories/product.repository';
import { productProvider } from './providers/product.provider';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '../../commons/enums/queue.enum';
import { join } from 'path';
import { ProductProcessor } from './process';

@Module({
  imports: [
    DatabaseModule, 
    ConfigModule,
    BullModule.registerQueue({
      name: QueueEnum.PRODUCT_QUEUE,
      processors: [join(__dirname, 'process.js')]
    })
  ],
  providers: [ProductsService, ProductRepository, ...productProvider, ProductProcessor],
  controllers: [ProductsController]
})
export class ProductsModule {}
