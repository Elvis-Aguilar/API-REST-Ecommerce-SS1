import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true, length: 100 })
  email: string;

  @Column({ nullable: false, unique: true, length: 250 })
  address: string;

  @Column({ nullable: false })
  image: string;
}
