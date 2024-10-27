import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Product } from '../../products/persistance/entities/product.entity';

@Entity()
export class CartItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false
  })
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
