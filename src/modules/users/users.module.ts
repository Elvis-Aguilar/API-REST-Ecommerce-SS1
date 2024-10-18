import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersController } from './presentation/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './persistance/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
