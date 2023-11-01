import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Artefactos } from "./device.entity";



@Entity("CotizacionesArtefactos")
export class CotizacionesArtefactos {
    @PrimaryColumn({ select: false })
    id: number;


    @Column()
    idCotizacion: number;

    @Column()
    idArtefacto: number;

    @OneToOne(() => Artefactos, (c) => c.cotizacion, { nullable: false })
    @JoinColumn({ name: "idArtefacto", referencedColumnName: "id" })
    dispositivo: Artefactos;
}
