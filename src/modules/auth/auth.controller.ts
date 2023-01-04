import { Controller, Post, UseGuards, Request, Body, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenAuthGuard } from './guards/refresh-token-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user);
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshAccessToken(@Request()  req) {
    return this.service.refreshToken(req)
  }
}
