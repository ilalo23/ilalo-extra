import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

import { Solicitudes } from "./request-credit.entity";

@Entity("Agencias")
export class Agencias {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ type: "nvarchar" })
  nombre: string;

  @OneToOne(() => Solicitudes, (so) => so.oficina)
  solicitud: Solicitudes;
}
