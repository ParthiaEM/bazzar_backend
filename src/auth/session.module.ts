import * as dotenv from 'dotenv';
dotenv.config();
import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as session from 'express-session';

@Module({
  providers: [],
  imports: [],
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SECRET_KEY,
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 300 * 60 * 1000,
          },
        }),
      )
      .forRoutes('*');
  }
}
