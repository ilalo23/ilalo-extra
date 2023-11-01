import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

import { Solicitudes } from "./request-credit.entity";

@Entity("Clientes")
export class Clientes {
    @PrimaryColumn({ select: false })
    idCliente: number;

    @Column({ type: "nvarchar" })
    codigo: string;

    @Column({ type: "nvarchar" })
    nombreCompleto: string;

    @OneToOne(() => Solicitudes, (so) => so.cliente)
    solicitud: Solicitudes;
}
