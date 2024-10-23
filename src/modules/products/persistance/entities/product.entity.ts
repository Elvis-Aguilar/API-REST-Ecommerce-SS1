import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/Status';
import { Supplier } from '../../../suppliers/entities/supplier.entity';
import { Category } from '../../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false
  })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.AVAILABLE
  })
  status: Status;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: false })
  image: string;

  @DeleteDateColumn()
  deletedAt: Date;

  /** manejo de relaciones */
  @ManyToOne(() => Supplier, (supplier) => supplier.id, {
    // cascade: true,
    eager: true,
  })
  supplier: Supplier;

  @ManyToOne(() => Category, (category) => category.id, {
    // cascade: true,
    eager: true,
  })
  category: Category;



}
