import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/persistance/entities/user.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { Product } from '../../products/persistance/entities/product.entity';

@Entity()
export class CartItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  quantity: number;

  @Column({nullable:false})
  sub_total: number;

  /** manejo de relaciones */
  @ManyToOne(() => Cart, (cart) => cart.id, {
    // cascade: true,
    eager: true,
  })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.id, {
    // cascade: true,
    eager: true,
  })
  product: Product;

}
