import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/commons/jwt.constant';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
    constructor() {
        super({
            // jwtFromRequest: (req  => {
            //     console.log(req.headers)
            //     return req.headers.refresh
            // }),
            jwtFromRequest: ExtractJwt.fromExtractors([(req => {
              return req.cookies.refresh
            })]),
            secretOrKey: jwtConstants.refresh,
            passReqToCallback: true,
        })
    }
  async validate(req: Request) {
    return req
  }
}
