import {
  Controller,
  Get,
  Query,
  Put,
  HttpCode,
  Param,
  BadRequestException,
  HttpStatus,
  StreamableFile,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { PurchasesService } from "./purchases.service";
import { FilterPurchasesDto } from "./dto/filter-purchases.dto";
import { UpdatePurchaseDto } from "./dto/update-purchase.dto";

@Controller("purchases")
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) { }

  @Get("")
  async getPendingPurchasesForAuth(
    @Query() filterPurchasesDto: FilterPurchasesDto
  ) {
    return this.purchasesService.getPendingPurchasesForAuth(filterPurchasesDto);
  }

  @Get("/download/:id")
  @HttpCode(HttpStatus.OK)
  async downloadFile(@Param() query) {
    const { id } = query;
    if (!id) throw new BadRequestException("Data its required");
    const dataFile = await this.purchasesService.getPdfOrImage(id);

    return new StreamableFile(dataFile.file, {
      type: dataFile.type,
    });
  }
  @Put(':id')
  async updateStatusPurchase(@Param('id') id: number, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    const updatedPurchase = this.purchasesService.updateStatusPurchase(id, updatePurchaseDto);
    if (!updatedPurchase) {
      throw new NotFoundException('Purchase not found');
    }
    return updatedPurchase;
  }
}
