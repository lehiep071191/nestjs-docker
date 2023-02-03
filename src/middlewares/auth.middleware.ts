import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(!req.headers || !req.headers.authorization) {
      throw new BadRequestException({errors: {
        message: 'not authorization',
        status: 401
      }})
    }
    next();
  }
}
