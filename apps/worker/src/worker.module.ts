import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { WebhookTriggerModule } from './webhook-trigger/webhook-trigger.module';
import { WinstonModule } from 'nest-winston';
import { WorkflowModule } from './workflow/workflow.module';
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
            winston.format.json(),
          ),
        }),
      ],
    }),
    WebhookTriggerModule,
    WorkflowModule,
  ],
})
export class WorkerModule {}
