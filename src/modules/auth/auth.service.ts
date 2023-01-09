import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/commons/jwt.constant';
import { verify } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    this.config = new ConfigService();
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findInfoUserByEmail({ email });
    if (!user || !user.length) {
      throw new BadRequestException('user not existed');
    }
    let resultUser = user[0];
    const checkUserCompare = await bcrypt.compare(
      password,
      resultUser.password,
    );
    if (checkUserCompare) {
      return user;
    }

    return null;
  }

  async login(user) {
    const payload = user;
    if (user?.roles?.length) {
      payload.permissions = user.roles[0].permissions;
    }
    delete payload.password;
    return {
      access_token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '168h',
        secret: jwtConstants.refresh,
      }),
    };
  }

  async refreshToken(req) {
    const user: any = await this.jwtService.verify(req.cookies.refresh, {
      secret: jwtConstants.refresh,
    });
    const id = user.id;
    const payload: any = await this.userRepository.findOneUser({ id });
    console.log(payload);
    const signPayload = {
      address: payload.address,
      birthday: payload.birthday,
      createdAt: payload.createdAt,
      email: payload.email,
      isFirstLogin: payload.isFirstLogin,
      isFullPermission: payload.isFullPermission,
      name: payload.name,
      roles: payload.roles,
      updatedAt: payload.updatedAt,
      userName: payload.userName,
      id: payload.id,
    };
    return {
      access_token: this.jwtService.sign(signPayload),
      refreshToken: this.jwtService.sign(signPayload, {
        expiresIn: '168h',
        secret: jwtConstants.refresh,
      }),
    };
  }

  async verifyToken(token) {
    const user = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret
    })
    return user
  }
}
