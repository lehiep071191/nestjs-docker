import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ROLE_MODEL } from 'src/commons/database.constant';
import { Role } from '../interface/role.interface';

@Injectable()
export class RoleRepository {
  constructor(
    @Inject(ROLE_MODEL)
    private readonly realModel: Model<Role>,
  ) {}

  async createRole(params) {
    return await this.realModel.create(params);
  }
}
