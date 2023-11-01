import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { JoyasPrendar } from "./jewerly-prendar.entity";

@Entity("TiposOros")
export class TiposOros {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => JoyasPrendar, (jp) => jp.tipoOro)
  joya: JoyasPrendar;
}
