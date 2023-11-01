import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Asientos } from "./accounting-entries.entity";

@Entity("Empresas")
export class Empresas {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ type: "nvarchar" })
  nombreCorto: string;

  @OneToOne(() => Asientos, (rt) => rt.empresa)
  asiento: Asientos;
}
