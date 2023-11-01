import { Module } from '@nestjs/common';
import { AccountingEntriesService } from './accounting-entries.service';
import { AccountingEntriesController } from './accounting-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresas } from './entities/company.entity';
import { Agencias } from './entities/office.entity';
import { Asientos } from './entities/accounting-entries.entity';
import { DetallesAsientos } from './entities/acounting-details.entity';
import { CuentasContables } from './entities/accounting-accounts.entity';
import { Auxiliares } from './entities/accounting-accountsAux.entity';
import { AutorizacionesCierres } from './entities/accounting-auth.entity';
import { TiposAsientos } from './entities/accounting-typeEntry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Empresas,
      Agencias,
      Asientos,
      DetallesAsientos,
      CuentasContables,
      Auxiliares,
      AutorizacionesCierres,
      TiposAsientos
    ]),

  ],
  providers: [AccountingEntriesService],
  controllers: [AccountingEntriesController]
})
export class AccountingEntriesModule { }
