import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { UsersService } from '../users/domain/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import * as bcryptjs from "bcryptjs";
import { User } from '../users/persistance/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async addToken(user: User) {
    const payload = { email: user.email, role: user.role, id: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email,
      role: user.role,
      id: user.id,
      name:user.name
    };
  }

  //registra un nuevo usuario con la logica de userService
  async register(resgisterDto: RegisterDto) {
    const user = await this.userService.create(resgisterDto);

    return this.addToken(user);

  }

  async login({ email, password }: LoginDto) {
    const userExist = await this.userService.findOneByEmail(email);

    if (!userExist) {
      throw new UnauthorizedException('Usuario no existe');
    }

    const isPasswordValid = await bcryptjs.compare(password, userExist.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorectas');
    }

    return this.addToken(userExist);
  }
}
