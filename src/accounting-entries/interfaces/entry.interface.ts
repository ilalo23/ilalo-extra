export interface Detalle {
  id: number;
  codigoCuentaContable: string;
  codigoAuxiliar: string;
  detalle: string;
  debe: number;
  haber: number;
}

export interface AccountingEntry {
  id: number;
  detalle: string;
  fecha: Date;
  estado: string;
  detalles: Array<Detalle>;
  codigoUsuario: string;
  agencia: string;
  empresa: string;
  tipoAsiento: string;
}
