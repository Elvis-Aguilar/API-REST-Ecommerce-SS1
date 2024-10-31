import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CreateItemCartDto } from '../carts/dto/create-item-cart.dto';
import { Cart } from '../carts/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/domain/service/products.service';
import { Product } from '../products/persistance/entities/product.entity';

@Injectable()
export class CartItemsService {

  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository : Repository<CartItem>,
    private readonly productsService: ProductsService
  ){}

  async createAll(createCartItemDto: CreateItemCartDto[], cartEntity: Cart, disconut:boolean): Promise<void> {
    for (const itemDto of createCartItemDto) {
      if (disconut){
        const isStockAvailable = await this.productsService.discountStock(itemDto.product_id, itemDto.quantity);

        if (!isStockAvailable) {
          throw new ConflictException(`Stock insuficiente para el producto con ID: ${itemDto.product_id}`);
        }
      }

      const cartItem = this.cartItemRepository.create({
        quantity: Number(itemDto.quantity),
        sub_total: Number(itemDto.sub_total),
        cart: cartEntity,
        product: { id: itemDto.product_id } as Product,
      });

      await this.cartItemRepository.save(cartItem);
    }
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
