import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Office } from "./office.entity";
import { TypePurchaseDocument } from "./typePurchaseDocument.entity";
@Entity("FacturasCompras")
export class Purchase {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ name: "idEmpresa" })
  companyId: number;

  @Column({ name: "nombreProveedor" })
  suppliername: string;

  @Column({ name: "identificacion" })
  identification: string;

  @OneToOne(() => TypePurchaseDocument, (type) => type.purchase)
  @JoinColumn({ name: "idTipoComprobanteCompra", referencedColumnName: "id" })
  typePurchaseDocument: TypePurchaseDocument;

  @OneToOne(() => Office, (office) => office.purchase)
  @JoinColumn({ name: "idAgencia", referencedColumnName: "id" })
  office: Office;

  @Column({ name: "fechaDocumento" })
  dateDocument: Date;

  @Column({ name: "fecha" })
  dateRegister: Date;

  @Column({ name: "fechaServidor" })
  dateServer: Date;

  @Column({ name: "codigoUsuario", type: 'nvarchar' })
  user: string;

  @Column({ name: "codigoSerie" })
  codeAndSerial: string;

  @Column({
    name: "numero",
    transformer: {
      to: (value: string) => value,
      from: (value: string) => ("000000000" + value).slice(-9),
    },
  })
  docNumber: string;

  @Column({ name: "estado" })
  status: string;

  @Column({ name: "subTotal0", type: "decimal" })
  subtotal0: number;

  @Column({ name: "subTotalGravado", type: "decimal" })
  subtotalWithTax: number;

  @Column({ name: "totalIva", type: "decimal" })
  totalTaxIva: number;

  @Column({ name: "porcentajeIva", type: "decimal" })
  percentIva: number;

  @Column({ name: "totalRetenido", type: "decimal" })
  totalRetained: number;

  @Column({ name: "imagen", type: "varbinary", length: "max" })
  photo: Buffer;
}
