import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { OrdenesCajas } from "./cashier-orders.entity";

@Entity("Agencias")
export class Agencias {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;

    @OneToOne(() => OrdenesCajas, (jp) => jp.oficina)
    orden: OrdenesCajas;
}
