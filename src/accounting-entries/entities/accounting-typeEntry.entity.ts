import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Asientos } from "./accounting-entries.entity";

@Entity("TiposAsientos")
export class TiposAsientos {
  @PrimaryColumn({ select: false, type: "char" })
  codigo: string;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => Asientos, (rt) => rt.tipoAsiento)
  asiento: Asientos;
}
