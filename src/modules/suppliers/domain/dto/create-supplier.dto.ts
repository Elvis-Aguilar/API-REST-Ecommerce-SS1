import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSupplierDto {

  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  address: string;
}
