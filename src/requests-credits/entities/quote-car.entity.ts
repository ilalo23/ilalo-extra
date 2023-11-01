import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { VehiculosPrendar } from "./car.entity";



@Entity("CotizacionesVehiculos")
export class CotizacionesVehiculos {
    @PrimaryColumn({ select: false })
    id: number;


    @Column()
    idCotizacion: number;

    @Column()
    idVehiculo: number;

    @OneToOne(() => VehiculosPrendar, (c) => c.cotizacion, { nullable: false })
    @JoinColumn({ name: "idVehiculo", referencedColumnName: "id" })
    vehiculo: VehiculosPrendar;
}
