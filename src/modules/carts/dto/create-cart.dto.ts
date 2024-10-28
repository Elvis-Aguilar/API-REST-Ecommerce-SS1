import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateItemCartDto } from './create-item-cart.dto';

export class CreateCartDto {
  @IsNumber()
  total: number;

  @IsString()
  payment_method: string;

  @IsNumber()
  user_id:number;

  @IsNotEmpty()
  items:CreateItemCartDto [];

  @IsString()
  jwt: string;

}
