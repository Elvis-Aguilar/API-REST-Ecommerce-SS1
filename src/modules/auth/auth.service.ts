import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { UsersService } from '../users/domain/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService:UsersService,
    private readonly jwtService: JwtService
  ){
    
  }

  //registra un nuevo usuario con la logica de userService
  async register(resgisterDto: RegisterDto) {
    return await this.userService.create(resgisterDto);
  }


}
