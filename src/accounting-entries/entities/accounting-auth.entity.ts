import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("AutorizacionesCierres")
export class AutorizacionesCierres {
  @PrimaryColumn({ type: "int", select: false })
  id: number;

  @Column({ select: false })
  fecha: Date;

  @Column({ type: "nvarchar" })
  codigoUsuario: string;

  @Column({ type: "nvarchar" })
  ip: string;

  @Column({})
  fechaServidor: Date;

  @Column({})
  version: number;
}
