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
import { ServiceService } from '../../webServices/service/service.service';
import { UsersService } from '../users/domain/services/users.service';
import { LoggerPayMethodDto } from './dto/logger-pay-method.dto';
import process from 'node:process';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartItemService: CartItemsService,
    private readonly service: ServiceService,
    private readonly userService: UsersService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<{ pdf: Buffer | null }> {
    const paymentMethod = createCartDto.payment_method as PaymentMethod;
    const userEntity = await this.userService.findOne(createCartDto.user_id);

    const { status, pdf } = await this.service.validTransactionMoney(
      createCartDto.jwt,
      paymentMethod,
      userEntity.name,
      createCartDto.total,
    );

    if (status === 'OK' && pdf) {
      const cart = this.cartRepository.create({
        total: Number(createCartDto.total),
        payment_method: paymentMethod,
        status: StatusCart.COMPLETED,
        user: { id: createCartDto.user_id } as User,
      });

      const savedCart = await this.cartRepository.save(cart);

      await this.cartItemService.createAll(
        createCartDto.items,
        savedCart,
        true,
      );
      return {  pdf };
    } else {
      const cart = this.cartRepository.create({
        total: createCartDto.total,
        payment_method: paymentMethod,
        status: StatusCart.CANCELLED_ERROR,
        user: { id: createCartDto.user_id } as User,
        description_error: status,
      });
      const savedCart = await this.cartRepository.save(cart);
      await this.cartItemService.createAll(createCartDto.items, savedCart, false);
      return { pdf: null };
    }
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

  async findAllUserById(userId: number): Promise<Cart[]> {
    const carts = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .where('cart.user = :userId', { userId })
      .getMany();

    if (!carts.length) {
      throw new NotFoundException(`No carts found for user with ID ${userId}`);
    }

    return carts;
  }

  async findAll() {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .leftJoinAndSelect('cart.user', 'user')
      .getMany();
  }

  async loggerUser(logger:LoggerPayMethodDto, payMethod: PaymentMethod) {
    return this.service.loggerUser(logger, payMethod);
  }

  async cartLastByIdUser(idUser: number): Promise<Cart | null> {
    return await this.cartRepository.findOne({
      where: { user: { id: idUser } },
      order: { created_at: 'DESC' },
    });
  }

}
