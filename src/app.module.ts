require('dotenv').config();
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';
import { DatabaseModule } from './database/database.module';
import { SessionModule } from './auth/session.module';

@Module({
  imports: [UserModule, IdeaModule, DatabaseModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
