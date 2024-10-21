import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { PaymentMethod } from '../../users/persistance/enums/paymentMethod';
export class RegisterDto {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    cui: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(7)
    @IsOptional()
    nit?: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    password: string;

    @IsString()
    payment_method: PaymentMethod;


}
