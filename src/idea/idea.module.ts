import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Idea, User]),
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
  controllers: [IdeaController],
  exports: [IdeaService, JwtModule, PassportModule],
  providers: [
    IdeaService,
    AuthService,
    UserService,
    JwtService,
    ConfigService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class IdeaModule {}
