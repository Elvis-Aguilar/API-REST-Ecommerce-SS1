import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
