import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductsModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
