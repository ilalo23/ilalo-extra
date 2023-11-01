import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Asientos } from "./accounting-entries.entity";
import { DetallesAsientos } from "./acounting-details.entity";

@Entity("CuentasContables")
export class CuentasContables {
  @PrimaryColumn({ type: "nvarchar", select: false })
  codigo: string;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => DetallesAsientos, (rt) => rt.cuenta)
  detalleAsiento: DetallesAsientos;
}
