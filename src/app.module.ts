import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, IdeaModule, DatabaseModule, ConfigModule],
})
export class AppModule {}
