import { Module } from '@nestjs/common';
import { CategoriesService } from './domain/service/categories.service';
import { CategoriesController } from './controller/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
