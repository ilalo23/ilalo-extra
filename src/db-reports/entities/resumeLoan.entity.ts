import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
@Entity("ResumenesPrestamos")
export class ResumeLoan {
  @PrimaryColumn({ select: false })
  id: number;

  @Column()
  saldoCapital: number;

  @Column()
  Vigente: number;
  @Column()
  Vencido: number;

  @Column()
  idEmpresa: number;
}
