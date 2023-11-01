import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { JoyasPrendar } from "./jewerly-prendar.entity";

@Entity("TiposJoyas")
export class TiposJoyas {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => JoyasPrendar, (jp) => jp.tipoJoya)
  joya: JoyasPrendar;
}
