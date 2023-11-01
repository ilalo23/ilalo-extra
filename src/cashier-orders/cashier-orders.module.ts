import { Module } from '@nestjs/common';
import { CashierOrdersService } from './cashier-orders.service';
import { CashierOrdersController } from './cashier-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesCajas } from './entities/cashier-orders.entity';
import { Empresas } from './entities/company.entity';
import { Agencias } from './entities/office.entity';
import { Auxiliares, Causales } from './entities/properties.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenesCajas,
      Empresas,
      Agencias,
      Causales,
      Auxiliares
    ]),

  ],
  providers: [CashierOrdersService],
  controllers: [CashierOrdersController]
})
export class CashierOrdersModule { }
