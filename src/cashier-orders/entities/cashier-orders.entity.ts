import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Agencias } from "./office.entity";

import { Auxiliares, Causales } from "./properties.entity";
import { Empresas } from "./company.entity";
@Entity("OrdenesCajas")
export class OrdenesCajas {
    @PrimaryColumn({ select: false })
    id: number;

    @Column()
    codigoCliente: number;

    @Column()
    nombre: string;



    @Column({ type: 'decimal' })
    valor: number;

    @Column({ type: 'bit' })
    esEgreso: boolean;

    @Column()
    concepto: string;

    @Column()
    codigoUsuario: string;

    @Column()
    estado: string;

    @Column()
    fecha: Date;

    @OneToOne(() => Causales, (type) => type.orden)
    @JoinColumn({ name: "codigoCausal", referencedColumnName: "codigo" })
    causal: Causales;

    @OneToOne(() => Auxiliares, (a) => a.orden)
    @JoinColumn({ name: "codigoAuxiliar", referencedColumnName: "codigo" })
    auxiliar: Auxiliares;

    @OneToOne(() => Agencias, (ag) => ag.orden)
    @JoinColumn({ name: "idAgencia", referencedColumnName: "id" })
    oficina: Agencias;

    @OneToOne(() => Empresas, (em) => em.orden)
    @JoinColumn({ name: "idEmpresa", referencedColumnName: "id" })
    empresa: Empresas;


}
