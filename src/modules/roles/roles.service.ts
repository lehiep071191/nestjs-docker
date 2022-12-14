import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleRepository } from './repositories/role.repository';
import * as uuid from 'uuid';
@Injectable()
export class RolesService {
  constructor(private readonly repository: RoleRepository) {}

  async createRole(dto: CreateRoleDto) {
    const model: any = { ...dto };
    model.id = uuid.v4();

    return await this.repository.createRole(model);
  }
}
