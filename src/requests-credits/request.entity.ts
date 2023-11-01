import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity("Solicitudes")
export class RequestCredit {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ name: "idEmpresa" })
  companyId: number;
}
