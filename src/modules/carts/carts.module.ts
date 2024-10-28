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
import { CartItemsModule } from '../cart-items/cart-items.module';
import { UsersModule } from '../users/users.module';
import { ServiceModule } from '../../webServices/service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), CartItemsModule, UsersModule, ServiceModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
