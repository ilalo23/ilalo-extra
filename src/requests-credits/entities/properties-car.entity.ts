import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { JoyasPrendar } from "./jewerly-prendar.entity";
import { VehiculosPrendar } from "./car.entity";

@Entity("TiposVehiculos")
export class TiposVehiculos {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;

    @OneToOne(() => VehiculosPrendar, (jp) => jp.tipo)
    vehiculo: VehiculosPrendar;
}


@Entity("MarcasVehiculos")
export class MarcasVehiculos {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;

    @OneToOne(() => VehiculosPrendar, (jp) => jp.marca)
    vehiculo: VehiculosPrendar;
}

@Entity("ModelosVehiculos")
export class ModelosVehiculos {
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ type: "nvarchar" })
    nombre: string;

    @OneToOne(() => VehiculosPrendar, (jp) => jp.modelo)
    vehiculo: VehiculosPrendar;
}
