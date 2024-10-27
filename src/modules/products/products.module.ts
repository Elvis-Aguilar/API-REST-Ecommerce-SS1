import { Module } from '@nestjs/common';
import { ProductsService } from './domain/service/products.service';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './persistance/entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { PaymentMethod } from '../users/persistance/enums/paymentMethod';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, SuppliersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
