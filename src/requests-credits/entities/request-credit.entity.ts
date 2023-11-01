import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CotizacionesJoyas } from "./quote-jewerly.entity";
import { Cotizaciones } from "./quote-credit.entity";
import { Agencias } from "./office.entity";
import { TiposPrestamos } from "./type-credit";
import { Clientes } from "./customer.entity";

@Entity("Solicitudes")
export class Solicitudes {
  @PrimaryColumn({

  })
  idSolicitud: number;

  @Column({ type: "int" })
  idEmpresa: number;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @Column({ type: "decimal" })
  capital: number; // monto maximo

  @Column({ type: "decimal" })
  valorCuota: number;

  @Column({ type: "decimal" })
  montoAprobado: number; // modificar

  @Column({ type: "nvarchar" })
  documento: string;

  @OneToOne(() => Cotizaciones, (c) => c.solicitud, { nullable: false })
  @JoinColumn({ name: "documento", referencedColumnName: "documento" })
  cotizacion: Cotizaciones;


  @OneToOne(() => Clientes, (c) => c.solicitud)
  @JoinColumn({ name: "idCliente", referencedColumnName: "idCliente" })
  cliente: Clientes;

  @OneToOne(() => Agencias, (c) => c.solicitud)
  @JoinColumn({ name: "idAgencia", referencedColumnName: "id" })
  oficina: Agencias;

  @OneToOne(() => TiposPrestamos, (tp) => tp.solicitud)
  @JoinColumn({ name: "codigoTipoPrestamo", referencedColumnName: "codigo" })
  tipoPrestamo: TiposPrestamos;
}
