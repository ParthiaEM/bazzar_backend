import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, IdeaModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
