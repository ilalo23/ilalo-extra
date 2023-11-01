import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class FilterAccountingEntriesDto {
  /*@Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(5)
  readonly limit?: number;*/

  @Type(() => Date)
  @IsDate()
  readonly date: Date;
}
