import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
export class RegisterDto {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    address: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(7)
    nit: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    password: string;


}
