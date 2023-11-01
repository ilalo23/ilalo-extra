import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

import { Cotizaciones } from "./quote-credit.entity";
import { JoyasPrendar } from "./jewerly-prendar.entity";

@Entity("CotizacionesJoyas")
export class CotizacionesJoyas {
  @PrimaryColumn({ select: false })
  id: number;


  @Column()
  idCotizacion: number;

  @Column()
  idJoyaPrendar: number;

  @OneToOne(() => JoyasPrendar, (c) => c.cotizacion, { nullable: false })
  @JoinColumn({ name: "idJoyaPrendar", referencedColumnName: "id" })
  joya: JoyasPrendar;
}
