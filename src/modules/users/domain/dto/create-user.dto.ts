import { IsEmail, IsString, MinLength } from "class-validator";

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
    @MinLength(11)
    nit: string;

    @IsString()
    password: string;



}
