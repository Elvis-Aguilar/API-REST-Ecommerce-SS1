import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../../persistance/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ){}

  async create(createRoleDto: CreateRoleDto) {

    if(await this.roleRepository.findOneBy({name: createRoleDto.name})){
      throw new ConflictException('Role already exists');
    }

    const roleCreated = this.roleRepository.create(createRoleDto);

    return await  this.roleRepository.save(roleCreated);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    const role =  await this.roleRepository.findOneBy({id});
    if (!role) {
      throw new BadRequestException(`Rol no encontrado : ${id}`);
    }
    return role;
  }

  async findOneByName(name:string){
    const role =  await this.roleRepository.findOneBy({name});
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
