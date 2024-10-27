import { IsNumber } from 'class-validator';

export class CreateItemCartDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  sub_total: number;

  @IsNumber()
  product_id: number;
}