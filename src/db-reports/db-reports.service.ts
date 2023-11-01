import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";
import { Repository } from "typeorm";
import { ResumeLoan } from "./entities/resumeLoan.entity";
import { ResumeCashBox } from "./interfaces/resumeCashBox.interface";
import { ResumeComercializadora } from "./interfaces/resumeComercializadora.interface";

@Injectable()
export class DbReportsService {
  constructor(
    @InjectRepository(ResumeLoan)
    private readonly resumeRepository: Repository<ResumeLoan>
  ) {}

  async getResumesLoans(date: string): Promise<void> {
    const query = (companie: number): string => {
      return `select id,fecha,idAgencia,saldoCapital,TotalMaduracion,Vigente + NoDevenga Vigente,Vencido,idEmpresa,tipo
            from ResumenesPrestamos  where saldoCapital > 0 and fecha = '${date}' and idEmpresa = ${companie} 
            and tipo not in ('COOPERATIVA','CUSTBIEN')`;
    };
    const resumeLoansCorpo: Array<ResumeLoan> = await this.resumeRepository.query(
      query(4)
    );
    const resumeLoansPrendar: Array<ResumeLoan> = await this.resumeRepository.query(
      query(3)
    );

    console.log([
      resumeLoansCorpo.reduce((pv, cv) => cv.saldoCapital + pv, 0),
      resumeLoansPrendar.reduce(
        (pv, cv) => {
          return {
            vencido: cv.Vencido + pv.vencido,
            vigente: cv.Vigente + pv.vigente,
          };
        },
        { vigente: 0, vencido: 0 }
      ),
    ]);
    await this.getResumesComercializadora(date);
    await this.getResumesCashBoxes(date);
  }

  async getResumesComercializadora(date: string) {
    const resumeComercializadora: Array<ResumeComercializadora> = await this
      .resumeRepository.query(`
        select * from ResumenesComercializadoras where fecha = '${date}' and idAgenciaAntes <> 4`);
    console.log(resumeComercializadora.reduce((pv, cv) => pv + cv.valor, 0));
  }

  async getResumesCashBoxes(date: string) {
    const query = `select b.idEmpresa,rb.idAgencia, e.nombreCorto empresa, a.nombre agencia, 
        rb.valorEfectivo, rb.valorCheque from ResumenesBovedas rb
        INNER JOIN bovedas b on b.id = rb.idBoveda
        INNER JOIN Empresas e on e.id = b.idEmpresa
        INNER JOIN Agencias a on a.id = rb.idAgencia
        where rb.fecha = '${date}' 
        AND rb.valorEfectivo > 0
        AND rb.idboveda in (select id from bovedas where idempresa in (SELECT id from Empresas))
        order by rb.idAgencia, rb.esgeneral`;

    const resumeCashBoxes: Array<ResumeCashBox> = await this.resumeRepository.query(
      query
    );

    const result = resumeCashBoxes.reduce((accumulator, current) => {
      const key = `${current.idEmpresa}_${current.idAgencia}`;
      if (!accumulator[key]) {
        accumulator[key] = {
          empresa: current.empresa,
          agencia: current.agencia,
          totalValorEfectivo: current.valorEfectivo,
        };
      } else {
        accumulator[key].totalValorEfectivo += current.valorEfectivo;
      }
      return accumulator;
    }, {});

    const reducedData: Array<{
      empresa: string;
      agencia: string;
      totalValorEfectivo: number;
    }> = Object.values(result);

    console.log(reducedData);
  }
}
