import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethod } from "../enums/paymentMethod";
import { Role } from "src/modules/roles/persistance/entities/role.entity";
import { Product } from '../../../products/persistance/entities/product.entity';
import { Cart } from '../../../carts/entities/cart.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true, length: 100 })
    email: string;

    @Column({ nullable: false })
    cui: string;

    @Column({ nullable: true, length: 15 })
    nit: string;

    @Column({ nullable: false })
    password: string;

    @Column({         
        type: 'enum',
        enum: PaymentMethod,  
        default: PaymentMethod.PAYPAL  
    })
    payment_method: PaymentMethod;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    /** manejo de relaciones */
    @ManyToOne(() => Role, (role) => role.id, {
        // cascade: true,
        eager: true, //
      })
    role: Role;

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];


}
