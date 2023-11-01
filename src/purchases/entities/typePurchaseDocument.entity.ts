import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Purchase } from "./purchase.entity";
@Entity("TiposComprobantesCompras")
export class TypePurchaseDocument {
  @PrimaryColumn({ select: false })
  id: number;

  @OneToOne(() => Purchase, (purchase) => purchase.typePurchaseDocument)
  purchase: Purchase;

  @Column({ name: "nombre" })
  name: number;
}
