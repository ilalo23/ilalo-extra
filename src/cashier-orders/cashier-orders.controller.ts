import { Controller, Get, Put, Body, Param, Query } from '@nestjs/common';
import { CashierOrdersService } from './cashier-orders.service';
import { FilterPurchasesDto } from 'src/purchases/dto/filter-purchases.dto';

@Controller('cashier-orders')
export class CashierOrdersController {
    constructor(private readonly cashierOrdersService: CashierOrdersService) { }

    @Get("")
    async getPendingPurchasesForAuth(
        @Query() filterCashierOrdersDto: FilterPurchasesDto
    ) {
        return this.cashierOrdersService.getPendingCashierOrders(filterCashierOrdersDto);
    }

}
