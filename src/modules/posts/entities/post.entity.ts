import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AreaSocial } from '../enums/area-social';
import { User } from '../../users/persistance/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'enum',
    enum: AreaSocial,
  })
  area_social: AreaSocial;

  /** manejo de relaciones */
  @ManyToOne(() => User, (user) => user.id, {
    // cascade: true,
    eager: true,
  })
  user: User;

}
