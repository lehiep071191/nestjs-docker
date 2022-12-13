import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRequestDto } from './dto/user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly repository: UserRepository
    ){}

    async createNormalUser(dto: UserRequestDto) {
        const query = {
            $or: [
                {email: dto.email},
                {userName: dto.userName}
            ]
        }
        const oldModel = await this.repository.findOneUser(query)
        if(oldModel) {
            throw new BadRequestException('User existed')
        }
    }
}
