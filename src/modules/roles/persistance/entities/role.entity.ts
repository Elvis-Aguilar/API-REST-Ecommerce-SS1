import { User } from "src/modules/users/persistance/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];


}
