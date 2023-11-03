import { Module } from '@nestjs/common';
import { databaseProviders } from './database.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Idea } from 'src/idea/entities/idea.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'bazzar',
      synchronize: true, // 이 옵션을 true로 설정
      entities: [User, Idea],
    }),
  ],
})
export class DatabaseModule {}
