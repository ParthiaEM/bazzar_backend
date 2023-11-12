import * as dotenv from 'dotenv';
dotenv.config();
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request.query.token,
      ]),
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  async validate(payload: any) {
    console.log(payload.userUniqueId);
    const user = this.userService.findOne(payload.userUniqueId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
