import {
  Injectable,
  BadGatewayException,
  NotFoundException,
} from "@nestjs/common";
import { Purchase } from "./entities/purchase.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { File } from "./entities/file.entity";
import { FilterPurchasesDto } from "./dto/filter-purchases.dto";

import {
  getImageFormat,
  resizeAndCompressImage,
} from "src/helpers/files.helper";
import { Companies } from "./constants/companies.contants";
import { UpdatePurchaseDto } from "./dto/update-purchase.dto";

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    @InjectRepository(File, "files")
    private readonly filesRepository: Repository<File>
  ) {}

  async getPendingPurchasesForAuth(
    filterPurchasesDto: FilterPurchasesDto
  ): Promise<{
    docs: Array<any>;
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  }> {
    let filter = {
      status: "I",
    };
    if (filterPurchasesDto.name) {
      filter["suppliername"] = ILike(`%${filterPurchasesDto.name}%`);
    }

    const purchases = await this.purchasesRepository.find({
      relations: ["typePurchaseDocument", "office"],
      where: {
        status: "I",
      },
      take: filterPurchasesDto.limit ?? 5,
      order: {
        dateDocument: {
          direction: "DESC",
        },
      },
      select: [
        "id",
        "companyId",
        "suppliername",
        "identification",
        "typePurchaseDocument",
        "office",
        "dateDocument",
        "dateRegister",
        "codeAndSerial",
        "docNumber",
        "status",
        "subtotal0",
        "subtotalWithTax",
        "totalTaxIva",
        "percentIva",
        "totalRetained",
      ],
      skip:
        filterPurchasesDto.page === 1
          ? 0
          : (filterPurchasesDto.page - 1) * (filterPurchasesDto.limit ?? 5),
    });

    const total = await this.purchasesRepository.count({ where: filter });

    return {
      docs: purchases.map((p) => ({
        ...p,
        company: Companies[p.companyId],
        typePurchaseDocument: p.typePurchaseDocument.name,
        office: p.office.name,
      })),
      totalDocs: total,
      totalPages: Math.ceil(total / filterPurchasesDto.limit),
      currentPage: filterPurchasesDto.page,
      hasNextPage:
        total === filterPurchasesDto.page * filterPurchasesDto.limit ||
        filterPurchasesDto.page * filterPurchasesDto.limit > total
          ? false
          : true,
    };
  }

  async getPdfOrImage(
    id: number
  ): Promise<{
    type: string;
    file: Buffer;
  }> {
    const purchase = await this.purchasesRepository.findOne({
      where: {
        id,
      },
      select: ["photo"],
    });
    if (purchase) {
      return {
        type: `image/${getImageFormat(purchase)}`,
        file: await resizeAndCompressImage(purchase.photo),
      };
    } else {
      const file = await this.filesRepository.findOne({
        where: [
          {
            id,
          },
        ],
      });
      if (file) {
        return {
          type: "application/pdf",
          file: Buffer.from(file.data, "base64"),
        };
      }
    }
  }

  async updateStatusPurchase(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto
  ): Promise<Purchase> {
    try {
      const purchase = await this.purchasesRepository.findOne({
        where: {
          id,
        },
      });
      console.log(purchase);
      if (!purchase) {
        return null;
      }
      purchase.status = updatePurchaseDto.status;
      purchase.dateServer = new Date();
      purchase.user = "MCROSERO";
      await this.purchasesRepository.save(purchase);
      return purchase;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
