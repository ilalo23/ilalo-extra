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
import { CotizacionesArtefactos } from "./quote-device.entity";

@Entity("Artefactos")
export class Artefactos {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;

    @Column({ type: "nvarchar" })
    marca: string;

    @Column({ type: "nvarchar" })
    modelo: number;

    @Column({ type: "int" })
    anoCompra: number;

    @Column({ type: "decimal" })
    avaluo: number;

    @Column({ type: "decimal" })
    valorSolicita: number;

    @Column({ type: "nvarchar" })
    observacion: string;

    @Column({ type: "nvarchar" })
    estado: string;

    @OneToOne(() => CotizacionesArtefactos, (ca) => ca.dispositivo)
    cotizacion: CotizacionesArtefactos;

}
