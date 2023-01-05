import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { EventGatewave } from './event.gatewave';

@Module({
  imports: [AuthModule, ConfigModule],
  providers: [EventGatewave],
  exports: [EventGatewave],
})
export class EventModule {}
