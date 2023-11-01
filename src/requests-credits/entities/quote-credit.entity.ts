import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Solicitudes } from "./request-credit.entity";
import { CotizacionesJoyas } from "./quote-jewerly.entity";

@Entity("Cotizaciones")
export class Cotizaciones {
  @PrimaryColumn({})
  id: number;

  @Column({ type: "nvarchar", select: false })
  documento: string;

  @Column({ type: "nvarchar" })
  tipoPrendar: string;

  @OneToOne(() => Solicitudes, (solicitud) => solicitud.cotizacion)
  solicitud: Solicitudes;
}
