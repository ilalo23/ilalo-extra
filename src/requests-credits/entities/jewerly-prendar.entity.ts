import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { CotizacionesJoyas } from "./quote-jewerly.entity";
import { TiposOros } from "./type-golden.entity";
import { TiposJoyas } from "./type-jewerly.entity";

@Entity("JoyasPrendar")
export class JoyasPrendar {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ type: "nvarchar" })
  descripcion: string;

  @Column({ type: "nvarchar" })
  estado: string;

  @Column({ type: "decimal" })
  valorGramo: number;

  @Column({ type: "decimal" })
  peso: number;

  @Column({ type: "nvarchar" })
  observacion: string;


  @OneToOne(() => CotizacionesJoyas, (ca) => ca.joya)
  cotizacion: CotizacionesJoyas;

  @OneToOne(() => TiposOros, (c) => c.joya)
  @JoinColumn({ name: "idTipoOro", referencedColumnName: "id" })
  tipoOro: TiposOros;

  @OneToOne(() => TiposJoyas, (c) => c.joya)
  @JoinColumn({ name: "idTipoJoya", referencedColumnName: "id" })
  tipoJoya: TiposJoyas;
}
