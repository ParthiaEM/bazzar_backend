import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { IdeaService } from 'src/idea/idea.service';
import { Idea } from 'src/idea/entities/idea.entity';
@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, Idea]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(process.env.SECRET_KEY),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    IdeaService,
    UserService,
    AuthService,
    ConfigService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UserService, JwtModule, PassportModule],
})
export class UserModule {}
