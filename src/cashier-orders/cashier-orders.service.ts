import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdenesCajas } from "./entities/cashier-orders.entity";
import { ILike, Repository } from "typeorm";
import { FilterPurchasesDto } from "src/purchases/dto/filter-purchases.dto";

@Injectable()
export class CashierOrdersService {
  constructor(
    @InjectRepository(OrdenesCajas)
    private readonly ordenesCajasRepository: Repository<OrdenesCajas>
  ) {}

  async getPendingCashierOrders(
    filterCashierOrders: FilterPurchasesDto
  ): Promise<{
    docs: Array<any>;
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  }> {
    let filter = {
      // estado: "I",
    };
    if (filterCashierOrders.name) {
      filter["nombre"] = ILike(`%${filterCashierOrders.name}%`);
    }

    const orders = await this.ordenesCajasRepository
      .createQueryBuilder("ordenes")
      .innerJoinAndSelect("ordenes.empresa", "empresa")
      .innerJoinAndSelect("ordenes.causal", "causal")
      .innerJoinAndSelect("ordenes.auxiliar", "auxiliar")
      .innerJoinAndSelect("ordenes.oficina", "oficina")
      .where(filter)
      .take(filterCashierOrders.limit ?? 5)
      .skip(
        filterCashierOrders.page === 1
          ? 0
          : (filterCashierOrders.page - 1) * (filterCashierOrders.limit ?? 5)
      )
      //.orderBy("ordenes.fecha", "DESC")
      .getMany();

    const total = await this.ordenesCajasRepository.count({ where: filter });

    return {
      docs: orders,
      totalDocs: total,
      totalPages: Math.ceil(total / filterCashierOrders.limit),
      currentPage: filterCashierOrders.page,
      hasNextPage:
        total === filterCashierOrders.page * filterCashierOrders.limit ||
        filterCashierOrders.page * filterCashierOrders.limit > total
          ? false
          : true,
    };
  }
}
