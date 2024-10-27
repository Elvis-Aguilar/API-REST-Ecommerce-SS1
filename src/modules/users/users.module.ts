import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersController } from './presentation/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './persistance/entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { ServiceModule } from '../../webServices/service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, ServiceModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
