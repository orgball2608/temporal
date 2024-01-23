import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppLoggerMiddleware } from './app-logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TimerModule } from './timer/timer.module';
import { WinstonModule } from 'nest-winston';
import config from './config';
import { validate } from './env.validation';
import winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
      validate,
      envFilePath: '.env',
    }),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.json()
          ),
        }),
      ],
    }),
    TimerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
