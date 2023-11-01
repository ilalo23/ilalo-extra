import {
    Column,
    Entity,

    JoinColumn,

    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { CotizacionesJoyas } from "./quote-jewerly.entity";
import { TiposOros } from "./type-golden.entity";
import { TiposJoyas } from "./type-jewerly.entity";
import { CotizacionesArtefactos } from "./quote-device.entity";
import { CotizacionesVehiculos } from "./quote-car.entity";
import { MarcasVehiculos, ModelosVehiculos, TiposVehiculos } from "./properties-car.entity";

@Entity("VehiculosPrendar")
export class VehiculosPrendar {
    @PrimaryColumn({ select: false })
    id: number;

    /*@Column({ type: "int" })
    idTipoVehiculo: number;*/
    @OneToOne(() => TiposVehiculos, (c) => c.vehiculo, { nullable: false })
    @JoinColumn({ name: "idTipoVehiculo", referencedColumnName: "id" })
    tipo: TiposVehiculos;

    /*@Column({ type: "int" })
    idMarcaVehiculo: number;*/
    @OneToOne(() => MarcasVehiculos, (c) => c.vehiculo, { nullable: false })
    @JoinColumn({ name: "idMarcaVehiculo", referencedColumnName: "id" })
    marca: MarcasVehiculos;

    /*@Column({ type: "int" })
    idModeloVehiculo: number;*/
    @OneToOne(() => ModelosVehiculos, (c) => c.vehiculo, { nullable: false })
    @JoinColumn({ name: "idModeloVehiculo", referencedColumnName: "id" })
    modelo: ModelosVehiculos;

    @Column({ type: "int" })
    anio: number;

    @Column({ type: "nvarchar" })
    placa: string;

    @Column({ type: "nvarchar" })
    color: string;

    @Column({ type: "decimal" })
    avaluo: number;

    @Column({ type: "nvarchar" })
    estado: string;

    @OneToOne(() => CotizacionesVehiculos, (ca) => ca.vehiculo)
    cotizacion: CotizacionesVehiculos;

}
