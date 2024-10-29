import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSupplierDto {

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  description: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  address: string;
}
