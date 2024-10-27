import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItemsService } from '../cart-items/cart-items.service';
import { StatusCart } from './enums/Status';
import { User } from '../users/persistance/entities/user.entity';
import { PaymentMethod } from '../users/persistance/enums/paymentMethod';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository : Repository<Cart>,
    private readonly cartItemService: CartItemsService
  ){}


  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const paymentMethod = createCartDto.payment_method as PaymentMethod;

    const cart = this.cartRepository.create({
      total: createCartDto.total,
      payment_method: paymentMethod,
      status: StatusCart.COMPLETED,
      user: { id: createCartDto.user_id } as User,
    });

    const savedCart = await this.cartRepository.save(cart);

    await this.cartItemService.createAll(createCartDto.items, savedCart);

    return savedCart;
  }

  findAll() {
    return `This action returns all carts`;
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .where('cart.id = :id', { id })
      .getOne();

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
