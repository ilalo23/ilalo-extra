import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Purchase } from "./purchase.entity";
@Entity("Agencias")
export class Office {
  @PrimaryColumn({ select: false })
  id: number;

  @OneToOne(() => Purchase, (purchase) => purchase.office)
  purchase: Purchase;

  @Column({ name: "nombre" })
  name: number;
}
/*
Solicitudes
P -- primero ingreso debe estar este estado
x--se anula
I-- al presionar devolver
select * from SolicitudesComentarios
where idSolicitud = 173444
se crea un comentario del movimeinnto

A--Aprobado




*/
