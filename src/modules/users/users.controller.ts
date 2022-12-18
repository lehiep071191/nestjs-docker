import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import PermissionGuard from '../auth/guards/permission.guard';
import { UserRequestDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('sign-up')
  createNormalUser(@Body() dto: UserRequestDto) {
    return this.service.createNormalUser(dto);
  }


  @UseGuards(PermissionGuard('view_profile'))
  @Get('profile')
  getUserProfile(@User() user: any ) {
    return this.service.getProfile(user.id)
  }
}
