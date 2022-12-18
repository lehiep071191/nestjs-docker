import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRequestDto } from './dto/user.dto';
import { UserRepository } from './repositories/users.repository';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly config: ConfigService,
  ) {
    this.config = this.getConfig();
  }

  async createNormalUser(dto: UserRequestDto) {
    const query = {
      $or: [{ email: dto.email }, { userName: dto.userName }],
    };
    const oldModel = await this.repository.findOneUser(query);
    if (oldModel) {
      throw new BadRequestException('User existed');
    }
    if (dto.secretKeySuperAdmin) {
      const superUser = await this.repository.findByQuery({
        isFullPermission: true,
      });
      if (superUser && superUser.length) {
        throw new BadRequestException('System has super admin');
      }
    }

    const model: any = { ...dto };
    console.log(this.config.get('SUPER_ADMIN_KEY'));
    if (
      dto.secretKeySuperAdmin &&
      dto.secretKeySuperAdmin === this.config.get('SUPER_ADMIN_KEY')
    ) {
      model.isFullPermission = true;
    }
    const password = await bcrypt.hash(dto.password, 10);
    model.password = password;
    const birthday = dto.birthday;
    model.birthday = moment(birthday, 'YYYY-MM-DD');
    model.id = uuid.v4();
    const result = await this.repository.createUser(model);
    return result;
  }

  async getProfile(id) {
    console.log(id)
    return await this.repository.findOneUser({id})
  }

  getConfig() {
    return new ConfigService();
  }
}
