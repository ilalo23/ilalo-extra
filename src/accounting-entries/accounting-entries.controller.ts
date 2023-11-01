import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { AccountingEntriesService } from "./accounting-entries.service";
import { FilterAccountingEntriesDto } from "./dto/filter-accountingEntries.dto";

@Controller("accounting-entries")
export class AccountingEntriesController {
  constructor(
    private readonly accountingEntriesService: AccountingEntriesService
  ) { }

  @Get()
  async getAccountingEntries(
    @Query() filterAccountingEntriesDto: FilterAccountingEntriesDto
  ) {
    return this.accountingEntriesService.getAccountingEntries(
      filterAccountingEntriesDto
    );
  }

  @Put()
  async approveAccoutingDay(
    @Query() filterAccountingEntriesDto: FilterAccountingEntriesDto
  ) {
    return this.accountingEntriesService.approveAccoutingDay(
      filterAccountingEntriesDto
    );
  }
}
