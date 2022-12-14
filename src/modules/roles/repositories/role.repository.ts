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
    const result = await this.realModel
      .create(params)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
    return result;
  }

  async updateRole(params) {
    return await this.realModel.findOneAndUpdate({ id: params.id }, { params });
  }
}
