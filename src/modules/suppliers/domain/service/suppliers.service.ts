import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../../entities/supplier.entity';

@Injectable()
export class SuppliersService {

  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ) {
  }


  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = this.supplierRepository.create(createSupplierDto);
    return await this.supplierRepository.save(supplier);
  }

  async findAll() {
    return await this.supplierRepository.find()
  }

  findOne(id: number) {
    const supplier = this.supplierRepository.findOneBy({id});
    if (!supplier) {
      throw new BadRequestException(`Supplier no encontrada : ${id}`);
    }
    return supplier;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
