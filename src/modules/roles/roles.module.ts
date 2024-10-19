import { Module } from '@nestjs/common';
import { RolesService } from './domain/services/roles.service';
import { RolesController } from './presentation/controller/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './persistance/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule { }
