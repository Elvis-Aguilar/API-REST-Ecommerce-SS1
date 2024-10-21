import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description: string;

}
