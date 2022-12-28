import { Module } from '@nestjs/common';
import { CustomerLoggerService } from './logger.service';

@Module({
  providers: [CustomerLoggerService],
  exports: [CustomerLoggerService]
})
export class LoggerModule {}
