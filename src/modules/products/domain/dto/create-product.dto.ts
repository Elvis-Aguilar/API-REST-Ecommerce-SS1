import { IsDecimal, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Status } from '../../persistance/enums/Status';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsString()
  image: string;

  @IsNumber()
  @IsPositive()
  supplier:number;

  @IsNumber()
  @IsPositive()
  category:number;


  @IsOptional()
  status?: Status;



}
