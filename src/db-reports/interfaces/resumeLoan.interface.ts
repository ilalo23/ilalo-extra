export interface ResumeLoan{
  readonly id: number;
  readonly fecha: Date;
  readonly idAgencia: number;
  readonly saldoCapital: number;
  readonly totalMaduracion: number;
  readonly Vencido: number;
  readonly Vigente: number;
  readonly idEmpresa: number;
  readonly tipo: 'CORPO' | 'PRENDAR';


}