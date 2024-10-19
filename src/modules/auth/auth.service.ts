import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/create-auth.dto';
import { UsersService } from '../users/domain/services/users.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService:UsersService
  ){
    
  }

  //registra un nuevo usuario con la logica de registro
  async register(resgisterDto: RegisterDto) {
    return await this.userService.create(resgisterDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
