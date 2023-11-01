import { Type } from "class-transformer";
import { IsNumber, IsEnum } from "class-validator";

enum StatusRequest {
    'Approved' = 'A',
    'Denied' = 'X'
}
export class UpdateRequestDto {
    @Type(() => Number)
    @IsNumber()
    readonly amountApproved: number;

    @IsEnum(StatusRequest)
    readonly status: StatusRequest
}