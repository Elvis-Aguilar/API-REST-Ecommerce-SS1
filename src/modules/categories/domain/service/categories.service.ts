import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly roleRepository: Repository<Category>
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryCreate = this.roleRepository.create(createCategoryDto);
    return await this.roleRepository.save(categoryCreate);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {

    const category = await this.roleRepository.findOneBy({id})
    if (!category) {
      throw new BadRequestException(`Categoria no encontrada : ${id}`);
    }

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
