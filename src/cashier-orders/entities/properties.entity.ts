import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { OrdenesCajas } from "./cashier-orders.entity";

@Entity("Causales")
export class Causales {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;

    @Column({ type: "nvarchar" })
    codigo: string;

    @OneToOne(() => OrdenesCajas, (jp) => jp.causal)
    orden: OrdenesCajas;
}


@Entity("Auxiliares")
export class Auxiliares {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;
    @Column({ type: "nvarchar" })
    codigo: string;

    @OneToOne(() => OrdenesCajas, (jp) => jp.auxiliar)
    orden: OrdenesCajas;
}
