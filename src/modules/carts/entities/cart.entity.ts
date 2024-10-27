import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethod } from '../../users/persistance/enums/paymentMethod';
import { StatusCart } from '../enums/Status';
import { User } from '../../users/persistance/entities/user.entity';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false
  })
  total: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod
  })
  payment_method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: StatusCart
  })
  status: StatusCart;

  @Column({ nullable: true })
  description_error: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  /** manejo de relaciones */
  @ManyToOne(() => User, (user) => user.id, {
    // cascade: true,
    eager: true,
  })
  user: User;

}
