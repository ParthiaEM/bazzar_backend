import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './tokenPayload.interface';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public getCookieWithJwtToken(userUniqueId: number) {
    const payload: TokenPayload = { userUniqueId };
    const token = this.jwtService.sign(payload, {
      expiresIn: '12h',
      secret: process.env.SECRET_KEY,
    });

    return token;
  }

  async validateUser(payload: any) {
    const user = await this.userService.findOne(payload.userUniqueId);
    if (user) {
      return user;
    }
    return null;
  }
}
