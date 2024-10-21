import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { PaymentMethod } from '../../persistance/enums/paymentMethod';

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    cui: string;
    
    @IsString()
    @MinLength(7)
    @IsOptional()
    nit?: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    payment_method: PaymentMethod;

}
