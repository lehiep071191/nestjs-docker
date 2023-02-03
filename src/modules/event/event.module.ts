import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { EventGatewave } from './event.gatewave';

@Module({
  imports: [AuthModule, ConfigModule],
  providers: [EventGatewave],
  exports: [EventGatewave],
})
export class EventModule {
}
