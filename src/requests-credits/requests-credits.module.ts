import { Module } from "@nestjs/common";
import { RequestsCreditsService } from "./requests-credits.service";
import { RequestsCreditsController } from "./requests-credits.controller";
import { Solicitudes } from "./entities/request-credit.entity";
import { Cotizaciones } from "./entities/quote-credit.entity";
import { CotizacionesJoyas } from "./entities/quote-jewerly.entity";
import { JoyasPrendar } from "./entities/jewerly-prendar.entity";
import { TiposPrestamos } from "./entities/type-credit";
import { TiposJoyas } from "./entities/type-jewerly.entity";
import { TiposOros } from "./entities/type-golden.entity";
import { Agencias } from "./entities/office.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clientes } from "./entities/customer.entity";
import { CotizacionesArtefactos } from "./entities/quote-device.entity";
import { Artefactos } from "./entities/device.entity";
import { VehiculosPrendar } from "./entities/car.entity";
import { MarcasVehiculos, ModelosVehiculos, TiposVehiculos } from "./entities/properties-car.entity";
import { CotizacionesVehiculos } from "./entities/quote-car.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Solicitudes,

      Clientes,
      Cotizaciones,
      CotizacionesJoyas,
      CotizacionesArtefactos,
      Artefactos,
      VehiculosPrendar,
      TiposVehiculos,
      ModelosVehiculos,
      MarcasVehiculos,
      CotizacionesVehiculos,
      JoyasPrendar,
      TiposPrestamos,
      TiposJoyas,
      TiposOros,
      Agencias,
    ]),
  ],
  providers: [RequestsCreditsService],
  controllers: [RequestsCreditsController],
})
export class RequestsCreditsModule { }
