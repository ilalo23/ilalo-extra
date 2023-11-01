import { Type, Transform } from "class-transformer";
import { IsDate, IsInt, IsString, ValidateNested } from "class-validator";
import { Companies } from "../constants/companies.contants";
class TypePurchaseDocumentDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

class OfficeDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

export class PurchaseDocumentDto {
  @IsInt()
  id: number;

  @Transform(({ value }) => Companies[value]?.name ?? "")
  @IsString()
  companyName: string;

  @Transform(({ value }) => Companies[value]?.color ?? "")
  @IsString()
  companyColor: string;

  @IsString()
  suppliername: string;

  @IsString()
  identification: string;

  @IsDate()
  dateDocument: Date;

  @IsDate()
  dateRegister: Date;

  @IsString()
  codeAndSerial: string;

  @IsInt()
  docNumber: number;

  @IsString()
  status: string;

  @IsInt()
  subtotal0: number;

  @IsInt()
  subtotalWithTax: number;

  @IsInt()
  totalTaxIva: number;

  @IsInt()
  percentIva: number;

  @IsInt()
  totalRetained: number;

  @ValidateNested()
  @Type(() => TypePurchaseDocumentDto)
  typePurchaseDocument: TypePurchaseDocumentDto;

  @ValidateNested()
  @Type(() => OfficeDto)
  office: OfficeDto;
}
