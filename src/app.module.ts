import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db.sqlite',
    synchronize:true,
    entities:[User,Report]
  }),UsersModule, ReportsModule],

})
export class AppModule {}
