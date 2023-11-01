import { Controller, Get, Put, Query, Param, Body, NotFoundException } from '@nestjs/common';
import { RequestsCreditsService } from './requests-credits.service';
import { FilterPurchasesDto } from 'src/purchases/dto/filter-purchases.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests-credits')
export class RequestsCreditsController {

    constructor(
        private readonly requestsService: RequestsCreditsService
    ) { }

    @Get(':company')
    async getPendingRequestCredits(@Param('company') company: number, @Query() filterRequestsDto: FilterPurchasesDto) {
        return await this.requestsService.getPendingRequestCredits(company, filterRequestsDto);
    }

    @Get('details/:id/:type')
    async getDetailsRequest(@Param() params) {
        const { id, type } = params;
        return await this.requestsService.getDetailsRequest(id, type);
    }

    @Put(':id')
    async updateRequestCred(@Param('id') id: number, @Body() updateRequestDto: UpdateRequestDto) {

        const updatedRequest = this.requestsService.updateRequestCredit(id, updateRequestDto);
        if (!updatedRequest) {
            throw new NotFoundException('Request not found');
        }
        return updatedRequest;
    }

}
