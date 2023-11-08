import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public getCookieWithJwtToken(userUniqueId: number) {
    const payload: TokenPayload = { userUniqueId };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.SECRET_KEY,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      '24h',
    )}`;
  }

  async validateUser(payload: any) {
    // payload에서 필요한 정보를 추출하여 특정 조건을 확인하고 사용자를 반환합니다.
    const user = await this.userService.findOne(payload.userUniqueId);
    if (user) {
      return user;
    }
    return null;
  }
}
