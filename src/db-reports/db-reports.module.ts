import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DbReportsController } from './db-reports.controller';
import { DbReportsService } from './db-reports.service';
import { ResumeLoan } from './entities/resumeLoan.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ResumeLoan]),
  ],
  providers: [DbReportsService],
  controllers: [DbReportsController],
  
})
export class DbReportsModule {}
