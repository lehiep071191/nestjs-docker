import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

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
    delete payload.password;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
