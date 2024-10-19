import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    address: string;
    
    @IsString()
    @MinLength(7)
    nit: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role?: string;

}
