import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../persistance/entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/modules/roles/domain/services/roles.service';
import * as bcryptjs from 'bcryptjs';
import { Role } from 'src/modules/roles/persistance/entities/role.entity';
import axios from 'axios';
import { ServiceService } from '../../../../webServices/service/service.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService,
    private readonly service: ServiceService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.findOneByEmail(createUserDto.email);

    if (userExist) {
      throw new ConflictException(
        `Usuario con email: ${createUserDto.email} Ya esta asociado a una cuenta`,
      );
    }

    let role: Role;
    if (createUserDto.role) {
      role = await this.roleService.findOneByName(createUserDto.role);
    } else {
      await this.service.validUserExisParaseral(createUserDto.payment_method, createUserDto.email)
      role = await this.roleService.findOne(2);
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      name: createUserDto.name,
      cui: createUserDto.cui,
      email: createUserDto.email,
      nit: createUserDto.nit,
      password: hashedPassword,
      role: role,
      payment_method: createUserDto.payment_method
    });

    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findAllByRole(roleId: number): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { role: { id: roleId } },
      relations: ['role'],
    });
    return users;
  }
  async changeRole(idUser: number, idRole: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: idUser }, relations: ['role'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${idUser} not found`);
    }
    const role = await this.roleService.findOne(idRole);
    if (!role) {
      throw new NotFoundException(`Role with ID ${idRole} not found`);
    }
    user.role = role;
    await this.userRepository.save(user);

    return user;
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExist = await this.findOne(id);

    if (!userExist) {
      throw new NotFoundException(`Usuario con email: ${updateUserDto.email}`);
    }

    const role = await this.roleService.findOneByName(updateUserDto.role);

    return await this.userRepository.save({
      ...userExist,
      ...updateUserDto,
      role,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
