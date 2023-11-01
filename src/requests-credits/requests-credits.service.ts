import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between, MoreThan, ILike } from "typeorm";
import { Solicitudes } from "./entities/request-credit.entity";
import { getFirstAndLastDayOfCurrentMonth } from "src/helpers/dates.helper";
import { FilterPurchasesDto } from "src/purchases/dto/filter-purchases.dto";
import { CotizacionesJoyas } from "./entities/quote-jewerly.entity";
import { CotizacionesArtefactos } from "./entities/quote-device.entity";
import { CotizacionesVehiculos } from "./entities/quote-car.entity";
import { UpdateRequestDto } from "./dto/update-request.dto";

@Injectable()
export class RequestsCreditsService {
  constructor(
    @InjectRepository(Solicitudes)
    private readonly solicitudesRepository: Repository<Solicitudes>,
    @InjectRepository(CotizacionesJoyas)
    private readonly cotizacionesJoyasRepository: Repository<CotizacionesJoyas>,

    @InjectRepository(CotizacionesArtefactos)
    private readonly cotizacionesArtefactosRepository: Repository<
      CotizacionesArtefactos
    >,

    @InjectRepository(CotizacionesVehiculos)
    private readonly cotizacionesVehiculosRepository: Repository<
      CotizacionesVehiculos
    >
  ) {}

  async getPendingRequestCredits(
    company: number,
    filterRequestsDto: FilterPurchasesDto
  ): Promise<{
    docs: Array<any>;
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  }> {
    if (company === 3) {
      const dates = getFirstAndLastDayOfCurrentMonth();
      let filter = {
        estado: "P",
        idEmpresa: company,
        fecha: Between(dates.firstDay, dates.lastDay),
        valorCuota: MoreThan(0),
      };
      if (filterRequestsDto.name) {
        filter["cliente.nombreCompleto"] = ILike(`%${filterRequestsDto.name}%`);
      }
      const pendingRequests = await this.solicitudesRepository
        .createQueryBuilder("solicitudes")
        .innerJoinAndSelect("solicitudes.cotizacion", "cotizacion")
        .innerJoinAndSelect("solicitudes.oficina", "oficina")
        .innerJoinAndSelect("solicitudes.cliente", "cliente")
        .innerJoinAndSelect("solicitudes.tipoPrestamo", "tipoPrestamo")
        .where(filter)
        .take(filterRequestsDto.limit ?? 5)
        .skip(
          filterRequestsDto.page === 1
            ? 0
            : (filterRequestsDto.page - 1) * (filterRequestsDto.limit ?? 5)
        )
        .orderBy("solicitudes.fecha", "DESC")
        .getMany();

      const total = await this.solicitudesRepository.count({ where: filter });
      return {
        docs: pendingRequests,
        totalDocs: total,
        totalPages: Math.ceil(total / filterRequestsDto.limit),
        currentPage: filterRequestsDto.page,
        hasNextPage:
          total === filterRequestsDto.page * filterRequestsDto.limit ||
          filterRequestsDto.page * filterRequestsDto.limit > total
            ? false
            : true,
      };
    } else {
      return null;
    }
  }

  async getDetailsRequest(id: number, type: string) {
    switch (type.toUpperCase()) {
      case "J":
        const jewerlys = await this.cotizacionesJoyasRepository.find({
          relations: ["joya", "joya.tipoOro", "joya.tipoJoya"],
          where: {
            idCotizacion: id,
            /*joya: {
                            estado: 'P'
                        }*/
          },
        });
        return jewerlys.map((j) => j.joya);
      case "A":
        const devices = await this.cotizacionesArtefactosRepository.find({
          relations: ["dispositivo"],
          where: {
            idCotizacion: id,
            /*dispositivo:{
                            estado: 'P'
                        }*/
          },
        });
        return devices.map((d) => d.dispositivo);
      case "V":
        const cars = await this.cotizacionesVehiculosRepository.find({
          relations: [
            "vehiculo",
            "vehiculo.tipo",
            "vehiculo.marca",
            "vehiculo.modelo",
          ],
          where: {
            idCotizacion: id,
            /*dispositivo:{
                            estado: 'P'
                        }*/
          },
        });
        return cars.map((d) => d.vehiculo);
      default:
        return null;
    }
  }

  async updateRequestCredit(id: number, updateRequestDto: UpdateRequestDto) {
    try {
      const request = await this.solicitudesRepository.findOne({
        where: {
          idSolicitud: id,
        },
      });

      if (!request) {
        return null;
      }
      request.estado = updateRequestDto.status;
      request.montoAprobado =
        updateRequestDto.status === "A" ? updateRequestDto.amountApproved : 0;
      request.capital =
        updateRequestDto.status === "A"
          ? updateRequestDto.amountApproved
          : request.capital;
      await this.solicitudesRepository.save(request);
      return request;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
