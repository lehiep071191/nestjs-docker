import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { userProvider } from './providers/role.provider';
import { RoleRepository } from './repositories/role.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RolesService, ...userProvider, RoleRepository],
})
export class RolesModule {}
