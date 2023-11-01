import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Asientos } from "./accounting-entries.entity";

@Entity("Agencias")
export class Agencias {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => Asientos, (rt) => rt.agencia)
  asiento: Asientos;
}
