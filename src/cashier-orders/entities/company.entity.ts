import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { OrdenesCajas } from "./cashier-orders.entity";

@Entity("Empresas")
export class Empresas {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombreCorto: string;

    @OneToOne(() => OrdenesCajas, (jp) => jp.empresa)
    orden: OrdenesCajas;
}
