import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      ignoreEnvVars: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   synchronize: true,
    //   entities: [User, Report],
    // }),
  ],
})
export class AppModule {}
