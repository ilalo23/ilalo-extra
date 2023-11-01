import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { DetallesAsientos } from "./acounting-details.entity";
import { Empresas } from "./company.entity";
import { Agencias } from "./office.entity";
import { TiposAsientos } from "./accounting-typeEntry.entity";

@Entity("Asientos")
export class Asientos {
  @PrimaryColumn({})
  id: number;

  @Column({ select: false })
  idEmpresa: number;

  @Column({ type: "nvarchar" })
  detalle: string;

  @Column()
  fecha: Date;

  @Column({ type: "nvarchar", length: "1" })
  estado: string;

  @Column({ type: "nvarchar" })
  codigoUsuario: string;

  /*@Column({ select: false })
  idAgenciaOriginal: number;*/

  @Column({ type: "char", length: 1 })
  codigoTipoAsiento: string;

  @OneToMany(() => DetallesAsientos, (dr) => dr.asiento)
  @JoinColumn({ name: "id", referencedColumnName: "idAsiento" })
  detalles: DetallesAsientos[];

  //Empresa
  @OneToOne(() => Empresas, (empresa) => empresa.asiento)
  @JoinColumn({ name: "idEmpresa", referencedColumnName: "id" })
  empresa: Empresas;
  //Agencia
  @OneToOne(() => Agencias, (ag) => ag.asiento)
  @JoinColumn({ name: "idAgenciaOrigen", referencedColumnName: "id" })
  agencia: Agencias;
  // codigo tipoAsiento
  @OneToOne(() => TiposAsientos, (ag) => ag.asiento)
  @JoinColumn({ name: "codigoTipoAsiento", referencedColumnName: "codigo" })
  tipoAsiento: TiposAsientos;
}
