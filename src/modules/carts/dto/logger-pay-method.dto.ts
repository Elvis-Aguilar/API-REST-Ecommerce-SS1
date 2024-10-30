import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoggerPayMethodDto {

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

}