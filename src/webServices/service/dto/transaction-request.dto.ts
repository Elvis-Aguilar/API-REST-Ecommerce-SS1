import { IsNumber, IsString } from 'class-validator';

export class TransactionRequestDto {

  @IsNumber()
  cantidad: number;

  @IsString()
  correoReceptor: string;

  @IsString()
  concepto: string;

  @IsString()
  nombreTienda: string;

  @IsString()
  identificadorTienda: string;
}