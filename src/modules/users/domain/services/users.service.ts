import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../persistance/entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/modules/roles/domain/services/roles.service';
import * as bcryptjs from "bcryptjs";
import { Role } from 'src/modules/roles/persistance/entities/role.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService
  ) { }

  async create(createUserDto: CreateUserDto) {

    if (!this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException(`Usuario con email: ${createUserDto.email} Ya esta asociado a una cuenta`);
    }

    let role: Role;
    if (createUserDto.role) {
      role = await this.roleService.findOneByName(createUserDto.role);
      //TODO: implementar logica para consumir el servicio de la pasarela de pagos,validando que tenga cuenta vigente ahi.

    } else {
      role = await this.roleService.findOne(2);
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      name: createUserDto.name,
      address: createUserDto.name,
      email: createUserDto.email,
      nit: createUserDto.email,
      password: hashedPassword,
      role: role
    });

    return await this.userRepository.save(user);

  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
