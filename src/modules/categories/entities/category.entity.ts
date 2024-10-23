import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/persistance/entities/product.entity';


@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  /**User
   * manejo de relaciones
   */
  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
