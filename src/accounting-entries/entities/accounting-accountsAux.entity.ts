import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { DetallesAsientos } from "./acounting-details.entity";

@Entity("Auxiliares")
export class Auxiliares {
  @PrimaryColumn({ select: false, type: "nvarchar" })
  codigo: string;

  @Column({ type: "nvarchar", select: false })
  codigoCuentaContable: string;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => DetallesAsientos, (rt) => rt.auxiliar)
  detalleAsiento: DetallesAsientos;
}
