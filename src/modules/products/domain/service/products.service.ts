import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../persistance/entities/product.entity';
import { CategoriesService } from '../../../categories/domain/service/categories.service';
import { SuppliersService } from '../../../suppliers/domain/service/suppliers.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly  categoryService: CategoriesService,
    private readonly supplierService: SuppliersService
  ) {
  }

  async create(createProductDto: CreateProductDto) {

    const category = await this.categoryService.findOne(createProductDto.category);

    const supplier = await this.supplierService.findOne(createProductDto.supplier);

    const product =  this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      image: createProductDto.image,
      stock: createProductDto.stock,
      supplier: supplier,
      category: category,
    });

    return await this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOneBy({id})
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {

    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  async discountStock(id: number, discount: number): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (product.stock < discount) {
      return false;
    }

    product.stock -= discount;

    await this.productRepository.save(product);

    return true;
  }

  async remove(id: number): Promise<void> {

    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.softRemove(product);
  }
}
