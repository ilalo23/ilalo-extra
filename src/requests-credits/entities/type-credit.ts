import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Solicitudes } from "./request-credit.entity";

@Entity("TiposPrestamos")
export class TiposPrestamos {
  @PrimaryColumn({ type: "nvarchar", select: false })
  codigo: string;

  @Column({ type: "nvarchar" })
  nombre: string;



  @OneToOne(() => Solicitudes, (so) => so.tipoPrestamo)
  solicitud: Solicitudes;
}
