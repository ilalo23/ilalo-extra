import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Asientos } from "./accounting-entries.entity";
import { CuentasContables } from "./accounting-accounts.entity";
import { Auxiliares } from "./accounting-accountsAux.entity";

@Entity("DetallesAsientos")
export class DetallesAsientos {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ select: false })
  idAsiento: number;

  @Column({ type: "nvarchar" })
  codigoCuentaContable: string;

  @Column({ type: "nvarchar" })
  codigoAuxiliar: string;

  @Column({ type: "varchar" })
  detalle: string;

  @Column({ type: "decimal" })
  debe: number;

  @Column({ type: "decimal" })
  haber: number;

  @ManyToOne(() => Asientos, (rt) => rt.detalles)
  @JoinColumn([{ name: "idAsiento", referencedColumnName: "id" }])
  asiento: Asientos;

  @OneToOne(() => CuentasContables, (cc) => cc.detalleAsiento)
  @JoinColumn({ name: "codigoCuentaContable", referencedColumnName: "codigo" })
  cuenta: CuentasContables;

  @OneToOne(() => Auxiliares, (cc) => cc.detalleAsiento, { nullable: false })
  @JoinColumn({ name: "codigoAuxiliar", referencedColumnName: "codigo" })
  auxiliar: Auxiliares;
}
