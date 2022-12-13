import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/users.repository';
import { userProvider } from './providers/users.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...userProvider,
    UsersService, 
    UserRepository, 
  ],
  controllers: [UsersController]
})
export class UsersModule {}
