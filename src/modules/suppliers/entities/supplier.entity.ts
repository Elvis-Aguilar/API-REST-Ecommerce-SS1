import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/persistance/entities/product.entity';

@Entity()
export class Supplier {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  address: string;

  /**
   * manejo de relaciones
   */
  @OneToMany(() => Product, (product) => product.supplier)
  product: Product[];
}
