import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/users.repository';
import { userProvider } from './providers/users.provider';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [...userProvider, UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UserRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)

  }

}
