import { Module } from '@nestjs/common';
import { userProvider } from './providers/role.provider';
import { RoleRepository } from './repositories/role.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...userProvider, RoleRepository],
})
export class RolesModule {}
