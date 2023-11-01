import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Asientos } from "./entities/accounting-entries.entity";
import { Repository } from "typeorm";
import { AccountingEntry, Detalle } from "./interfaces/entry.interface";
import { AutorizacionesCierres } from "./entities/accounting-auth.entity";
import { FilterAccountingEntriesDto } from "./dto/filter-accountingEntries.dto";
import { DetallesAsientos } from "./entities/acounting-details.entity";

@Injectable()
export class AccountingEntriesService {
    constructor(
        @InjectRepository(Asientos)
        private readonly asientosRepository: Repository<Asientos>,
        @InjectRepository(DetallesAsientos)
        private readonly detallesAsientosRepository: Repository<DetallesAsientos>,
        @InjectRepository(AutorizacionesCierres)
        private readonly autorizacionesRepository: Repository<AutorizacionesCierres>
    ) { }

    async getAccountingEntries(
        filterAccountingEntriesDto: FilterAccountingEntriesDto
    ): Promise<{

        accountingEntries: AccountingEntry[];
        wasApproved: boolean;

    }> {
        const currentDate = new Date(filterAccountingEntriesDto.date.toISOString().replace('T00:00:00.000Z', 'T05:00:00.000Z'));
        const entries = await this.asientosRepository.find({
            relations: [
                "tipoAsiento",
                "empresa",
                "agencia",
                "detalles",
                "detalles.cuenta",
                "detalles.auxiliar"
            ],
            where: {
                fecha: currentDate
            },
            order: {
                id: {
                    'direction': 'ASC'
                }
            },





        });





        return {
            accountingEntries: entries.map((e) => {

                const entry: AccountingEntry = {
                    ...e,
                    detalles: e.detalles.map((d) => {
                        const { id, detalle, debe, haber, cuenta, auxiliar } = d;
                        const detail: Detalle = {
                            id,
                            detalle,
                            debe,
                            haber,
                            codigoCuentaContable: `${cuenta?.codigo} ${cuenta?.nombre}`,
                            codigoAuxiliar:
                                d.auxiliar !== null
                                    ? `${auxiliar?.codigo} ${auxiliar?.nombre}`
                                    : "",
                        };

                        return detail;
                    }),
                    agencia: e.agencia.nombre,
                    empresa: e.empresa.nombreCorto,
                    tipoAsiento: e.tipoAsiento.nombre,
                };

                return entry;
            }),
            wasApproved: Boolean(
                await this.autorizacionesRepository.findOne({
                    where: {
                        fecha: filterAccountingEntriesDto.date,
                    },
                })
            ),
        };
    }


    async approveAccoutingDay(filterAccountingEntriesDto: FilterAccountingEntriesDto): Promise<void> {
        try {
            const currentDate = new Date(filterAccountingEntriesDto.date.toISOString().replace('T00:00:00.000Z', 'T05:00:00.000Z'));
            if (!Boolean(await this.autorizacionesRepository.findOne({
                where: {
                    fecha: currentDate
                }
            }))) {
                const lastId = await this.autorizacionesRepository.count();
                const newAutorizacionCierre = new AutorizacionesCierres();
                newAutorizacionCierre.id = lastId + 1;
                newAutorizacionCierre.fecha = currentDate;
                newAutorizacionCierre.codigoUsuario = 'MCROSERO';
                newAutorizacionCierre.ip = '192.168.99.99';
                newAutorizacionCierre.fechaServidor = new Date();
                newAutorizacionCierre.version = 2;
                await this.autorizacionesRepository.save(newAutorizacionCierre);
            }

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
