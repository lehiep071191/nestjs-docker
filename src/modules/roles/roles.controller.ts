import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PermissionGuard from '../auth/guards/permission.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @UseGuards(PermissionGuard('fullPermision'))
  @Post()
  async createRoles(@Body() dto: CreateRoleDto) {
    return await this.service.createRole(dto);
  }
}
