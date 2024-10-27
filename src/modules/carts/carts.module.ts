import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/persistance/entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { Cart } from './entities/cart.entity';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/domain/service/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
