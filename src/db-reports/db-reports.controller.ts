import { Controller, Get } from "@nestjs/common";
import { DbReportsService } from "./db-reports.service";
//import { DbReportsService } from './db-reports.service';

@Controller("db-reports")
export class DbReportsController {
  constructor(private readonly dbReportsService: DbReportsService) {}
  @Get("/resumeLoans")
  async getResumeLoans() {
    await this.dbReportsService.getResumesLoans("2023-07-06");
  }
}
