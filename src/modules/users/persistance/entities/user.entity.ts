import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "../enums/paymentMethod";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true, length: 100 })
    email: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false, length: 15 })
    nit: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: 1 })
    role_id: number;

    @Column({
        type: 'enum',
        enum: PaymentMethod,  
        default: PaymentMethod.PAYPAL  
    })
    payment_method: PaymentMethod;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;



}
