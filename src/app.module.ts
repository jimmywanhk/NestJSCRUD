import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => {
        const isProd = configSerivce.get('STAGE') === 'prod';
        return {
          ssl: isProd,
          extra: {
            ssl: isProd ? { rejectUnAuthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configSerivce.get('DB_HOST'),
          port: configSerivce.get('DB_PORT'),
          username: configSerivce.get('DB_USERNAME'),
          password: configSerivce.get('DB_PASSWORD'),
          database: configSerivce.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
