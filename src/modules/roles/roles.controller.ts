import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  async createRoles(@Body() dto: CreateRoleDto) {
    return await this.service.createRole(dto);
  }
}
