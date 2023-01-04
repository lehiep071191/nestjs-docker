import { Inject, Injectable } from '@nestjs/common/decorators';
import { Model } from 'mongoose';
import { USER_MODEL } from 'src/commons/database.constant';
import { User } from '../interface/users.interface';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_MODEL)
    private readonly realModel: Model<User>,
  ) {}

  async createUser(params) {
    const user = await this.realModel.create(params);
    return user;
  }

  async findOneUser(query): Promise<User> {
    console.log(query)
    return await this.realModel.findOne(query);
  }

  async findByQuery(query): Promise<User[]> {
    return await this.realModel.find(query);
  }

  async findInfoUserByEmail(query) {
    const _query: any = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roleId',
          foreignField: 'id',
          as: 'roles',
        },
      },
    ];

    return await this.realModel.aggregate(_query);
  }
}
