import { Module } from "@nestjs/common";
import { PurchasesService } from "./purchases.service";
import { PurchasesController } from "./purchases.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./entities/purchase.entity";
import { Office } from "./entities/office.entity";
import { TypePurchaseDocument } from "./entities/typePurchaseDocument.entity";
import { File } from "./entities/file.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Office, TypePurchaseDocument]),
    TypeOrmModule.forFeature([File], "files"),
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
