import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('sign-up')
  createNormalUser(@Body() dto: UserRequestDto) {
    return this.service.createNormalUser(dto);
  }
}
