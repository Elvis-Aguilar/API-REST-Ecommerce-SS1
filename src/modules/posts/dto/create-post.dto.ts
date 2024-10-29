import { IsString } from 'class-validator';
import { AreaSocial } from '../enums/area-social';

export class CreatePostDto {

  @IsString()
  content: string;

  @IsString()
  area_social: AreaSocial;
}
