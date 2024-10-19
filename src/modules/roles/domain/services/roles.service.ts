import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../../persistance/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepostitory: Repository<Role>,
  ){}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number) {
    const role =  await this.roleRepostitory.findOneBy({id});
    if (!role) {
      throw new BadRequestException(`Rol no encontrado : ${id}`);
    }
    return role;
  }

  async findOneByName(name:string){
    const role =  await this.roleRepostitory.findOneBy({name});
    if (!role) {
      throw new BadRequestException(`Rol no encontrado : ${name}`);
    }
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
