import { IsEnum } from "class-validator";

enum StatusPurchase {
    'Approved' = 'A',
    'Denied' = 'X'
}

export class UpdatePurchaseDto {
    @IsEnum(StatusPurchase)
    readonly status: StatusPurchase
}