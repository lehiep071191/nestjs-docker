import { Controller, Post } from '@nestjs/common';
import { UserRequestDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('sign-up')
  async createNormalUser(dto: UserRequestDto) {}
}
